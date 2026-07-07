//isme saare functions likhe jate h 
const userModel=require("../models/userModel.js");
const errorResponse = require("../utils/errorResponse.js");


const sendToken=(user,statusCode,res)=>{
    //token lo custom schema method bnaya tha jo user model mai usse
    const token=user.getSignedToken(res);
    res.status(statusCode).json({
        success:true,
        token
    });
};


module.exports.registerController=async (req,res,next)=>{

    try{
    const {username , email , password}=req.body;

    const existingEmail=await userModel.findOne({email});
    if(existingEmail)
    {
        return next(new errorResponse("email already registered" , 400));
    }

    //create new user
    let user=new userModel({
        username,
        email,
        password
    });
    await user.save();     //save user in DB
    sendToken(user,201,res);
    }catch(error)
    {
        console.log("Register Error:",error);
        next(error);  //middleware ke pass chala jayega jaha error handle ho jayega
    }
};



module.exports.loginController=async(req,res,next)=>{
    try{
    //get email and password
    let {email , password} = req.body;
    if(!email || !password)
    {
        //throw error
        return next(new errorResponse("Provide email and password" , 400));
    }
    //find user in DB
    const user=await userModel.findOne({email});
    if(!user)
    {
        return next(new errorResponse("Invalid Credentials" , 401));
    }
    //match password entered by user with password stored in DB
    const isMatch=await user.matchPassword(password);
    if(!isMatch)
    {
        return next(new errorResponse("Invalid Credentials" , 401))
    }
    //token attach krke response mai bhej do
    sendToken(user , 200 ,res);
    }catch(error)
    {
        console.log("Error :", error);
        next(error);
    }
};

module.exports.logoutController=async(req,res)=>{
    res.clearCookie('refreshToken');
    return res.status(200).json({
        success:true,
        message:"Logout successful"
    });
};