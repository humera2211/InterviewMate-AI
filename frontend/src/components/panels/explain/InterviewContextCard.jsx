import SectionCard from "./SectionCard";

export default function InterviewContextCard({ context }) {
  return (
    <SectionCard title="Interview Context">
      <p>
        <span className="font-medium text-cyan-400">Frequency:</span>{" "}
        {context.frequency}
      </p>

      <p className="mt-3">
        <span className="font-medium text-cyan-400">Companies:</span>{" "}
        {context.company_types}
      </p>
    </SectionCard>
  );
}
