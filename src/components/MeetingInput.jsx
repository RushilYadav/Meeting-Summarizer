import { useState } from "react";

export default function MeetingInput() {
  const [text, setText] = useState("");
  
  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Enter Meeting Transcript</h2>
      
      <textarea
        className="w-full h-40 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Paste or type meeting transcript here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      
      <h3 className="mt-6 text-xl font-medium">Your Input:</h3>
      <div className="mt-2 p-4 bg-gray-100 rounded-md whitespace-pre-wrap">
        {text || <span className="text-gray-400 italic">No input yet</span>}
      </div>
    </div>
  );
}
