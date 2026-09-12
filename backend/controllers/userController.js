import UserModel from "../models/User.js";
import catchError from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import bcrypt from "bcryptjs";
import { getCookieOptions, generatePswrdResetToken } from "../utils/jwt.js";
import { createSendToken } from "../utils/sendToken.js";
import { sendPasswordResetEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

export const registerUser = catchError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await UserModel.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a sample id",
      url: "profile pic url",
    },
  });

  return createSendToken(user, 201, res);
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

  return createSendToken(user, 200, res);
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
  const resetPswrdUrl = `${req.protocol}://${req.get("host")}/api/v1/user/reset-password/${resetToken}`;

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

export const resetPassword = catchError(async (req, res, next)=> {
   const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
  
    const user = await UserModel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: {$gt: Date.now()},
    })

    if(!user){
      return next(new ErrorHandler("Reset password token is invalid or expired", 400));
    }
    
    if(req.body.newPassword !== req.body.confirmPassword){
      return next(new ErrorHandler("Passwords do not match", 400));
    }

    user.password = req.body.newPassword;           
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    createSendToken(user, 200, res);
})
