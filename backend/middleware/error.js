import ErrorHandler from "../utils/errorHandler.js";

export function error(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //mongodb error - wrong id param
  if(err.name === "CastError"){
    const msg = `Requested Resource is Invalid: ${err.path}`
    err = new ErrorHandler(msg, 400);
  }
  res.status(err.statusCode).json({ success: false, error: err.message });
}
