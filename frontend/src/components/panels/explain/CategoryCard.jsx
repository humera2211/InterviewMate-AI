export default function CategoryCard({ category }) {
  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-5">
      <h3 className="text-lg font-semibold mb-4">Category / Pattern</h3>

      <div className="flex flex-wrap gap-2">
        {category.map((item) => (
          <span
            key={item}
            className="rounded-full bg-cyan-600/20 px-3 py-1 text-sm text-cyan-300"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
