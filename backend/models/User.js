import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [50, "Name cannot exceed 50 characters"],
    minLength: [3, "Name should have atleast 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password should have atleast 8 characters"],
    // validate: {}
    select: false,
  },
  avatar: {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },
  role: {
    type: String,
    default: "user",
  },
  shippingInfo: {
    address: { type: String, required: false, trim: true },
    city: { type: String, required: false, trim: true },
    state: { type: String, required: false, trim: true },
    country: { type: String, required: false, trim: true },
    pincode: { type: String, required: false, trim: true },
    phoneNumber: { type: String, required: false, trim: true },
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function () {
  // Avoid hashing an existing hashed password when user profile updates.
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
