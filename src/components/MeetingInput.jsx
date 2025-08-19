import { useState } from "react";
import SummaryOutput from "./SummaryOutput";

export default function MeetingInput() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [tasks, setTasks] = useState([]);
  const [audioFile, setAudioFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle summarization using backend + AI
  const handleSummarize = async () => {
    if (!text.trim() && !audioFile) return;

    setLoading(true);
    setSummary("");
    setTasks([]);

    try {
      const response = await fetch("http://localhost:5000/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: text })
      });

      const data = await response.json();
      //test:
      console.log("AI response:", data);
      setSummary(data.summary);

      // Example: parse tasks from AI output if available
      setTasks([
        { id: 1, text: "Example task from AI", date: "2025-08-30", selected: false },
        { id: 2, text: "Follow up with client", date: "2025-09-01", selected: false },
      ]);

    } catch (error) {
      console.error(error);
      alert("Failed to generate summary. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Transcript & Audio Input */}
      <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
        <textarea
          className="w-full h-40 max-h-40 p-3 border-2 border-gray-300 rounded-xl shadow-sm
                     focus:border-slate-600 focus:ring-2 focus:ring-slate-400 transition
                     resize-none overflow-y-auto text-slate-800"
          placeholder="Paste or type meeting transcript here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Or upload a past meeting recording:
          </label>
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="border rounded-md p-1"
          />
          {audioFile && <p className="text-gray-700 mt-1">Selected file: {audioFile.name}</p>}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleSummarize}
            disabled={!text.trim() && !audioFile || loading}
            className={`px-4 py-2 rounded-xl shadow text-white transition
                        ${!text.trim() && !audioFile || loading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-slate-700 hover:bg-slate-900"}`}
          >
            {loading ? "Processing..." : "Summarize"}
          </button>

          <button
            disabled
            className="px-4 py-2 bg-gray-300 text-gray-600 rounded-xl shadow cursor-not-allowed"
          >
            Live Meeting (coming soon)
          </button>
        </div>
      </div>

      {/* Summary & Tasks Output */}
      <SummaryOutput summary={summary} tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
