import MeetingInput from "./components/MeetingInput";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <header className="p-4 bg-blue-600 text-white text-center text-3xl font-bold">
        Meeting Summarizer
      </header>
      <main className="p-6">
        <MeetingInput />
      </main>
    </div>
  );
}

export default App;
