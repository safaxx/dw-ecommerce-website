import { getCookieOptions, signToken } from "./jwt.js";

export function sendToken(user, statusCode, res, message = null) {
  const token = signToken(user._id);

  res.cookie("token", token, getCookieOptions());

  return res.status(statusCode).json({
    success: true,
    ...(message ? { message } : {}),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
    },
  });
}