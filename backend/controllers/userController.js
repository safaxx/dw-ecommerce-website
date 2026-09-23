import UserModel from "../models/User.js";
import catchError from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import bcrypt from "bcryptjs";
import { getCookieOptions, generatePswrdResetToken } from "../utils/jwt.js";
import { sendToken } from "../utils/sendToken.js";
import { sendPasswordResetEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
import cloudinary from "cloudinary";

export const registerUser = catchError(async (req, res, next) => {
  const { name, email, password } = req.body;
  // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //   folder:'avatars',
  //   width: 150,

  // })
  const user = await UserModel.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a sample id",
      url: "profile pic url",
    },
  });

  return sendToken(user, 201, res);
});

export const login = catchError(async (req, res, next) => {
  const { password, email } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Email and Password are required", 400));
  }
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler("Invalid Credentials", 401));
  const match = await bcrypt.compare(password, user.password);
  if (!match) return next(new ErrorHandler("Invalid Credentials", 401));

  return sendToken(user, 200, res);
});

export const logout = catchError(async (req, res) => {
  res.clearCookie("token", getCookieOptions());
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

export const forgotPassword = catchError(async (req, res, next) => {
  const { resetToken, hashedToken } = generatePswrdResetToken();
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user)
    return next(new ErrorHandler("User not found with this email", 404));

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  await user.save({ validateBeforeSave: false });

  //send email to users
  const resetPswrdUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/password/reset/${resetToken}`;

  try {
    await sendPasswordResetEmail({
      email: user.email,
      subject: "Reset Password - Always Modest",
      resetPswrdUrl,
    });
    res
      .status(200)
      .json({ success: true, message: `Email sent to user: ${user.email}` });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

export const resetPassword = catchError(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await UserModel.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Reset password token is invalid or expired", 400),
    );
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  user.password = req.body.newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save({ validateBeforeSave: false });

  sendToken(user, 200, res, "Password reset successfully");
});

export const getUserDetails = catchError(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id);
  res.status(200).json({ sucess: true, user });
});

export const updatePassword = catchError(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id).select("+password");

  const oldPassMatch = await bcrypt.compare(
    req.body.oldPassword,
    user.password,
  );
  if (!oldPassMatch) {
    return next(new ErrorHandler("Invalid Credentials", 401));
  }

  const newPassMatch = await bcrypt.compare(
    req.body.newPassword,
    user.password,
  );

  if (newPassMatch) {
    return next(
      new ErrorHandler("New Password cannot be same as your old password", 400),
    );
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res, "Password updated successfully");
});

export const updateProfile = catchError(async (req, res, next) => {
  const { name, email, avatar, shippingInfo } = req.body;
  const newProfile = {};

  if (name !== undefined) newProfile.name = name;
  if (email !== undefined) newProfile.email = email;
  if (avatar !== undefined) newProfile.avatar = avatar;
  if (shippingInfo !== undefined) newProfile.shippingInfo = shippingInfo;

  const user = await UserModel.findByIdAndUpdate(req.user.id, newProfile, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!user) return next(new ErrorHandler("User not found", 404));

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
});

export const getAllUsers = catchError(async (req, res, next) => {
  const users = await UserModel.find();
  res.status(200).json({ success: true, users });
});

export const getUserDetailsAdmin = catchError(async (req, res, next) => {
  const user = await UserModel.findById(req.params.id);
  if (!user) return next(new ErrorHandler("User not found", 404));

  res.status(200).json({ success: true, user });
});

export const updateProfileAdmin = catchError(async (req, res, next) => {
  const { name, email, role } = req.body;
  const newProfile = {};

  if (name !== undefined) newProfile.name = name;
  if (email !== undefined) newProfile.email = email;
  if (role !== undefined) newProfile.role = role;

  const user = await UserModel.findByIdAndUpdate(req.params.id, newProfile, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!user) return next(new ErrorHandler("User not found", 404));

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
});

export const deleteUser = catchError(async (req, res, next) => {
  const user = await UserModel.findById(req.params.id);
  if (!user) return next(new ErrorHandler("User Not Found", 404));

  await UserModel.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "User Profile Deleted",
  });
});
