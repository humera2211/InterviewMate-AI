import { useState } from "react";
import { Lightbulb, RotateCw } from "lucide-react";
import { askAI } from "../../services/aiService";

export default function HintPanel({ problem, responses, setResponses }) {
  const [loading, setLoading] = useState(false);

  const level = responses.hint.level;

  const buttonText =
    level === 0
      ? "Get First Hint"
      : level < 3
        ? "Next Hint"
        : "All Hints Revealed";

  async function handleHint() {
    try {
      setLoading(true);

      // First API Call
      if (responses.hint.hints.length === 0) {
        const data = await askAI(problem, "hint");

        console.log(data);

        setResponses((prev) => ({
          ...prev,
          hint: {
            level: 1,
            hints: data.hints,
          },
        }));
      }

      // Reveal Next Hint
      else {
        setResponses((prev) => ({
          ...prev,
          hint: {
            ...prev.hint,
            level: Math.min(prev.hint.level + 1, 3),
          },
        }));
      }
    } catch (err) {
      console.error("Hint Error:", err);

      setResponses((prev) => ({
        ...prev,
        hint: {
          level: 0,
          hints: [
            `${err.message || "AI is busy to generate hints. Please try again."}`,
          ],
        },
      }));
    } finally {
      setLoading(false);
    }
  }

  async function handleRefresh() {
    try {
      setLoading(true);

      const data = await askAI(problem, "hint");

      setResponses((prev) => ({
        ...prev,
        hint: {
          level: 1,
          hints: data.hints,
        },
      }));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-5 flex flex-col flex-1 min-h-0">
      

      {/* Button */}
      <button
        onClick={handleHint}
        disabled={loading || level === 3}
        className={`mt-4 w-fit rounded-lg px-5 py-2.5 font-medium transition
        ${
          loading || level === 3
            ? "bg-zinc-600 cursor-not-allowed"
            : "bg-amber-500 hover:bg-amber-600"
        }`}
      >
        {loading ? "Generating..." : buttonText}
      </button>


        {/* Body */}
        <div className="mt-4 flex-1 overflow-y-auto">
          {responses.hint.hints.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <p className="mt-3 text-sm text-zinc-400 leading-7">
                  Generate your first hint to start thinking about the problem.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {responses.hint.hints
                .slice(0, responses.hint.level)
                .map((hint, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-amber-500/20 bg-zinc-900 p-4"
                  >
                    <h4 className="mb-2 font-semibold text-amber-400">
                      Hint {index + 1}
                    </h4>

                    <p className="text-sm leading-7 text-zinc-300">{hint}</p>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
  );
}
