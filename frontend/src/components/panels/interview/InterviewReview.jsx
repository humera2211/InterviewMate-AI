import { ArrowLeft, CheckCircle, MessageSquare } from "lucide-react";

export default function InterviewReview({
  responses,
  setResponses,
  review,
  questions,
  answers,
  fromHistory = false,
}) {
  const interview = responses.interview;

  const reviewData = review || interview.evaluation?.review;
  const questionList = questions || interview.questions;
  const answerList = answers || interview.answers;

  if (!reviewData) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p>No review available.</p>
      </div>
    );
  }

  function handleBack() {
    setResponses((prev) => ({
      ...prev,
      interview: {
        ...prev.interview,
        showReview: false,
      },
    }));
  }

  return (
    <div className="mt-5 flex flex-col gap-5">
      {/* Header */}

      <div className="flex items-center justify-between">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 hover:bg-zinc-700 transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h2 className="text-xl font-semibold">
          {fromHistory ? "Interview Review" : "Review Answers"}
        </h2>
      </div>

      {/* Questions */}

      <div className="space-y-5">
        {reviewData.map((item) => {
          const question = questionList.find((q) => q.id === item.questionId);

          const answer = answerList.find(
            (a) => a.questionId === item.questionId,
          );

          return (
            <div
              key={item.questionId}
              className="rounded-xl border border-zinc-700 bg-zinc-800 p-5"
            >
              {/* Question */}

              <div>
                <h3 className="font-semibold text-violet-400">
                  Question {item.questionId}
                </h3>

                <p className="mt-2 text-zinc-300">{question?.question}</p>
              </div>

              {/* User Answer */}

              <div className="mt-5">
                <div className="flex items-center gap-2">
                  <MessageSquare className="text-blue-400" size={18} />

                  <h4 className="font-semibold">Your Answer</h4>
                </div>

                <div className="mt-2 rounded-lg bg-zinc-900 p-4 text-sm leading-7 text-zinc-300 whitespace-pre-wrap">
                  {answer?.answer || "No answer submitted."}
                </div>
              </div>

              {/* Expected Answer */}

              <div className="mt-5">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-400" size={18} />

                  <h4 className="font-semibold">Expected Answer</h4>
                </div>

                <div className="mt-2 rounded-lg border border-green-500/20 bg-zinc-900 p-4 text-sm leading-7 text-zinc-300 whitespace-pre-wrap">
                  {item.expectedAnswer}
                </div>
              </div>

              {/* Feedback */}

              <div className="mt-5 rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-yellow-400">AI Feedback</h4>

                  <span className="rounded-full bg-violet-600 px-3 py-1 text-xs font-semibold">
                    {item.score}/10
                  </span>
                </div>

                <p className="mt-3 text-sm leading-7 text-zinc-300">
                  {item.feedback}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
