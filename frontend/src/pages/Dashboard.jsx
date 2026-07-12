import useProblemData from "../hooks/useProblemData";
import { useState } from "react";
import { askAI } from "../services/aiService";

export default function Dashboard() {
  const { problem, loading, error } = useProblemData();

  const [response, setResponse] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  if (loading) {
    //loading hook
    return <div className="p-5">Loading...</div>;
  }

  if (error) {
    return <div className="p-5 text-red-500">{error}</div>;
  }

  async function handleAIAction(action) {
    try {
      setLoadingAI(true);
      const data = await askAI(problem, action);

      setResponse(data.response);
    } catch (err) {
      setResponse("Something went wrong");
      console.log("Error:", err);
    } finally {
      setLoadingAI(false);
    }
  }

  return (
    <div className="p-5 bg-zinc-900 text-white w-[500px] h-[720px]  flex flex-col">
      <h1 className="text-2xl font-bold mb-6">InterviewMate AI</h1>

      <div className="border border-zinc-700 rounded-xl p-4 flex flex-col flex-1 overflow-hidden">
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

          <p className="text-sm whitespace-pre-wrap max-h-28 overflow-y-auto">
            {problem?.statement}
          </p>
        </div>

        <div className="mt-5 border-t border-gray-700 pt-4 flex flex-col flex-1">
          <h2 className="text-lg font-semibold mb-3">AI Assistant</h2>

          <div className="grid grid-cols-3 gap-2">
            <button
              className="bg-cyan-600 hover:bg-cyan-700 rounded-md py-2 font-medium"
              onClick={()=>handleAIAction("explain")}
            >
              Explain Problem
            </button>

            <button
              className="bg-yellow-600 hover:bg-yellow-700 rounded-md py-2 font-medium"
              onClick={()=>handleAIAction("hint")}
            >
              Give Hint
            </button>

            <button
              className="bg-green-600 hover:bg-green-700 rounded-md py-2 font-medium"
              onClick={()=>handleAIAction("approach")}
            >
              Optimal Approach
            </button>
          </div>

          <div className="mt-3 bg-zinc-800 rounded-lg border border-zinc-700 p-3 flex-1 overflow-y-auto min-h-0">
            <p className="whitespace-pre-wrap text-sm">
              {loadingAI
                ? "Generating response..."
                : response || "AI response will apprear here"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
