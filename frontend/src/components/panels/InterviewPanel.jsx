import InterviewSetup from "./interview/InterviewSetup";
import InterviewSession from "./interview/InterviewSession";
import InterviewResult from "./interview/InterviewResult";
import InterviewReview from "./interview/InterviewReview";

export default function InterviewPanel({ problem, responses, setResponses }) {
  const interview = responses.interview;

  // Setup
  if (!interview.started) {
    return (
      <InterviewSetup
        problem={problem}
        responses={responses}
        setResponses={setResponses}
      />
    );
  }

  // Session
  if (interview.started && !interview.showResult) {
    return (
      <InterviewSession
        problem={problem}
        responses={responses}
        setResponses={setResponses}
      />
    );
  }

  // Result
  if (interview.showResult && !interview.showReview) {
    return (
      <InterviewResult responses={responses} setResponses={setResponses} />
    );
  }

  // Review
  return <InterviewReview responses={responses} setResponses={setResponses} />;
}
