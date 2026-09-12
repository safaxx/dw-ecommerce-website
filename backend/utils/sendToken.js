import { getCookieOptions, signToken } from "./jwt.js";

export function createSendToken(user, statusCode, res) {
  const token = signToken(user._id);

  res.cookie("token", token, getCookieOptions());

  return res.status(statusCode).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
    },
  });
}