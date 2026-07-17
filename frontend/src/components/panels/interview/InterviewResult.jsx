import {
  Trophy,
  RotateCcw,
  Eye,
  CheckCircle,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";

export default function InterviewResult({
  responses,
  setResponses,
  evaluation,
  fromHistory = false,
}) {
  const interview = responses.interview;

  // History se data aaya ho to wahi use hoga,
  // warna current interview evaluation use hoga.
  const result = evaluation || interview.evaluation;

  if (!result) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p>No evaluation available.</p>
      </div>
    );
  }

  const score = result.overallScore;

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

        showReview: false,

        evaluation: null,

        evaluating: false,

        historyReport: null,

        timeLeft: 600,
      },
    }));
  }

  function backToHistory() {
    setResponses((prev) => ({
      ...prev,

      interview: {
        ...prev.interview,

        historyReport: null,

        showReview: false,
      },
    }));
  }

  return (
    <div className="mt-5 flex flex-col gap-6">
      {/* Header */}

      <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-6 text-center">
        <Trophy className="mx-auto text-yellow-400" size={50} />

        <h2 className="mt-3 text-2xl font-bold">
          {fromHistory ? "Interview Report" : "Interview Complete"}
        </h2>

        <p className="mt-2 text-zinc-400">
          {fromHistory
            ? "Review your previous interview."
            : "Great job completing your mock interview."}
        </p>
      </div>

      {/* Overall Score */}

      <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-6">
        <h3 className="text-lg font-semibold">Overall Score</h3>

        <div className="mt-5 text-center">
          <p className="text-5xl font-bold text-violet-400">{score}</p>

          <p className="mt-2 text-zinc-400">/100</p>

          <p className="mt-3 font-semibold">{performance}</p>
        </div>

        <div className="mt-6 h-3 overflow-hidden rounded-full bg-zinc-700">
          <div
            className={`h-full ${progressColor}`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {/* Category Scores */}

      <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-6">
        <h3 className="text-lg font-semibold">Category Scores</h3>

        <div className="mt-5 space-y-4">
          {Object.entries(result.categoryScores).map(([key, value]) => (
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

      <div className="rounded-xl border border-green-500/30 bg-zinc-800 p-6">
        <div className="flex items-center gap-2">
          <CheckCircle className="text-green-400" size={20} />

          <h3 className="text-lg font-semibold">Strengths</h3>
        </div>

        <ul className="mt-4 space-y-3">
          {result.strengths.map((item, index) => (
            <li key={index} className="text-sm text-zinc-300">
              • {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Improvements */}

      <div className="rounded-xl border border-yellow-500/30 bg-zinc-800 p-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-yellow-400" size={20} />

          <h3 className="text-lg font-semibold">Needs Improvement</h3>
        </div>

        <ul className="mt-4 space-y-3">
          {result.improvements.map((item, index) => (
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
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 font-semibold transition hover:bg-violet-700"
        >
          <Eye size={18} />
          {fromHistory ? "Review Answers" : "Review your Answers"}
        </button>

        {!fromHistory ? (
          <button
            onClick={restartInterview}
            className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 font-semibold transition hover:bg-violet-700"
          >
            <RotateCcw size={18} />
            Restart Interview
          </button>
        ) : (
          <button
            onClick={backToHistory}
            className="flex items-center justify-center gap-2 rounded-xl bg-zinc-700 py-3 font-semibold transition hover:bg-zinc-600"
          >
            <ArrowLeft size={18} />
            Back to History
          </button>
        )}
      </div>
    </div>
  );
}
