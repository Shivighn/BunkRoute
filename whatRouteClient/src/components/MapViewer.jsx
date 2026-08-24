import { useState } from "react";

const MapViewer = () => {
  const [showSatellite, setShowSatellite] = useState(true);

  return (
    <div className="w-full max-w-5xl mx-auto bg-white/5 border border-white/10 backdrop-blur-md shadow-inner rounded-2xl p-6 text-white mt-4">
      <div className="flex justify-center mb-6 md:hidden bg-white/5 rounded-full p-1">
        <button
          onClick={() => setShowSatellite(true)}
          className={`w-full px-5 py-2 text-sm font-medium rounded-full transition-all ${
            showSatellite
              ? "bg-white/10 text-white"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          Satellite
        </button>
        <button
          onClick={() => setShowSatellite(false)}
          className={`w-full px-5 py-2 text-base font-sans rounded-full transition-all ${
            !showSatellite
              ? "bg-white/10 text-white"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          Outline
        </button>
      </div>


      <div className="flex flex-col md:flex-row gap-6 justify-center items-center w-full">
        <div
          className={`w-full md:w-1/2 ${
            showSatellite ? "block" : "hidden"
          } md:block`}
        >
          <img
            src="/maps/satMap.jpg"
            alt="Satellite"
            className="w-full h-auto max-w-full rounded-xl shadow-md border border-white/10 object-contain"
            loading="lazy"
          />
        </div>

        <div
          className={`w-full md:w-1/2 ${
            !showSatellite ? "block" : "hidden"
          } md:block`}
        >
          <img
            src="/maps/outlineMap.png"
            alt="Outline"
            className="w-full h-auto max-w-full rounded-xl shadow-md border border-white/10 object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default MapViewer;
