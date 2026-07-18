import { Clock, Calendar, Trophy } from "lucide-react";
import { getInterviewAPI } from "../../../services/historyService";
import { deleteInterviewAPI } from "../../../services/historyService";

export default function HistoryCard({ interview, responses, setResponses, setHistory }) {
  const scoreColor =
    interview.overallScore >= 80
      ? "text-green-400"
      : interview.overallScore >= 60
        ? "text-yellow-400"
        : "text-red-400";

  const difficultyColor =
    interview.difficulty === "basic"
      ? "text-green-400"
      : interview.difficulty === "medium"
        ? "text-yellow-400"
        : "text-red-400";

  const formattedDate = new Date(interview.createdAt).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );

  async function handleViewReport() {
    try {
      const data = await getInterviewAPI(interview._id);

      setResponses((prev) => ({
        ...prev,

        interview: {
          ...prev.interview,

          historyReport: data.interview,
        },
      }));
    } catch (err) {
      console.log(err);

      alert(err.message);
    }
  }

  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this interview?",
    );

    if (!confirmDelete) return;

    try {
      await deleteInterviewAPI(interview._id);

      setHistory((prev) => prev.filter((item) => item._id !== interview._id));
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }

  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-4">
      {/* Problem Title */}
      <h3 className="font-semibold text-white line-clamp-2">
        {interview.problemTitle}
      </h3>

      {/* Difficulty */}
      <div className="mt-3 flex items-center justify-between">
        <span
          className={`rounded-full bg-zinc-700 px-3 py-1 text-xs font-semibold capitalize ${difficultyColor}`}
        >
          {interview.difficulty}
        </span>

        <div className={`flex items-center gap-1 font-semibold ${scoreColor}`}>
          <Trophy size={16} />
          {interview.overallScore}/100
        </div>
      </div>

      {/* Duration + Date */}

      <div className="mt-4 flex justify-between text-sm text-zinc-400">
        <div className="flex items-center gap-1">
          <Clock size={14} />
          {interview.duration} min
        </div>

        <div className="flex items-center gap-1">
          <Calendar size={14} />
          {formattedDate}
        </div>
      </div>

      {/* Buttons */}

      <div className="mt-5 flex gap-3">
        <button
          onClick={handleViewReport}
          className="flex-1 rounded-lg bg-violet-600 py-2 text-sm font-semibold hover:bg-violet-700 transition"
        >
          View Report
        </button>

        <button
          onClick={handleDelete}
          className="rounded-lg border border-red-500 px-4 py-2 text-sm text-red-400 hover:bg-red-500 hover:text-white transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
