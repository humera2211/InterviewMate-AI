import useCurrentTab from "../hooks/useCurrentTab";

export default function Dashboard() {
  const { tab, loading, error } = useCurrentTab();

  if (loading) {
    return (
      <div className="p-5 text-white bg-zinc-900 min-h-screen">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="p-5 text-red-500 bg-zinc-900 min-h-screen">{error}</div>
    );
  }

  return (
    <div className="p-5 bg-zinc-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold">InterviewMate AI</h1>

      <div className="mt-6 border border-zinc-700 rounded-xl p-4">
        <p>
          <strong>Title:</strong>
        </p>

        <p className="mb-4">{tab?.title}</p>

        <p>
          <strong>URL:</strong>
        </p>

        <p className="break-all">{tab?.url}</p>
      </div>
    </div>
  );
}
