import { useState } from "react";
import { askAI } from "../../services/aiService";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BookOpen, RotateCw } from "lucide-react";

export default function ExplainPanel({ problem, responses, setResponses }) {
  const [loading, setLoading] = useState(false);

  async function handleExplain() {
    try {
      setLoading(true);

      const data = await askAI(problem, "explain");

      console.log(data);
      console.log(data.response);

      setResponses((prev) => ({
        ...prev,
        explain: {
          content: data.response,
          generatedAt: new Date(),
        },
      }));
    } catch (err) {
      console.error(err);

      setResponses((prev) => ({
        ...prev,
        explain: {
          content: ` ${err.message}`,
          generatedAt: new Date(),
        },
      }));
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="mt-5 flex flex-col flex-1 min-h-0">
      {/* Heading */}
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="text-cyan-400" size={22} />
          <h2 className="text-xl font-semibold">Explain Problem</h2>
        </div>

        <p className="mt-2 text-sm text-zinc-400">
          what the problem is asking before thinking about the solution.
        </p>
      </div>

      {/* Explain Button */}
      <button
        disabled={loading}
        onClick={handleExplain}
        className={`mt-4 w-fit rounded-lg px-5 py-2.5 font-medium transition
  ${
    loading ? "bg-zinc-600 cursor-not-allowed" : "bg-cyan-600 hover:bg-cyan-700"
  }`}
      >
        {loading ? "Generating..." : "Explain Problem"}
      </button>

      {/* Response Card */}
      <div className="mt-5 flex-1 rounded-xl border border-zinc-700 bg-zinc-800 p-5 min-h-0 flex flex-col">
        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-zinc-700 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen size={18} className="text-cyan-400" />
            <h3 className="font-semibold">AI Explanation</h3>
          </div>

          {/* Refresh Button */}
          {responses.explain.content && (
            <button
              onClick={handleExplain}
              disabled={loading}
              className={`transition ${
                loading
                  ? "text-zinc-600 cursor-not-allowed"
                  : "text-zinc-400 hover:text-cyan-400"
              }`}
              title="Regenerate"
            >
              <RotateCw size={18} className={loading ? "animate-spin" : ""} />
            </button>
          )}
        </div>

        {/* Card Body */}
        <div className="mt-4 flex-1 overflow-y-auto">
          {/* Loading */}
          {loading && <p className="text-zinc-400">Thinking...</p>}

          {/* Response */}
          {!loading && responses.explain.content && (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              className="text-sm leading-7"
            >
              {responses.explain.content}
            </ReactMarkdown>
          )}

          {/* Empty State */}
          {!loading && !responses.explain.content && (
            <div className="h-full flex items-center justify-center text-center">
              <div>
                <BookOpen size={40} className="mx-auto text-cyan-400 mb-4" />

                <h4 className="text-lg font-semibold">Ready to Understand?</h4>

                <p className="mt-2 text-sm text-zinc-400">
                  Click <span className="text-cyan-400">"Explain Problem"</span>
                  <br />
                  to generate an AI explanation.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
