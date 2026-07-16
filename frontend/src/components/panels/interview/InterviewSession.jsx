import { useEffect } from "react";
import { evaluateInterviewAPI } from "../../../services/interviewService";

export default function InterviewSession({problem , responses , setResponses}) {

    const interview = responses.interview;

    useEffect(() => {
      if (!interview.started || interview.showResult) return;

      if (interview.timeLeft <= 0) {
        setResponses((prev) => ({
          ...prev,
          interview: {
            ...prev.interview,
            showResult: true,
          },
        }));

        return;
      }

      const timer = setTimeout(() => {
        setResponses((prev) => ({
          ...prev,
          interview: {
            ...prev.interview,
            timeLeft: prev.interview.timeLeft - 1,
          },
        }));
      }, 1000);

      return () => clearTimeout(timer);
    }, [
      interview.timeLeft,
      interview.started,
      interview.showResult,
      setResponses,
    ]);


      if (interview.evaluating) {
        return (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-lg">Evaluating your interview...</p>
          </div>
        );
      }

    const minutes = String(Math.floor(interview.timeLeft / 60)).padStart(
      2,
      "0",
    );

    const seconds = String(interview.timeLeft % 60).padStart(2, "0");

    const currentQuestion = interview.questions[interview.currentQuestion];

    async function handleSubmit() {
      const updatedAnswers = [
        ...interview.answers,
        {
          questionId: currentQuestion.id,
          answer: interview.currentAnswer,
        },
      ];

      // Last Question
      if (interview.currentQuestion === interview.questions.length - 1) {
        try {

    setResponses(prev=>({

        ...prev,

        interview:{

            ...prev.interview,

            evaluating:true

        }

    }));


    const data = await evaluateInterviewAPI({

        title:problem.title,

        statement:problem.statement,

        difficulty:interview.difficulty,

        questions:interview.questions,

        answers:updatedAnswers

    });

    console.log(data);

    setResponses(prev=>({

        ...prev,

        interview:{

            ...prev.interview,

            answers:updatedAnswers,

            evaluation:data,

            evaluating:false,

            showResult:true , 
            currentAnswer:"",

        }

    }));

    console.log("Evaluated :" , data);

}
catch(err){

    console.log(err);

    alert(err.message);

    setResponses(prev=>({

        ...prev,

        interview:{

            ...prev.interview,

            evaluating:false

        }

    }));

}

return;
      }

      // Next Question

      setResponses((prev) => ({
        ...prev,

        interview: {
          ...prev.interview,

          answers: updatedAnswers,

          currentQuestion: prev.interview.currentQuestion + 1,

          currentAnswer: "",
        },
      }));
    }


  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Mock Interview</h2>

          <p className="text-zinc-400 text-sm">
            Question {interview.currentQuestion + 1}
            of {interview.questions.length}
          </p>
        </div>

        <div className="rounded-lg bg-zinc-800 mx-3 px-3 py-2 font-semibold text-violet-400">
         {minutes}:{seconds}
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-zinc-700 bg-zinc-800 p-5">
        <h3 className="text-sm font-medium">{currentQuestion.question}</h3>

      <textarea
        value={interview.currentAnswer}
        onChange={(e) =>
          setResponses((prev) => ({
            ...prev,
            interview: {
              ...prev.interview,
              currentAnswer: e.target.value,
            },
          }))
        }
        placeholder="Type your answer here..."
        className="mt-5 h-48 w-full resize-none rounded-xl border border-zinc-700 bg-zinc-800 p-4 outline-none focus:border-violet-500"
      />

      <div className="mt-2 text-right text-xs text-zinc-500">
        {interview.currentAnswer.length} / 1000 characters
      </div>

      <button
        onClick={handleSubmit}
        disabled={!interview.currentAnswer.trim()}
        className={`mt-6 w-full rounded-xl py-3 font-semibold transition

${
  !interview.currentAnswer.trim()
    ? "bg-zinc-700 cursor-not-allowed"
    : "bg-violet-600 hover:bg-violet-700"
}`}
      >
        Submit Answer
      </button>
      </div>
    </div>
  );
}
