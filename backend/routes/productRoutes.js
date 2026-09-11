import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/all").get(getAllProducts);
router.route("/create").post(createProduct);
router
  .route("/:id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(getProductDetails);

export default router;
