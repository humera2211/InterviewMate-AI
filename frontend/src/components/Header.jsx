import { Sparkles, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Header({ problem }) {
  const difficultyColor = {
    Easy: "text-green-400",
    Medium: "text-yellow-400",
    Hard: "text-red-400",
  };

  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("user"));

  const initials = user?.username
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/logout`);
    } catch (err) {
      console.log(err);
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");

      navigate("/");
    }
  };

  return (
    <div className="bg-[#23242b] border border-zinc-700 rounded-2xl px-4 py-4 shadow-lg">
      <div className="flex flex-wrap items-center gap-y-3">
        {/* Logo + Title */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 shrink-0 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>

          <h1 className="text-lg font-bold tracking-tight text-white truncate">
            InterviewMate AI
          </h1>
        </div>

        <div className="ml-auto flex items-center gap-3">
          {token ? (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-600 text-sm font-semibold text-white hover:bg-cyan-700"
              >
                {initials || <User size={13} />}
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-zinc-700 bg-[#2b2d35] shadow-xl z-50">
                  <div className="border-b border-zinc-700 px-4 py-3">
                    <p className="font-light text-white">{user?.username}</p>
                    <p className="text-xs text-zinc-400">{user?.email}</p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left text-red-400 hover:bg-zinc-800 transition flex flex-row"
                  >
                    <LogOut size={15} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => navigate("/login")}
                className="rounded-lg border border-cyan-500 px-3 py-1 text-xs text-cyan-400 hover:bg-cyan-500 hover:text-white transition"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="rounded-lg bg-cyan-600 px-3 py-1 text-xs text-white hover:bg-cyan-700 transition"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Divider - full width, separates identity from problem info */}
        <div className="w-full h-px bg-zinc-700 my-1" />

        {/* Problem info row */}
        <div className="flex items-center gap-2 w-full min-w-0">
          <p className="truncate text-xs text-zinc-400 flex-1 min-w-0">
            {problem?.title}
          </p>

          <div className="flex flex-col justify-center items-center">
            <div
              className={`gap-1.5 text-xs shrink-0 ${difficultyColor[problem?.difficulty]}`}
            >
              {problem?.difficulty}
            </div>

             {/* Platform
            <div className="rounded-lg bg-zinc-700 px-2.5 py-1 text-xs text-zinc-300">
              {problem?.platform}
            </div> */}
            
          </div>
        </div>
      </div>
    </div>
  );
}
