import crypto from "crypto";
import { razorpayInstance } from "../utils/razorpay.js";
import catchError from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createRazorpayOrder = catchError(async (req, res, next) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return next(new ErrorHandler("Invalid amount", 400));
  }

  const order = await razorpayInstance.orders.create({
    amount: Math.round(amount * 100),
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  });

  res.status(201).json({
    success: true,
    order,
    keyId: process.env.RAZORPAY_KEY_ID,
  });
});

/***
 * this is the security-critical one. After checkout, Razorpay hands the frontend razorpay_order_id, 
 * razorpay_payment_id, and razorpay_signature. Those three values get 
 * POSTed here, and the backend recomputes its own signature using 
 * crypto.createHmac("sha256", RAZORPAY_KEY_SECRET) over order_id + "|" + payment_id. 
 * If that computed signature doesn't match what Razorpay sent 
 * the frontend, the request is rejected — this is what stops someone 
 * from forging a fake "payment succeeded" message from the browser 
 * console, since only Razorpay and your backend know the secret 
 * needed to produce a matching signature.
 */

export const verifyRazorpayPayment = catchError(async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return next(new ErrorHandler("Payment verification failed", 400));
  }

  res.status(200).json({
    success: true,
    paymentId: razorpay_payment_id,
  });
});
