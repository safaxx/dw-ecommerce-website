import express from "express";
import {
  deleteUser,
  forgotPassword,
  getAllUsers,
  getUserDetails,
  getUserDetailsAdmin,
  login,
  logout,
  registerUser,
  resetPassword,
  updatePassword,
  updateProfile,
  updateProfileAdmin,
} from "../controllers/userController.js";
import { isAuthenticated, isAuthorized } from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").put(resetPassword);
router.route("/update-password").put(isAuthenticated, updatePassword);
router.route("/my-account").get(isAuthenticated, getUserDetails);
router.route("/my-account/update").put(isAuthenticated, updateProfile);

//admin routes
router
  .route("/admin/:id")
  .get(isAuthenticated, isAuthorized("admin"), getUserDetailsAdmin)
  .put(isAuthenticated, isAuthorized("admin"), updateProfileAdmin)
  .delete(isAuthenticated, isAuthorized("admin"), deleteUser);

router
  .route("/admin/all-users")
  .get(isAuthenticated, isAuthorized("admin"), getAllUsers);

export default router;
