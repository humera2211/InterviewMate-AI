const express=require("express");
const router=express.Router();
const { problemController} = require("../controllers/openaiController");
const {protect} =require("../middlewares/authMiddleware");

router.post("/problem" ,protect , problemController);

module.exports=router;