import { BookOpen, Lightbulb, Rocket, Mic } from "lucide-react";

const tabs = [
  {
    id: "explain",
    label: "Explain",
    icon: BookOpen,
  },
  {
    id: "hint",
    label: "Hint",
    icon: Lightbulb,
  },
  {
    id: "approach",
    label: "Approach",
    icon: Rocket,
  },
  {
    id: "interview",
    label: "Interview",
    icon: Mic,
  },
];

export default function NavigationTabs({ activeTab, setActiveTab }) {
  return (
    <div className="mt-2 border-b border-zinc-700">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 transition-all duration-200
              ${
                active
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Icon size={18} />

              <span className="text-xs">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
