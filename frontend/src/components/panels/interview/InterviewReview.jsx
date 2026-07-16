import { ArrowLeft, RotateCcw, CheckCircle, MessageSquare } from "lucide-react";

export default function InterviewReview({ responses, setResponses }) {
  const interview = responses.interview;

  const questions = interview.questions;
  const answers = interview.answers;
  const review = interview.evaluation.review;

  function getScoreColor(score) {
    if (score >= 8) return "bg-green-500";
    if (score >= 6) return "bg-blue-500";
    if (score >= 4) return "bg-yellow-500 text-black";
    return "bg-red-500";
  }

  return (
    <div className="mt-5 flex flex-col">
      {/* Header */}

      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() =>
            setResponses((prev) => ({
              ...prev,
              interview: {
                ...prev.interview,
                showReview: false,
              },
            }))
          }
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition"
        >
          <ArrowLeft size={18} />
          Back to Result
        </button>

        <h2 className="text-2xl font-bold">Review Answers</h2>
      </div>

      {/* Questions */}

      <div className="space-y-6">
        {questions.map((question, index) => {
          const userAnswer = answers[index];

          const aiReview = review[index];

          return (
            <div
              key={question.id}
              className="rounded-2xl border border-zinc-700 bg-zinc-800 p-6"
            >
              {/* Top */}

              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Question {index + 1}</h3>

                <span
                  className={`rounded-full px-4 py-1 text-sm font-semibold text-white ${getScoreColor(
                    aiReview.score,
                  )}`}
                >
                  {aiReview.score}/10
                </span>
              </div>

              {/* Question */}

              <div className="mt-5">
                <p className="text-sm uppercase tracking-wider text-violet-400">
                  Question
                </p>

                <p className="mt-2 leading-7">{question.question}</p>
              </div>

              {/* User Answer */}

              <div className="mt-6">
                <p className="text-sm uppercase tracking-wider text-cyan-400">
                  Your Answer
                </p>

                <div className="mt-2 rounded-lg bg-zinc-900 p-4 leading-7 text-zinc-300">
                  {userAnswer.answer || "No answer submitted."}
                </div>
              </div>

              {/* Expected */}

              <div className="mt-6">
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-green-400" />

                  <p className="uppercase tracking-wider text-green-400 text-sm">
                    Expected Answer
                  </p>
                </div>

                <div className="mt-2 rounded-lg bg-zinc-900 p-4 leading-7 text-zinc-300 whitespace-pre-wrap">
                  {aiReview.expectedAnswer}
                </div>
              </div>

              {/* Feedback */}

              <div className="mt-6">
                <div className="flex items-center gap-2">
                  <MessageSquare size={18} className="text-yellow-400" />

                  <p className="uppercase tracking-wider text-yellow-400 text-sm">
                    AI Feedback
                  </p>
                </div>

                <div className="mt-2 rounded-lg bg-zinc-900 p-4 leading-7 text-zinc-300 whitespace-pre-wrap">
                  {aiReview.feedback}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Buttons */}

      <div className="mt-8 flex justify-center">
        <button
          onClick={() =>
            setResponses((prev) => ({
              ...prev,
              interview: {
                ...prev.interview,
                showReview: false,
              },
            }))
          }
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-3 py-3 font-semibold hover:bg-violet-700 transition"
        >
          Back to Results
        </button>
      </div>
    </div>
  );
}
