import UserModel from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import { verifyToken } from "../utils/jwt.js";
import catchError from "./catchAsyncErrors.js";

export const isAuthenticated = catchError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return next(new ErrorHandler("Please login to access", 401));

  const decoded = verifyToken(token);

  if (!decoded) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
  req.user = await UserModel.findById(decoded.id);
  if (!req.user) {
    return next(new ErrorHandler("User no longer exists", 401));
  }
  next();
});

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} not allowed to access this resource`,
          403,
        ),
      );
    }
    next();
  };
};
