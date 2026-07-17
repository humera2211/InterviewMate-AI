import useProblemData from "../hooks/useProblemData";

import { useState } from "react";

import Header from "../components/Header";
import NavigationTabs from "../components/NavigationTabs";
import ExplainPanel from "../components/panels/ExplainPanel";
import HintPanel from "../components/panels/HintPanel";
import ApproachPanel from "../components/panels/ApproachPanel";
import InterviewPanel from "../components/panels/InterviewPanel";
import HistoryPanel from "../components/panels/HistoryPanel";

export default function Dashboard() {
  const { problem, loading, error } = useProblemData();

  const [responses, setResponses] = useState({
    explain: {
      content: "",
      generatedAt: null,
    },

    hint: {
      level: 0,
      hints: [],
    },

    approach: {
      content: "",
      generatedAt: null,
    },

    interview: {
      started: false,

      difficulty: "medium",

      duration: 10,

      totalQuestions: 5,

      currentQuestion: 0,

      questions: [],

      answers: [],

      currentAnswer: "",

      score: null,

      showResult: false,

      timeLeft: 10 * 60, // seconds

      evaluation: null,

      evaluating: false,

      showReview: false,

      historyReport: null,
    },
  });
  const [loadingAI, setLoadingAI] = useState(false);
  const [activeTab, setActiveTab] = useState("explain");

  if (loading) {
    //loading hook
    return <div className="p-5">Loading...</div>;
  }

  if (error) {
    return <div className="p-5 text-red-500">{error}</div>;
  }

  return (
    <div className="w-125 min-h-screen bg-zinc-900 text-white p-5 flex flex-col">
      {/* Header  */}
      <Header problem={problem} />

      {/* Navigation  */}
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "explain" && (
        <ExplainPanel
          problem={problem}
          responses={responses}
          setResponses={setResponses}
        />
      )}

      {activeTab === "hint" && (
        <HintPanel
          problem={problem}
          responses={responses}
          setResponses={setResponses}
        />
      )}

      {activeTab === "approach" && <ApproachPanel />}

      {activeTab === "interview" && (
        <InterviewPanel
          problem={problem}
          responses={responses}
          setResponses={setResponses}
        />
      )}

      {activeTab === "history" && (
        <HistoryPanel responses={responses} setResponses={setResponses} />
      )}
    </div>
  );
}
