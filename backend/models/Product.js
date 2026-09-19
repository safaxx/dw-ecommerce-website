import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter prodoct name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    max: [100000, "Price cannot exceed 6 figures"],
  },
  rating: { type: Number, default: 0 },
  images: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter product category"],
  },
  sizes: {
    type: [String],
    enum: ["S", "M", "X", "2XL", "3XL", "4XL"],
    default: [],
  },
  stock: {
    type: Number,
    required: [true, "Please enter current stock"],
    max: [1000, "Stock cannot exceed 4 figures"],
  },
  numOfReviews: { type: Number, default: 0 },
  reviews: [
    {
      userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String },
    },
  ],
  createdBy: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
