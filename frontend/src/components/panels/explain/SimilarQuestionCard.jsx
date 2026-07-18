import SectionCard from "./SectionCard";

export default function SimilarQuestionsCard({ questions }) {
  return (
    <SectionCard title="Similar Questions">
      <div className="space-y-3">
        {questions.map((q) => (
          <div key={q.name} className="rounded-lg bg-zinc-800 p-3">
            <p className="font-semibold">{q.name}</p>

            <p className="text-sm text-zinc-400 mt-1">{q.difference}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
