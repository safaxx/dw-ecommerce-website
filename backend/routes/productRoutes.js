import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createOrUpdateReview,
  getAllProdReviews,
  deleteProdReview,
  getProductCategories,
  uploadProductImage,
} from "../controllers/productController.js";
import { isAuthenticated, isAuthorized } from "../middleware/auth.js";

const router = express.Router();

router.route("/all").get(getAllProducts);
router
  .route("/create")
  .post(isAuthenticated, isAuthorized("admin"), createProduct);

router.route("/review").put(isAuthenticated, createOrUpdateReview);
router.route("/reviews").get(getAllProdReviews).delete(isAuthenticated, deleteProdReview);
router.route("/categories").get(getProductCategories);

router
  .route("/:id")
  .put(isAuthenticated, isAuthorized("admin"), updateProduct)
  .delete(isAuthenticated, isAuthorized("admin"), deleteProduct)
  .get(getProductDetails);


router.route("/upload-image").post(isAuthenticated, isAuthorized("admin"), uploadProductImage);
export default router;
