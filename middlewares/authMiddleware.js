const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel");
const errorResponse = require("../utils/errorResponse");

module.exports.protect = async (req, res, next) => {
     console.log("Auth middleware hit");
  try {
    let token;

    // Check Authorization Header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // No token
    if (!token || token === "null" || token === "undefined") {
      return next(new errorResponse("Not authorized. Please login.", 401));
    }

    // Verify JWT
    const decoded = JWT.verify(token, process.env.JWT_ACCESS_SECRET);

    // Find User
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return next(new errorResponse("User not found.", 404));
    }

    // Attach user to request
    req.user = user;

    console.log("Authenticated User:", req.user.email);

    next();
  } catch (err) {
    console.log(err);

    return next(new errorResponse("Invalid or expired token.", 401));
  }
};
