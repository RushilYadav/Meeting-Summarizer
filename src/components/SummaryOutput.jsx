export default function SummaryOutput({ summary, tasks, setTasks }) {
  const handleToggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, selected: !task.selected } : task
    ));
  };

  const handleTaskChange = (id, field, value) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, [field]: value } : task
    ));
  };

  const handleSaveToCalendar = () => {
    const selectedTasks = tasks.filter(task => task.selected);
    if (selectedTasks.length === 0) {
      alert("⚠️ Please select at least one task to save.");
      return;
    }
    // Placeholder — will hook up Google Calendar later
    alert("✅ Saved to Calendar:\n" + selectedTasks.map(t => `${t.text} (${t.date})`).join("\n"));
  };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="bg-gray-50 p-6 rounded-2xl shadow-inner min-h-[120px]">
        <h3 className="text-xl font-medium mb-2">Summary:</h3>
        <div className="whitespace-pre-wrap text-gray-800">
          {summary ? (
            summary
          ) : (
            <span className="text-gray-400 italic">
              No summary yet. Paste text and click "Summarize".
            </span>
          )}
        </div>
      </div>

      {/* Tasks */}
      {tasks && tasks.length > 0 && (
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-medium mb-4">Tasks & Key Dates:</h3>
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between gap-3 p-3 border rounded-xl hover:bg-gray-50"
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={task.selected}
                  onChange={() => handleToggleTask(task.id)}
                  className="h-5 w-5 accent-blue-600"
                />

                {/* Editable task text */}
                <input
                  type="text"
                  value={task.text}
                  onChange={(e) => handleTaskChange(task.id, "text", e.target.value)}
                  className="flex-1 px-2 py-1 border rounded-md text-gray-800"
                />

                {/* Editable task date */}
                <input
                  type="date"
                  value={task.date}
                  onChange={(e) => handleTaskChange(task.id, "date", e.target.value)}
                  className="px-2 py-1 border rounded-md text-gray-800"
                />
              </li>
            ))}
          </ul>

          <button
            onClick={handleSaveToCalendar}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition"
          >
            Save Selected to Calendar
          </button>
        </div>
      )}
    </div>
  );
}
