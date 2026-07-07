import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, FileText, MessageSquare } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center px-6">
      <div className="max-w-5xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-14">
          <h1 className="text-5xl md:text-6xl font-bold mb-5">
            Welcome to <span className="text-cyan-400">AI Assistant</span>
          </h1>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Chat with AI, summarize long documents, generate ideas, and boost
            your productivity using Google's Gemini AI.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800 rounded-2xl p-7 hover:scale-105 transition duration-300 shadow-lg">
            <FileText className="text-green-400 mb-4" size={40} />
            <Link to="/summary" className="text-xl font-semibold mb-2">
              Summarize Text
            </Link>
            <p className="text-gray-400">
              Convert lengthy articles and notes into concise summaries.
            </p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-7 hover:scale-105 transition duration-300 shadow-lg">
            <MessageSquare className="text-purple-400 mb-4" size={40} />
            <Link to="/paragraph" className="text-xl font-semibold mb-2">
              Paragraph
            </Link>
            <p className="text-gray-400">Generate paragraphs with words</p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-7 hover:scale-105 transition duration-300 shadow-lg">
            <MessageSquare className="text-purple-400 mb-4" size={40} />
            <Link to="/chatbot" className="text-xl font-semibold mb-2">
              Chatbot
            </Link>
            <p className="text-gray-400">chat with AI</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
