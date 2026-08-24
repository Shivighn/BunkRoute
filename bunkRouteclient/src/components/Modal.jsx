import { useState } from "react";

const initialStops = ["", ""];

const Modal = () => {
  const [stops, setStops] = useState(initialStops);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateStop = (index, value) => {
    const nextStops = [...stops];
    nextStops[index] = value;
    setStops(nextStops);
  };

  const addStop = (index) => {
    const nextStops = [...stops];
    nextStops.splice(index + 1, 0, "");
    setStops(nextStops);
  };

  const removeStop = (index) => {
    if (stops.length <= 2) return;
    const nextStops = stops.filter((_, i) => i !== index);
    setStops(nextStops);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const cleanedStops = stops
      .map((value) => value.trim())
      .filter((value) => value !== "");

    if (cleanedStops.length < 2) {
      setData({ error: "Please enter a start node and an end node." });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stops: cleanedStops }),
      });

      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error:", error);
      setData({ error: "Could not compute route." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-2 bg-white/5 border border-white/10 backdrop-blur-md shadow-inner rounded-2xl p-8 text-white">
      <h2 className="text-base font-sans mb-3">Enter route stops</h2>

      <form onSubmit={onSubmitHandler} className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stops.map((stop, index) => (
            <div
              key={index}
              className="flex items-end gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg mt-1 font-sans transition border border-white/10 backdrop-blur disabled:opacity-50"
            >
              <div className="flex-1 flex flex-col">
                <label htmlFor={`stop-${index}`} className="text-sm mb-1 text-neutral-400">
                  {index === 0 ? "From" : index === stops.length - 1 ? "To" : `Stop ${index}`}
                </label>
                <input
                  id={`stop-${index}`}
                  name={`stop-${index}`}
                  min="1"
                  max="64"
                  value={stop}
                  onChange={(e) => updateStop(index, e.target.value)}
                  placeholder={index === 0 ? "Start Node" : index === stops.length - 1 ? "End Node" : `Stop ${index}`}
                  className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => addStop(index)}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-lg leading-none"
                  title="Add stop"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => removeStop(index)}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-lg leading-none"
                  title="Remove stop"
                >
                  −
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg mt-1 font-medium transition border border-white/10 backdrop-blur disabled:opacity-50"
        >
          {loading ? "Finding..." : "Find Path"}
        </button>
      </form>

      {data && !data.error && (
        <div className="text-center space-y-4">
          <div className="flex flex-wrap justify-center gap-2">
            {data.path.map((node, index) => (
              <span key={`${node}-${index}`}>
                <span className="bg-white/10 px-4 py-1 rounded-full text-sm font-mono border border-white/10">
                  {node}
                </span>
                {index < data.path.length - 1 && <span className="text-white/30">→</span>}
              </span>
            ))}
          </div>
          <p className="text-sm text-neutral-400">
            <span className="font-medium text-white">{`Total Distance: ${data.totalDis}m`}</span>
          </p>
        </div>
      )}

      {data && data.error && (
        <p className="text-sm text-red-300">{data.error}</p>
      )}
    </div>
  );
};

export default Modal;
