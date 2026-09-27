import jwt from "jsonwebtoken";
import crypto from "crypto";

export function signToken(userId) {
  return jwt.sign({ id: String(userId) }, process.env.JWT_SECRET, {
    expiresIn: `${Number(process.env.COOKIE_EXPIRES || 1)}d`,
    algorithm: "HS256",
  });
}

export function getCookieOptions() {
  const isProduction = process.env.NODE_ENV === "production";
  return {
    expires: new Date(
      Date.now() + Number(process.env.COOKIE_EXPIRES || 1) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    /**
     * Development: "lax" — frontend and API share an origin via the Vite proxy.
     * Production: "none" — frontend (vercel.app) and API (onrender.com) are
     * different sites, so the cookie must be sent on cross-site requests.
     */
    sameSite: isProduction ? "none" : "lax",
    /**
     * Development: cookie works over regular http.
     * Production: cookie is sent only over https (required for sameSite "none").
     */
    secure: isProduction,
  };
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function generatePswrdResetToken(){
  //hashing 
  const resetToken = crypto.randomBytes(20).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  return { resetToken, hashedToken };
}