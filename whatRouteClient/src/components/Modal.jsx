import { useState } from "react";

const Modal = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const a = e.target.source.value;
    const b = e.target.destination.value;

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/shortd/${a}/${b}`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-2 bg-white/5 border border-white/10 backdrop-blur-md shadow-inner rounded-2xl p-8 text-white">
      <h2 className="text-base font-sans mb-3">Enter Start and Destination</h2>

      <form
        onSubmit={onSubmitHandler}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      >
        <div className="flex flex-col bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg mt-1 font-sans transition border border-white/10 backdrop-blur disabled:opacity-50">
          <label htmlFor="source" className="text-sm mb-1 text-neutral-400">From</label>
          <input
            id="source"
            name="source"
            min="1"
            max="64"
            required
            placeholder="Start Node"
            className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg mt-1 font-sans transition border border-white/10 backdrop-blur disabled:opacity-50">
          <label htmlFor="destination" className="text-sm mb-1 text-neutral-400">To</label>
          <input
            id="destination"
            name="destination"
            min="1"
            max="64"
            required
            placeholder="End Node"
            className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg mt-1 font-medium transition border border-white/10 backdrop-blur disabled:opacity-50"
        >
          {loading ? "Finding..." : "Find Path"}
        </button>
      </form>

      {data && (
        <div className="text-center space-y-4">
          <div className="flex flex-wrap justify-center gap-2">
            {data.path.map((node, index) => (
              <span key={index}>
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
    </div>
  );
};

export default Modal;
