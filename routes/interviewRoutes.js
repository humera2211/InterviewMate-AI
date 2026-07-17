const express=require("express");
const router=express.Router();
const {startInterview, evaluateInterview}=require("../controllers/interviewController");
const {getHistory , getInterview , deleteInterview} = require("../controllers/historyController");
const {protect} =require("../middlewares/authMiddleware");


router.post("/start", protect ,  startInterview);
router.post("/evaluate" , protect , evaluateInterview);

router.get("/history", protect, getHistory);
router.get("/history/:id", protect, getInterview);
router.delete("/history/:id", protect, deleteInterview);

module.exports=router;