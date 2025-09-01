export default function SummaryOutput({ summary, tasks = [], setTasks }) {
  // Toggle task selection
  const handleTaskToggle = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, selected: !task.selected } : task
      )
    );
  };

  const handleSaveToCalendar = () => {
    const selectedTasks = tasks.filter((task) => task.selected);
    if (selectedTasks.length === 0) {
      alert("Select at least one task to save to calendar.");
      return;
    }
    // Placeholder: replace with backend/API integration
    alert("Tasks to save:\n" + selectedTasks.map(t => `${t.text} (${t.date})`).join("\n"));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
      {/* Summary */}
      {summary && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Meeting Summary</h3>
          <div className="p-4 bg-gray-100 rounded-md whitespace-pre-wrap max-h-60 overflow-y-auto">
            {summary}
          </div>
        </div>
      )}

      {/* Tasks */}
      {tasks.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Tasks & Key Dates</h3>
          <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md p-2">
            {tasks.map((task) => (
              <label
                key={task.id}
                className="flex items-center justify-between bg-gray-50 p-2 mb-2 rounded hover:bg-gray-100"
              >
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.selected}
                    onChange={() => handleTaskToggle(task.id)}
                    className="accent-slate-700"
                  />
                  <span>{task.text}</span>
                </span>
                <span className="text-gray-500 text-sm">{task.date}</span>
              </label>
            ))}
          </div>
          <button
            onClick={handleSaveToCalendar}
            className="mt-3 px-4 py-2 bg-slate-700 text-white rounded-xl shadow hover:bg-slate-900 transition"
          >
            Save Selected to Calendar
          </button>
        </div>
      )}
    </div>
  );
}
