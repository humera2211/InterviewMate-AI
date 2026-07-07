const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

//create schema
const userSchema = new mongoose.Schema({
  //constructor hai
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "password should have min 6 character"],
  },
  customerId: {
    type: String,
    default: "",
  },
  subscription: {
    type: String,
    default: "",
  },
});

//hash password (kyunki password directly store nhi kr skte)
//using pre middleware -> save se phle password hash krna h
userSchema.pre("save", async function (next) {
  //update password
  if (!this.isModified("password")) {
    //built in function of mongoose
    return;
  }

  // hash password using salt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//login ke liye
//ckeck is user has provided the correct password
//using bcrypt compare function
//match password
//using custom user defined methods
//does not support arrow function
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//sign token
//sign->to identify if token is real or fake
//use jwt
userSchema.methods.getSignedToken = function (res) {
  const accessToken = JWT.sign(
    {
      id: this._id,
    },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIREIN },
  );

  //cookies ke liye
  const refreshToken = JWT.sign(
    {
      id: this._id,
    },
    process.env.JWT_REFRESH_TOKEN,
    { expiresIn: process.env.JWT_REFRESH_EXPIREIN },
  );

  res.cookie("refreshToken", `${refreshToken}`, {        
    //express mai res.cookies() phle se hota h
    maxAge: 7*24*60*60*1000,        //7days
    httpOnly: true,
  });


  return accessToken;
};

//create model
const User = mongoose.model("User", userSchema); //model(model_name , schema) -> normal function

//export model
module.exports = User;
