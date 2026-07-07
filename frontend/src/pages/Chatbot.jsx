import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Chatbot = () => {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      setError("Please enter some text.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResponse("");

      const response = await axios.post("/api/v1/openai/chatbot", { text });

      setResponse(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-center text-cyan-600 mb-6">
          Chatbot
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            rows={10}
            placeholder="Paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:bg-gray-400"
          >
            {loading ? "Generating response..." : "Generate response"}
          </button>
        </form>

        {error && (
          <div className="mt-4 bg-red-100 text-red-700 p-3 rounded-lg">
            {error}
          </div>
        )}

        {response && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              Response
            </h2>

            <textarea
              rows={10}
              value={response}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-4 bg-gray-50 resize-none"
            />
          </div>
        )}

        <div className="mt-6 text-center">
          <Link to="/" className="text-cyan-600 font-medium hover:underline">
            ← Back to Tools
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
