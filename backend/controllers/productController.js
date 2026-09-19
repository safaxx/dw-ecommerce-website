import ProductModel from "../models/Product.js";
import mongoose from "mongoose";
import ErrorHandler from "../utils/errorHandler.js";
import catchError from "../middleware/catchAsyncErrors.js";
import ApiFeatures from "../utils/apiFeatures.js";

export const getAllProducts = catchError(async (req, res) => {
  const resultsPerPage = 8;
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

export const createOrUpdateReview = catchError(async (req, res, next) => {
  const userId = req.user._id;
  const userIdString = userId.toString();
  const { rating, comment, prodId } = req.body;

  const review = {
    userId,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const prod = await ProductModel.findById(prodId);

  if (!prod) return next(new ErrorHandler("Product Not Found", 404));

  const isReviewed = prod.reviews.find(
    (rev) => rev.userId.toString() === userIdString,
  );

  if (isReviewed) {
    prod.reviews.forEach((rev) => {
      if (rev.userId.toString() === userIdString) {
        rev.rating = Number(rating);
        rev.comment = comment;
      }
    });
  } else {
    prod.reviews.push(review);
  }

  prod.numOfReviews = prod.reviews.length;
  const totalRating = prod.reviews.reduce(
    (total, rev) => total + rev.rating,
    0,
  );
  prod.rating = Math.round((totalRating / prod.numOfReviews) * 10) / 10;

  await prod.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    message: "Review updated successfully",
  });
});

export const getAllProdReviews = catchError(async (req, res, next) => {
  const product = await ProductModel.findById(req.query.prodId);
  if (!product) return next(new ErrorHandler("Product Not Found", 404));
  res.status(200).json({ success: true, reviews: product.reviews });
});

export const deleteProdReview = catchError(async (req, res, next) => {
  const product = await ProductModel.findById(req.query.prodId);
  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  const review = product.reviews.find(
    (item) => item._id.toString() === req.query.reviewId,
  );
  if (!review) return next(new ErrorHandler("Review Not Found", 404));

  if (review.userId.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("You can only delete your own review", 403));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.reviewId,
  );

  const numOfReviews = reviews.length;
  const totalRating = reviews.reduce((total, rev) => total + rev.rating, 0);
  const rating = numOfReviews
    ? Math.round((totalRating / numOfReviews) * 10) / 10
    : 0;

  await ProductModel.findByIdAndUpdate(
    req.query.prodId,
    {
      reviews,
      rating,
      numOfReviews,
    },
    { new: true, runValidators: true, useFindAndModify: false },
  );

  res
    .status(200)
    .json({ success: true, message: "Review deleted successfullly" });
});

export const getProductCategories = catchError(async (req, res) => {
  const categories = await ProductModel.distinct("category");
  res.status(200).json({ success: true, categories });
});
