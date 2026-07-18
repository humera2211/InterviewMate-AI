export default function SectionCard({ title, children }) {
  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-5">
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>

      {children}
    </div>
  );
}
