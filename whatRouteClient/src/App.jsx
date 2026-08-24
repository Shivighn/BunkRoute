import MapViewer from "./components/MapViewer";
import Modal from "./components/Modal";

function App() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black to-[#0f0f0f] text-white font-sans px-4 pt-16 space-y-16">
      <div className="flex flex-col items-center text-center space-y-4">
        <h1 className="flex flex-col text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#ffffffcc] via-[#d4d4d4] to-[#888888] drop-shadow-sm">
          WhatRoute?
        </h1>
        <p className="text-base md:text-lg text-neutral-500 max-w-2xl">
          Find the shortest path between places in Indian Institute of Technology (IIT), Guwahati campus.
        </p>
      </div>
      <MapViewer />
      <Modal />
    </div>
  );
}

export default App;
