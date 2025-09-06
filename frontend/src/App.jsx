import MeetingInput from "./components/MeetingInput";

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="p-4 bg-slate-800 text-white text-center text-3xl font-bold">
        Meeting Summarizer
      </header>
      <main className="p-6">
        <MeetingInput />
      </main>
    </div>
  );
}

export default App;
