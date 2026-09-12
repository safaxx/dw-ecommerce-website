import ProductModel from "../models/Product.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchError from "../middleware/catchAsyncErrors.js";
import ApiFeatures from "../utils/apiFeatures.js";

export const getAllProducts = catchError(async (req, res) => {
  const resultsPerPage = 10;
  const count = await ProductModel.countDocuments();

  const apiFeature = new ApiFeatures(ProductModel.find(), req.query)
    .search()
    .filter()
    .pagination(resultsPerPage);

  const products = await apiFeature.query;
  //console.log(products.length);
  res.status(200).json({ success: true, count, products });
});
//admin routes
export const createProduct = catchError(async (req, res, next) => {
  req.body.createdBy = req.user.id;
  const product = await ProductModel.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

export const updateProduct = catchError(async (req, res, next) => {
  let product = await ProductModel.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
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
  const product = await ProductModel.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  await ProductModel.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Producted Deleted",
  });
});

export const getProductDetails = catchError(async (req, res, next) => {
  let product = await ProductModel.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  res.status(200).json({
    success: true,
    product,
  });
});
