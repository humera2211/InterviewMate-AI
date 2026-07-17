import { useEffect, useState } from "react";
import { getHistoryAPI } from "../../services/historyService";
import HistoryCard from "../HistoryCard";
import InterviewResult from "./interview/InterviewResult";
import InterviewReview from "./interview/InterviewReview";

export default function HistoryPanel({responses , setResponses}) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      try {
        const data = await getHistoryAPI();

        setHistory(data.history);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-lg font-semibold">Loading History...</p>
      </div>
    );
  }

  if (responses.interview.historyReport && responses.interview.showReview) {
    return (
      <InterviewReview
        responses={responses}
        setResponses={setResponses}
        review={responses.interview.historyReport.evaluation.review}
        questions={responses.interview.historyReport.questions}
        answers={responses.interview.historyReport.answers}
        fromHistory={true}
      />
    );
  }

  if (responses.interview.historyReport) {
    return (
      <InterviewResult
        responses={responses}
        setResponses={setResponses}
        evaluation={responses.interview.historyReport.evaluation}
        fromHistory={true}
      />
    );
  }

  if (history.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-zinc-400">No Interview History Found</p>
      </div>
    );
  }

  return (
    <div className="mt-5 flex flex-col gap-4 overflow-y-auto pr-1">
      <h2 className="text-xl font-semibold">Interview History</h2>

      {history.map((item) => (
        <HistoryCard
          key={item._id}
          interview={item}
          responses={responses}
          setResponses={setResponses}
          setHistory={setHistory}
        />
      ))}
    </div>
  );
}
