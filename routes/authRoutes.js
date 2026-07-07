const express=require("express");
const router=express.Router();     //Router object
const { registerController, loginController, logoutController } = require("../controllers/authController");



//REGISTER ROUTE
router.post('/register' , registerController);

//LOGIN ROUTE
router.post('/login' , loginController);

//LOGOUT ROUTE
router.post('/logout', logoutController);






module.exports=router;

