import InterviewSetup from "./interview/InterviewSetup";
import InterviewSession from "./interview/InterviewSession";
import InterviewResult from "./interview/InterviewResult";
import InterviewReview from "./interview/InterviewReview";

export default function InterviewPanel({ problem, responses, setResponses }) {
  const interview = responses.interview;

  if (!interview.started) {
    return (
      <InterviewSetup
        problem={problem}
        responses={responses}
        setResponses={setResponses}
      />
    );
  }

  if (interview.started && !interview.showResult) {
    return (
      <InterviewSession
        problem={problem}
        responses={responses}
        setResponses={setResponses}
      />
    );
  }

  if (interview.showResult && !interview.showReview) {
    return (
      <InterviewResult
        responses={responses}
        setResponses={setResponses}
        evaluation={responses.interview.historyReport.evaluation}
        fromHistory={true}
      />
    );
  }

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
