import Product from "../models/Product.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchError from "../middleware/catchAsyncErrors.js";

export const getAllProducts = catchError(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({ success: true, products });
});
//admin routes
export const createProduct = catchError(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

export const updateProduct = catchError(async  (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

export const deleteProduct = catchError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return next(new ErrorHandler("Product Not Found", 404));

  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Producted Deleted",
  });
});

export const getProductDetails = catchError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product)
    return next(new ErrorHandler("Product Not Found", 404));

  res.status(200).json({
    success: true,
    product,
  });
});
