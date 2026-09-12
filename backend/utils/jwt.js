import jwt from "jsonwebtoken";
import crypto from "crypto";

export function signToken(userId) {
  return jwt.sign({ id: String(userId) }, process.env.JWT_SECRET, {
    expiresIn: `${Number(process.env.COOKIE_EXPIRES || 1)}d`,
    algorithm: "HS256",
  });
}

export function getCookieOptions() {
  return {
    expires: new Date(
      Date.now() + Number(process.env.COOKIE_EXPIRES || 1) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    /** helps prevent the cookie
     * from being sent in most cross-site requests, 
     * reducing CSRF risk */
    sameSite: "lax", 
    /**
     * Development: cookie works over regular http.
     * Production: cookie is sent only over https.  
     */
    secure: process.env.NODE_ENV === "production",
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