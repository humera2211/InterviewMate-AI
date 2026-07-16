import { Mic, Clock, Play } from "lucide-react";
import { useState } from "react";
import { startInterviewAPI } from "../../../services/interviewService";

const difficultyOptions = [
  {
    id: "basic",
    title: "Basic",
    subtitle: "Friendly",
    description: "Great for beginners",
    color: "border-green-500 bg-green-500/10",
  },
  {
    id: "medium",
    title: "Medium",
    subtitle: "Standard",
    description: "Company level interview",
    color: "border-yellow-500 bg-yellow-500/10",
  },
  {
    id: "advanced",
    title: "Advanced",
    subtitle: "FAANG",
    description: "Follow-up heavy",
    color: "border-red-500 bg-red-500/10",
  },
];

const durationOptions = [5, 10, 15];

const questionMap = {
  5: 3,
  10: 5,
  15: 8,
};



export default function InterviewSetup({problem ,  responses, setResponses }) {

  const [loading , setLoading]=useState(false);
  const interview = responses.interview;

  function selectDifficulty(level) {
    setResponses((prev) => ({
      ...prev,
      interview: {
        ...prev.interview,
        difficulty: level,
      },
    }));
  }

  function selectDuration(duration) {
    setResponses((prev) => ({
      ...prev,
      interview: {
        ...prev.interview,
        duration,
        totalQuestions: questionMap[duration],
      },
    }));
  }

 async function startInterview() {
   try {
     setLoading(true);

     const data = await startInterviewAPI({
       title: problem.title || "",
       statement: problem.statement || "",
       difficulty: interview.difficulty,
       duration: interview.duration,
       totalQuestions: interview.totalQuestions,
     });

     setResponses((prev) => ({
       ...prev,
       interview: {
         ...prev.interview,

         started: true,

         questions: data.questions,

         currentQuestion: 0,

         answers: [],

         currentAnswer: "",

         showResult: false,

         timeLeft: prev.interview.duration * 60,
       },
     }));
   } catch (err) {
      console.error(err);

      alert(err.message);
   } finally {
     setLoading(false);
   }
 }

  return (
    <div className="mt-5 flex flex-col flex-1">
      {/* Heading */}
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold">Mock Interview</h2>
      </div>

      <p className="mt-2 text-sm text-zinc-400">
        Practice like a real coding interview.
      </p>

      {/* Difficulty */}
      <div className="mt-8">
        <h3 className="mb-4 font-semibold">Interview Difficulty</h3>

        <div className="grid grid-cols-3 gap-3">
          {difficultyOptions.map((item) => {
            const active = interview.difficulty === item.id;

            return (
              <button
                key={item.id}
                onClick={() => selectDifficulty(item.id)}
                className={`rounded-xl border p-4 text-left transition
                ${
                  active
                    ? item.color
                    : "border-zinc-700 hover:border-zinc-500 bg-zinc-800"
                }`}
              >
                <h4 className="font-semibold">{item.title}</h4>

                <p className="text-sm text-zinc-400">{item.subtitle}</p>

                <p className="mt-2 text-xs text-zinc-500">{item.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Duration */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={18} className="text-violet-400" />

          <h3 className="font-semibold">Interview Duration</h3>
        </div>

        <div className="flex gap-3">
          {durationOptions.map((time) => {
            const active = interview.duration === time;

            return (
              <button
                key={time}
                onClick={() => selectDuration(time)}
                className={`rounded-lg px-5 py-2 transition
                ${active ? "bg-violet-600" : "bg-zinc-800 hover:bg-zinc-700"}`}
              >
                {time} min
              </button>
            );
          })}
        </div>
      </div>

      {/* Estimated Questions */}
      <div className="mt-4 rounded-xl border border-zinc-700 bg-zinc-800 p-5 flex flex-col justify-center items-center">
        <h3 className="font-semibold">Estimated Questions</h3>

        <p className="mt-1 mb-1 text-3xl font-bold">
          {interview.totalQuestions}
        </p>

        {/* Start */}
        <button
          onClick={startInterview}
          disabled={loading}
          className={`mt-auto flex items-center justify-center gap-2 rounded-xl py-3 px-3 font-semibold transition ${
            loading
              ? "bg-zinc-600 cursor-not-allowed"
              : "bg-violet-600 hover:bg-violet-700"
          }`}
        >
          <Play size={18} />
          {loading ? "Preparing Interview..." : "Start Interview"}
        </button>
      </div>
    </div>
  );
}
