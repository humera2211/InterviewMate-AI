import useProblemData from "../hooks/useProblemData";
import { useState } from "react";
import { askAI } from "../services/aiService";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"

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

      console.log("Response : " , data.response);

      setResponse(data.response);
    } catch (err) {
      setResponse("Something went wrong");
      console.log("Error:", err);
    } finally {
      setLoadingAI(false);
    }
  }

  return (
    <div className="w-[500px] h-[720px] bg-zinc-900 text-white p-5 flex flex-col">
      <h1 className="text-2xl font-bold mb-5">InterviewMate AI</h1>

      <div className="flex-1 border border-zinc-700 rounded-xl p-4 flex flex-col min-h-0">
        {/* Problem Info */}
        <div className="space-y-3 flex-shrink-0">
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
            <p className="font-semibold mb-1">Statement</p>

            <div className="max-h-28 overflow-y-auto rounded-md bg-zinc-800 p-2 text-sm whitespace-pre-wrap">
              {problem?.statement}
            </div>
          </div>
        </div>

        {/* AI Section */}
        <div className="mt-5 pt-4 border-t border-zinc-700 flex flex-col flex-1 min-h-0">
          <h2 className="text-lg font-semibold mb-3">AI Assistant</h2>

          <div className="grid grid-cols-3 gap-2 flex-shrink-0">
            <button
              disabled={loadingAI}
              onClick={() => handleAIAction("explain")}
              className={`rounded-md py-2 text-sm font-medium transition ${
                loadingAI
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-cyan-600 hover:bg-cyan-700"
              }`}
            >
              Explain
            </button>

            <button
              disabled={loadingAI}
              onClick={() => handleAIAction("hint")}
              className={`rounded-md py-2 text-sm font-medium transition ${
                loadingAI
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-yellow-600 hover:bg-yellow-700"
              }`}
            >
              Hint
            </button>

            <button
              disabled={loadingAI}
              onClick={() => handleAIAction("approach")}
              className={`rounded-md py-2 text-sm font-medium transition ${
                loadingAI
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              Approach
            </button>
          </div>

          {/* Response */}
          <div className="mt-4 flex-1 min-h-0 overflow-y-auto rounded-lg border border-zinc-700 bg-zinc-800 p-4">
            {loadingAI ? (
              <p className="text-gray-400">Generating response...</p>
            ) : response ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                className="text-sm leading-7"
              >
                {response}
              </ReactMarkdown>
            ) : (
              <p className="text-gray-400">AI response will appear here.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
