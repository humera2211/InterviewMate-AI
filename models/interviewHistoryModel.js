const mongoose = require("mongoose");

const interviewHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    problemTitle: {
      type: String,
      required: true,
    },

    problemStatement: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["basic", "medium", "advanced"],
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    overallScore: {
      type: Number,
      required: true,
    },

    questions: [
      {
        id: Number,
        question: String,
      },
    ],

    answers: [
      {
        questionId: Number,
        answer: String,
      },
    ],

    evaluation: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const InterviewHistory = mongoose.model(
  "InterviewHistory",
  interviewHistorySchema,
);
module.exports = InterviewHistory;
