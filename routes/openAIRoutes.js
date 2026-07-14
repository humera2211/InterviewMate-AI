const express=require("express");
const { problemController} = require("../controllers/openaiController");
const router=express.Router();


router.post("/problem" , problemController);

module.exports=router;