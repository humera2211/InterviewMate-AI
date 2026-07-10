import useProblemData from "../hooks/useProblemData";

export default function Dashboard() {
  const { problem, loading, error } = useProblemData();

  if (loading) {
    return <div className="p-5">Loading...</div>;
  }

  if (error) {
    return <div className="p-5 text-red-500">{error}</div>;
  }

  return (
    <div className="p-5 bg-zinc-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">InterviewMate AI</h1>

      <div className="border border-zinc-700 rounded-xl p-4 space-y-4">
        <div>
          <p className="font-semibold">Platform</p>
          <p>{problem?.platform}</p>
        </div>

        <div>
          <p className="font-semibold">Title</p>
          <p>{problem?.title}</p>
        </div>

        <div>
          <p className="font-semibold">Difficulty</p>
          <p>{problem?.difficulty}</p>
        </div>

        <div>
          <p className="font-semibold">Statement</p>

          <p className="text-sm whitespace-pre-wrap max-h-40 overflow-y-auto">
            {problem?.statement}
          </p>
        </div>

        <div className="mt-5 border-t border-gray-700 pt-4">
          <h2 className="text-lg font-semibold mb-3">AI Assistant</h2>

          <div className="flex flex-col gap-2">
            <button
              className="bg-cyan-600 hover:bg-cyan-700 rounded-md py-2 font-medium"
              onClick={() => console.log("Explain")}
            >
              Explain Problem
            </button>

            <button
              className="bg-yellow-600 hover:bg-yellow-700 rounded-md py-2 font-medium"
              onClick={() => console.log("Hint")}
            >
              Give Hint
            </button>

            <button
              className="bg-green-600 hover:bg-green-700 rounded-md py-2 font-medium"
              onClick={() => console.log("Optimal approach")}
            >
              Optimal Approach
            </button>
          </div>

          <div className="mt-4 p-3 rounded-md bg-zinc-900 border border-zinc-700">
            <p className="text-sm text-gray-400">
              AI response will appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
