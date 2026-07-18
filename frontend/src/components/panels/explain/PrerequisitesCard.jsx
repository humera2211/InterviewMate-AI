import SectionCard from "./SectionCard";

export default function PrerequisitesCard({ prerequisites }) {
  return (
    <SectionCard title="Prerequisites">
      <h4 className="font-medium text-cyan-400 mb-2">Topics</h4>

      <ul className="list-disc pl-5 space-y-1">
        {prerequisites.topics.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>

      <h4 className="font-medium text-cyan-400 mt-5 mb-2">
        Foundational Questions
      </h4>

      <div className="space-y-3">
        {prerequisites.foundational_questions.map((q, index) => (
          <div key={index} className="rounded-lg bg-zinc-800 p-3">
            <p className="font-medium">{q}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
