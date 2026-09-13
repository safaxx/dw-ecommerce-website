import OrderModel from "../models/Order.js";
import ProductModel from "../models/Product.js";
import mongoose from "mongoose";
import catchError from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createNewOrder = catchError(async (req, res) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const orderPaymentInfo = paymentInfo
    ? {
        id: paymentInfo.id,
        status: paymentInfo.status,
        ...(paymentInfo.status === "succeeded" && { paidAt: new Date() }),
      }
    : undefined;

  const order = await OrderModel.create({
    shippingInfo,
    orderItems,
    paymentInfo: orderPaymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

export const getOrderDetails = catchError(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ErrorHandler("Invalid order ID", 400));
  }

  const order = await OrderModel.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!order) return next(new ErrorHandler("Order Not Found", 404));

  res.status(200).json({
    success: true,
    order,
  });
});

export const getAllOrders = catchError(async (req, res) => {
  const orders = await OrderModel.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    orders,
  });
});

export const getUserOrders = catchError(async (req, res) => {
  const orders = await OrderModel.find({ user: req.user._id }).sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    orders,
  });
});

export const updateOrderStatus = catchError(async (req, res, next) => {
  const allowedStatuses = ["Processing", "Shipped", "Delivered", "Cancelled"];
  const { orderStatus } = req.body;

  if (!allowedStatuses.includes(orderStatus)) {
    return next(new ErrorHandler("Invalid order status", 400));
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ErrorHandler("Invalid order ID", 400));
  }

  const order = await OrderModel.findById(req.params.id);
  if (!order) return next(new ErrorHandler("Order Not Found", 404));

  if (order.orderStatus === "Delivered" && orderStatus !== "Delivered") {
    return next(
      new ErrorHandler("A delivered order cannot be moved backward", 400),
    );
  }
  if (order.orderStatus === "Delivered" && orderStatus === "Delivered") {
    return next(new ErrorHandler("Order is already delivered", 400));
  }

  if (orderStatus === "Delivered" && order.orderStatus !== "Delivered") {
    const quantities = new Map();

    for (const item of order.orderItems) {
      const productId = item.product.toString();
      quantities.set(
        productId,
        (quantities.get(productId) || 0) + item.quantity,
      );
    }

    const updatedProducts = [];

    try {
      for (const [productId, quantity] of quantities) {
        const product = await ProductModel.findOneAndUpdate(
          { _id: productId, stock: { $gte: quantity } },
          { $inc: { stock: -quantity } },
          { new: true },
        );

        if (!product) {
          throw new ErrorHandler(
            `Insufficient stock for product ${productId}`,
            400,
          );
        }

        updatedProducts.push({ productId, quantity });
      }
    } catch (error) {
      for (const { productId, quantity } of updatedProducts) {
        await ProductModel.findByIdAndUpdate(productId, {
          $inc: { stock: quantity },
        });
      }
      throw error;
    }
  }

  order.orderStatus = orderStatus;
  order.deliveredAt = orderStatus === "Delivered" ? new Date() : undefined;
  await order.save();

  res.status(200).json({
    success: true,
    order,
  });
});

export const deleteOrder = catchError(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ErrorHandler("Invalid order ID", 400));
  }

  const order = await OrderModel.findByIdAndDelete(req.params.id);
  if (!order) return next(new ErrorHandler("Order Not Found", 404));

  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
  });
});
