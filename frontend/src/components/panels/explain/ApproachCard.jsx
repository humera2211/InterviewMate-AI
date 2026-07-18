import SectionCard from "./SectionCard";

export default function ApproachCard({ title, approach }) {
  if (!approach) return null;

  return (
    <SectionCard title={title}>
      <Field label="Idea" value={approach.idea} />

      {approach.fixes && <Field label="Fixes" value={approach.fixes} />}

      <Field label="Data Structure" value={approach.data_structure} />

      <Field label="Why this DS?" value={approach.why_ds} />

      <Field label="Time Complexity" value={approach.time_complexity} />

      <Field label="Reason" value={approach.time_reasoning} />

      <Field label="Space Complexity" value={approach.space_complexity} />

      <Field label="Reason" value={approach.space_reasoning} />

      {approach.key_insight && (
        <Field label="Key Insight" value={approach.key_insight} />
      )}

      <List title="Edge Cases" items={approach.edge_cases} />

      <List title="Common Mistakes" items={approach.common_mistakes} />
    </SectionCard>
  );
}

function Field({ label, value }) {
  return (
    <div className="mb-4">
      <p className="font-medium text-cyan-400">{label}</p>

      <p className="text-zinc-300">{value}</p>
    </div>
  );
}

function List({ title, items }) {
  if (!items?.length) return null;

  return (
    <div className="mb-4">
      <p className="font-medium text-cyan-400 mb-2">{title}</p>

      <ul className="list-disc pl-5 space-y-1">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
