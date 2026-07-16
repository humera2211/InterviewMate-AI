const express=require("express");
const router=express.Router();
const { problemController} = require("../controllers/openaiController");


router.post("/problem" , problemController);

module.exports=router;