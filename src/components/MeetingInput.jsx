import { useState } from "react";
import SummaryOutput from "./SummaryOutput";

export default function MeetingInput() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [tasks, setTasks] = useState([]);
  const [audioFile, setAudioFile] = useState(null);

  const handleSummarize = () => {
    if (!text.trim() && !audioFile) {
      setSummary("⚠️ Please enter text or upload an audio file first.");
      setTasks([]);
      return;
    }

    // Placeholder AI summary & tasks (later connect to backend)
    setSummary("✨ This is the summary of your meeting...");
    setTasks([
      { id: 1, text: "Send project proposal", date: "2025-08-25", selected: false },
      { id: 2, text: "Prepare client presentation", date: "2025-08-28", selected: false },
      { id: 3, text: "Final deadline for deliverables", date: "2025-09-05", selected: false },
    ]);
  };

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
        <h2 className="text-2xl font-semibold mb-2">Meeting Summarizer</h2>

        {/* Transcript input */}
        <textarea
          className="w-full h-40 p-3 border-2 border-gray-300 rounded-xl shadow-sm
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition
                     resize-none overflow-y-auto"
          placeholder="Paste or type meeting transcript here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Audio upload */}
        <div>
          <label className="block mb-1 font-medium">Or upload a past meeting recording:</label>
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
            disabled={!text.trim() && !audioFile}
            className={`px-4 py-2 rounded-xl shadow text-white transition
                        ${!text.trim() && !audioFile ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            Summarize
          </button>

          <button
            disabled
            className="px-4 py-2 bg-gray-300 text-gray-600 rounded-xl shadow cursor-not-allowed"
          >
            Live Meeting (coming soon)
          </button>
        </div>
      </div>

      {/* Output */}
      <SummaryOutput summary={summary} tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
