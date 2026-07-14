const errorResponse=require("../utils/errorResponse.js");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  //mongoose cast error
  //invalid mongodb objectid
  if (error.name === "CastError") {
    const message = "Resource not found";
    error = new errorResponse(message, 404);
  }

  //duplicate key error
  //same email already exist
  if (error.code === 11000) {
    const message = "Duplicate field value entered";
    error = new errorResponse(message, 400);
  }

  //mongoose validation
  //schema validation error e.g- password too short ,email missing
  if (error.name === "ValidationError") {
    const message = Object.values(err.errors).map(
      //array milti h isiliye
      (val) => val.message,
    );

    error = new errorResponse(message, 400);
  }

  // Gemini API busy
  if (
    err.status === 503 ||
    err.message?.includes("503") ||
    err.message?.includes("Service Unavailable")
  ) {
    error = new errorResponse(
      "AI model is currently busy. Please try again in a few seconds.",
      503,
    );
  }

  if (err.status === 429 || err.message?.includes("429")) {
    error = new errorResponse(
      "Too many AI requests. Please wait a moment and try again.",
      429,
    );
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "Server error" });
};;

module.exports=errorHandler;

