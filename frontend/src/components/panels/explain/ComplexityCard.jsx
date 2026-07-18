import SectionCard from "./SectionCard";

export default function ComplexityCard({ text }) {
  return (
    <SectionCard title="Complexity Reduction Path">
      <p className="whitespace-pre-line">{text}</p>
    </SectionCard>
  );
}
