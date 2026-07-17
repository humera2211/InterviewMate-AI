const InterviewHistory = require("../models/interviewHistoryModel");
const ErrorResponse = require("../utils/errorResponse");

//all interviews
module.exports.getHistory = async (req, res, next) => {
  try {
    const history = await InterviewHistory.find({
      user: req.user._id,
    })
      .sort({ createdAt: -1 })
      .select("problemTitle difficulty duration overallScore createdAt");

    return res.status(200).json({
      success: true,
      count: history.length,
      history,
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorResponse("Unable to fetch history.", 500));
  }
};

//single interview
module.exports.getInterview = async (req, res, next) => {
  try {
    const interview = await InterviewHistory.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!interview) {
      return next(new ErrorResponse("Interview not found.", 404));
    }

    return res.status(200).json({
      success: true,
      interview,
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorResponse("Unable to fetch interview.", 500));
  }
};

//delete interview
module.exports.deleteInterview = async (req, res, next) => {
  try {
    const interview = await InterviewHistory.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!interview) {
      return next(new ErrorResponse("Interview not found.", 404));
    }

    await interview.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Interview deleted successfully.",
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorResponse("Unable to delete interview.", 500));
  }
};
