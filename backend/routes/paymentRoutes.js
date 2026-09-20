import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../controllers/paymentController.js";

const router = express.Router();

router.route("/order").post(isAuthenticated, createRazorpayOrder);
router.route("/verify").post(isAuthenticated, verifyRazorpayPayment);

export default router;
