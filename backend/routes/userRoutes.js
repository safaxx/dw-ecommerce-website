import express from "express";
import { forgotPassword, login, logout, registerUser, resetPassword } from "../controllers/userController.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").put(resetPassword);


export default router;