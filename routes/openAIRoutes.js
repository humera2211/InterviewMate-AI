const express=require("express");
const { summaryController , paraController , chatbotController , problemController} = require("../controllers/openaiController");
const router=express.Router();


router.post("/summary", summaryController);
router.post("/paragraph" , paraController);
router.post("/chatbot" , chatbotController);
router.post("/problem" , problemController);

module.exports=router;