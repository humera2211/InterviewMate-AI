const express=require("express");
const { summaryController , paraController , chatbotController } = require("../controllers/openaiController");
const router=express.Router();


router.post("/summary", summaryController);
router.post("/paragraph" , paraController);
router.post("/chatbot" , chatbotController);

module.exports=router;