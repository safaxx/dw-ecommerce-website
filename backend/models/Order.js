import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    pincode: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
  },
  orderItems: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true, min: 0 },
      image: { type: String, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    id: { type: String },
    status: {
      type: String,
      enum: ["pending", "succeeded", "failed"],
      default: "pending",
    },
    paidAt: { type: Date },
  },
  itemsPrice: { type: Number, required: true, min: 0 },
  taxPrice: { type: Number, required: true, min: 0 },
  shippingPrice: { type: Number, required: true, min: 0 },
  totalPrice: { type: Number, required: true, min: 0 },
  orderStatus: {
    type: String,
    enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Processing",
  },
  deliveredAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;
