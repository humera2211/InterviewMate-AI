import { useState } from "react";
import { askAI } from "../../services/aiService";
import { BookOpen, RotateCw } from "lucide-react";
import CategoryCard from "./explain/CategoryCard";
import PrerequisitesCard from "./explain/PrerequisitesCard";
import ApproachCard from "./explain/ApproachCard";
import ComplexityCard from "./explain/ComplexityCard";
import FollowUpCard from "./explain/FollowUpCard";
import InterviewContextCard from "./explain/InterviewContextCard";
import SimilarQuestionsCard from "./explain/SimilarQuestionCard";

export default function ExplainPanel({ problem, responses, setResponses }) {
  const [loading, setLoading] = useState(false);
  const content = responses.explain.content;

  async function handleExplain() {
    try {
      setLoading(true);

      const data = await askAI(problem, "explain");

      console.log(data); //json object milega

      setResponses((prev) => ({
        ...prev,
        explain: {
          content: data,
          generatedAt: new Date(),
          error: null,
        },
      }));
    } catch (err) {
      console.error(err);

      setResponses((prev) => ({
        ...prev,
        explain: {
          content: null,
          generatedAt: new Date(),
          error: err.message,
        },
      }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-5 flex flex-col flex-1 min-h-0">
      
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
       
        {/* Card Body */}
        <div className="mt-4 flex-1 overflow-y-auto">
          {/* Loading */}
          {loading && <p className="text-zinc-400">Thinking...</p>}

          {/* Response */}
          {!loading && responses.explain.content && (
            <div className="space-y-5">
              <CategoryCard category={content.category} />

              <PrerequisitesCard prerequisites={content.prerequisites} />

              <ApproachCard
                title="Brute Force"
                approach={content.brute_force}
              />

              <ApproachCard
                title="Better Approach"
                approach={content.better_approach}
              />

              <ApproachCard
                title="Optimal Approach"
                approach={content.optimal_approach}
              />

              <ComplexityCard text={content.complexity_reduction_path} />

              <FollowUpCard questions={content.follow_up_questions} />

              <InterviewContextCard context={content.interview_context} />

              <SimilarQuestionsCard questions={content.similar_questions} />
            </div>
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
