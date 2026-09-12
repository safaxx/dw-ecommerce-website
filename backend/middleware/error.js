import ErrorHandler from "../utils/errorHandler.js";

export function error(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //mongodb error - wrong id param
  if(err.name === "CastError"){
    const msg = `Requested Resource is Invalid: ${err.path}`
    err = new ErrorHandler(msg, 400);
  }

  //monogoose duplicate key error
  if(err.code === 11000){
    const msg = `Duplicate ${Object.keys(err.keyValue)} entered.`
    err = new ErrorHandler(msg, 400);
  }

  //invalid jwt error
  if(err.name === "JsonwebtokenError"){
    const msg = `Invalid Json Web Token`
    err = new ErrorHandler(msg, 400);
  }

  //expired jwt error
  if(err.name === "TokenExpiredError"){
    const msg = `Json Web Token is expired`
    err = new ErrorHandler(msg, 400);
  }
  res.status(err.statusCode).json({ success: false, error: err.message });
}
