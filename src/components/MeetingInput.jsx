import { useState } from "react";

export default function MeetingInput() {
  const [mode, setMode] = useState("paste"); // "paste" or "record"
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");

  const handleSummarize = () => {
    // fake summary for now (later call backend/AI)
    if (!text.trim()) {
      setSummary("⚠️ No input provided.");
    } else {
      setSummary("📄 This is where the generated summary will appear...");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Meeting Summarizer</h2>

      {/* Mode toggle */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg shadow ${
            mode === "paste" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setMode("paste")}
        >
          Paste Transcript
        </button>
        <button
          className={`px-4 py-2 rounded-lg shadow ${
            mode === "record" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setMode("record")}
        >
          Record Meeting
        </button>
      </div>

      {mode === "paste" ? (
        <>
          {/* Paste mode */}
          <textarea
            className="w-full h-40 p-3 border-2 border-gray-300 rounded-xl shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Paste or type meeting transcript here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            onClick={handleSummarize}
          >
            Summarize
          </button>
        </>
      ) : (
        <>
          {/* Record mode (placeholder for now) */}
          <div className="p-6 border-2 border-dashed rounded-xl text-center">
            🎙️ Recording feature coming soon...
          </div>
        </>
      )}

      {/* Output section */}
      {summary && (
        <div className="mt-8 p-6 bg-white border rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-2">Summary</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
        </div>
      )}
    </div>
  );
}
