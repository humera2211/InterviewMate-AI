import { Sparkles } from "lucide-react";

export default function Header({ problem }) {
  const difficultyColor = {
    Easy: "text-green-400",
    Medium: "text-yellow-400",
    Hard: "text-red-400",
  };

  return (
    <div className="bg-[#23242b] border border-zinc-700 rounded-2xl px-4 py-4 shadow-lg">
      <div className="flex flex-wrap items-center gap-y-3">
        {/* Logo + Title */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 shrink-0 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>

          <h1 className="text-lg font-bold tracking-tight text-white truncate">
            InterviewMate AI
          </h1>
        </div>

        {/* Platform badge pushed to end on same row when space allows */}
        <div className="ml-auto rounded-lg bg-zinc-700 px-2.5 py-1 text-xs text-zinc-300 shrink-0">
          {problem?.platform}
        </div>

        {/* Divider - full width, separates identity from problem info */}
        <div className="w-full h-px bg-zinc-700 my-1" />

        {/* Problem info row */}
        <div className="flex items-center gap-2 w-full min-w-0">
          <p className="truncate text-xs text-zinc-400 flex-1 min-w-0">
            {problem?.title}
          </p>

          <div
            className={`flex items-center gap-1.5 text-xs shrink-0 ${difficultyColor[problem?.difficulty]}`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-current" />
            {problem?.difficulty}
          </div>
        </div>
      </div>
    </div>
  );
}
