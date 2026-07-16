import { Trophy, RotateCcw, Eye, CheckCircle, TrendingUp } from "lucide-react";

export default function InterviewResult({ responses, setResponses }) {
  const interview = responses.interview;
  const evaluation = interview.evaluation;

  if (!evaluation) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p>No evaluation available.</p>
      </div>
    );
  }

  const score = evaluation.overallScore;

  let performance = "";
  let progressColor = "";

  if (score >= 90) {
    performance = "Outstanding";
    progressColor = "bg-green-500";
  } else if (score >= 80) {
    performance = "Excellent";
    progressColor = "bg-emerald-500";
  } else if (score >= 70) {
    performance = "Good";
    progressColor = "bg-blue-500";
  } else if (score >= 60) {
    performance = "Average";
    progressColor = "bg-yellow-500";
  } else {
    performance = "Needs Practice";
    progressColor = "bg-red-500";
  }

  function restartInterview() {
    setResponses((prev) => ({
      ...prev,

      interview: {
        started: false,

        difficulty: "medium",

        duration: 10,

        totalQuestions: 5,

        questions: [],

        currentQuestion: 0,

        answers: [],

        currentAnswer: "",

        showResult: false,

        evaluation: null,

        evaluating: false,

        timeLeft: 600,
      },
    }));
  }

  return (
    <div className="mt-5 flex flex-col gap-6">
      {/* Header */}

      <div className="rounded-xl bg-zinc-800 border border-zinc-700 p-6 text-center">
        <Trophy className="mx-auto text-yellow-400" size={50} />

        <h2 className="mt-3 text-2xl font-bold">Interview Complete</h2>

        <p className="text-zinc-400 mt-2">
          Great job completing your mock interview.
        </p>
      </div>

      {/* Overall Score */}

      <div className="rounded-xl bg-zinc-800 border border-zinc-700 p-6">
        <h3 className="font-semibold text-lg">Overall Score</h3>

        <div className="mt-5 text-center">
          <p className="text-5xl font-bold text-violet-400">{score}</p>

          <p className="mt-2 text-zinc-400">/100</p>

          <p className="mt-3 font-semibold">{performance}</p>
        </div>

        <div className="mt-6 h-3 rounded-full bg-zinc-700 overflow-hidden">
          <div
            className={`h-full ${progressColor}`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {/* Category Scores */}

      <div className="rounded-xl bg-zinc-800 border border-zinc-700 p-6">
        <h3 className="font-semibold text-lg">Category Scores</h3>

        <div className="mt-5 space-y-4">
          {Object.entries(evaluation.categoryScores).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </span>

              <span className="font-semibold">{value}/10</span>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths */}

      <div className="rounded-xl bg-zinc-800 border border-green-500/30 p-6">
        <div className="flex items-center gap-2">
          <CheckCircle className="text-green-400" size={20} />

          <h3 className="font-semibold text-lg">Strengths</h3>
        </div>

        <ul className="mt-4 space-y-3">
          {evaluation.strengths.map((item, index) => (
            <li key={index} className="text-sm text-zinc-300">
              • {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Improvements */}

      <div className="rounded-xl bg-zinc-800 border border-yellow-500/30 p-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-yellow-400" size={20} />

          <h3 className="font-semibold text-lg">Needs Improvement</h3>
        </div>

        <ul className="mt-4 space-y-3">
          {evaluation.improvements.map((item, index) => (
            <li key={index} className="text-sm text-zinc-300">
              • {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Buttons */}

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() =>
            setResponses((prev) => ({
              ...prev,

              interview: {
                ...prev.interview,

                showReview: true,
              },
            }))
          }
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 font-semibold hover:bg-violet-700 transition"
        >
          <Eye size={18} />
          Review your Answers
        </button>

        

        <button
          onClick={() =>
            setResponses((prev) => ({
              ...prev,

              interview: {
                started: false,
                difficulty: "medium",
                duration: 10,
                totalQuestions: 5,
                questions: [],
                currentQuestion: 0,
                answers: [],
                currentAnswer: "",
                showResult: false,
                showReview: false,
                evaluation: null,
                evaluating: false,
                timeLeft: 600,
              },
            }))
          }
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold hover:bg-violet-700 transition"
        >
          <RotateCcw size={18} />
          Restart Interview
        </button>
      </div>
    </div>
  );
}
