import SectionCard from "./SectionCard";

export default function FollowUpCard({ questions }) {
  return (
    <SectionCard title="Interview Follow-up Questions">
      <div className="space-y-4">
        {questions.map((q, i) => (
          <div key={i} className="rounded-lg bg-zinc-800 p-4">
            <p className="font-semibold">{q.question}</p>

            <p className="mt-2 text-sm text-zinc-400">{q.impact_on_approach}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
