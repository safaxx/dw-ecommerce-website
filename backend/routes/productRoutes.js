import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} from "../controllers/productController.js";
import { isAuthenticated, isAuthorized } from "../middleware/auth.js";

const router = express.Router();

router.route("/all").get(getAllProducts);
router
  .route("/create")
  .post(isAuthenticated, isAuthorized("admin"), createProduct);
router
  .route("/:id")
  .put(isAuthenticated, isAuthorized("admin"), updateProduct)
  .delete(isAuthenticated, isAuthorized("admin"), deleteProduct)
  .get(getProductDetails);

export default router;
