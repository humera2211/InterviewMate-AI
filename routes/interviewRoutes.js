const express=require("express");
const router=express.Router();
const {startInterview, evaluateInterview}=require("../controllers/interviewController");


router.post("/start", startInterview);
router.post("/evaluate" , evaluateInterview);

module.exports=router;