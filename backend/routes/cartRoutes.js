import express from "express";
import { getCart, saveCart } from "../controllers/cartController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(isAuthenticated, getCart).put(isAuthenticated, saveCart);

export default router;
