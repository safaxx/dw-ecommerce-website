import CartModel from "../models/Cart.js";
import catchError from "../middleware/catchAsyncErrors.js";

export const getCart = catchError(async (req, res) => {
  const cart = await CartModel.findOne({ user: req.user._id });

  res.status(200).json({
    success: true,
    cartItems: cart?.items || [],
  });
});

export const saveCart = catchError(async (req, res) => {
  const cart = await CartModel.findOneAndUpdate(
    { user: req.user._id },
    { user: req.user._id, items: req.body.cartItems || [] },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
  );

  res.status(200).json({
    success: true,
    cartItems: cart.items,
  });
});
