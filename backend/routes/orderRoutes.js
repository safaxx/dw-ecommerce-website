import express from "express";
import {
  createNewOrder,
  deleteOrder,
  getAllOrders,
  getOrderDetails,
  getUserOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { isAuthenticated, isAuthorized } from "../middleware/auth.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createNewOrder);

router
  .route("/admin/all")
  .get(isAuthenticated, isAuthorized("admin"), getAllOrders);

router.route("/my-orders").get(isAuthenticated, getUserOrders);

router
  .route("/admin/:id")
  .put(isAuthenticated, isAuthorized("admin"), updateOrderStatus)
  .delete(isAuthenticated, isAuthorized("admin"), deleteOrder);
  
router.route("/:id").get(isAuthenticated, getOrderDetails);

export default router;
