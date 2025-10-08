import { useState } from "react";
import Globe from "./components/Globe";
import "./App.css";

function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-500 mb-4">
        F1 Track Visualizer
      </h1>

    <div className="w-screen h-screen flex items-center justify-center bg-gray-900">
      {/* Globe */}
      <Globe onSelect={setSelected} />

      {/* Info card */}
      {selected && (
        <div className="bg-gray-800 p-4 rounded-lg w-80 text-center">
          <h2 className="text-xl font-semibold">{selected.circuit_name}</h2>
          <p>{selected.country_name}</p>
          <p>Next race: {selected.next_race}</p>
          <button className="mt-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
            Details
          </button>
        </div>
      )}
    </div>
  </div>
  );
}

export default App;