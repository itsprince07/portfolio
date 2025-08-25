import { useEffect, useState } from "react";
import { Monitor, Folder, Trash2, HardDrive, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ThreeBackground from "../components/ThreeBackground";
import WindowChrome from "../components/WindowChrome";

function DesktopIcon({ label, icon, onOpen }) {
  return (
    <div
      className="flex flex-col items-center w-20 cursor-pointer select-none group active:scale-95 transition"
      onDoubleClick={onOpen} // desktop double-click
      onClick={onOpen} // mobile single-tap
    >
      <div className="w-16 h-16 flex items-center justify-center bg-transparent group-hover:bg-white/20 rounded-lg transition">
        {icon}
      </div>
      <span className="mt-1 text-white text-xs text-center group-hover:bg-blue-600/80 group-hover:px-1 group-hover:rounded">
        {label}
      </span>
    </div>
  );
}

export default function Home() {
  const [showHint, setShowHint] = useState(true);
  const [startOpen, setStartOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Moving background */}
      <ThreeBackground />

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 h-12 px-3 md:px-4 flex items-center justify-between bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
        <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm md:text-base">
          <Monitor className="w-4 h-4 md:w-5 md:h-5" />
          <span className="font-semibold tracking-wide truncate">
            Prince — Desktop
          </span>
        </div>
        <div className="text-white/70 text-[10px] sm:text-xs md:text-sm">
          {new Intl.DateTimeFormat(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
          }).format(new Date())}
        </div>
      </div>

      {/* Desktop icons */}
      <div className="absolute inset-0 pt-16 p-3 sm:p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 content-start">
        <DesktopIcon
          label="Portfolio"
          onOpen={() => navigate("/portfolio")}
          icon={<Folder className="w-12 h-12 text-yellow-400 drop-shadow" />}
        />
        <DesktopIcon
          label="My Computer"
          onOpen={() => alert("Opening This PC...")}
          icon={<HardDrive className="w-12 h-12 text-gray-200 drop-shadow" />}
        />
        <DesktopIcon
          label="Documents"
          onOpen={() => alert("Opening Documents...")}
          icon={<FileText className="w-12 h-12 text-blue-300 drop-shadow" />}
        />
        <DesktopIcon
          label="Recycle Bin"
          onOpen={() => alert("Recycle Bin is empty.")}
          icon={<Trash2 className="w-12 h-12 text-green-400 drop-shadow" />}
        />
      </div>

      {/* Welcome popup */}
      {showHint && (
        <div className="absolute bottom-20 left-3 sm:left-6 max-w-[90%] sm:max-w-xs animate-fadeIn">
          <WindowChrome title="Tip" onClose={() => setShowHint(false)}>
            <p className="text-white/80 text-xs sm:text-sm">
              Double-click (or tap) the{" "}
              <span className="font-semibold">Portfolio</span> folder to open
              Prince’s 3D portfolio.
            </p>
          </WindowChrome>
        </div>
      )}

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-12 md:h-14 backdrop-blur bg-black/50 border-t border-white/20 flex items-center justify-center gap-4 sm:gap-6 shadow-2xl px-2 sm:px-4">
        {/* Start Button */}
        <button
          onClick={() => setStartOpen(!startOpen)}
          className="px-2 sm:px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center gap-1 sm:gap-2 shadow-md active:scale-95 transition"
        >
          <Monitor className="w-4 h-4 sm:w-5 sm:h-5" /> Start
        </button>

        {/* Centered taskbar icons */}
        <div className="flex gap-4 sm:gap-6">
          <Folder className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 hover:scale-110 transition" />
          <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-300 hover:scale-110 transition" />
          <HardDrive className="w-5 h-5 sm:w-6 sm:h-6 text-gray-200 hover:scale-110 transition" />
        </div>

        <div className="ml-auto text-white/80 text-[10px] sm:text-xs md:text-sm pr-2 sm:pr-4 truncate">
          Windows-Theme • Three.js
        </div>
      </div>

      {/* Start Menu Popup */}
      {startOpen && (
        <div className="absolute bottom-12 md:bottom-14 left-2 sm:left-4 w-56 sm:w-64 p-3 sm:p-4 bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl animate-fadeIn">
          <h2 className="text-white font-semibold mb-2 text-sm sm:text-base">
            Start Menu
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm text-white/90">
            <button
              className="bg-white/10 hover:bg-white/20 p-2 rounded-lg text-left active:scale-95 transition"
              onClick={() => navigate("/portfolio")}
            >
              📂 Portfolio
            </button>
            <button className="bg-white/10 hover:bg-white/20 p-2 rounded-lg text-left active:scale-95 transition">
              ⚙️ Settings
            </button>
            <button className="bg-white/10 hover:bg-white/20 p-2 rounded-lg text-left active:scale-95 transition">
              🖥️ This PC
            </button>
            <button className="bg-white/10 hover:bg-white/20 p-2 rounded-lg text-left active:scale-95 transition">
              🗑️ Recycle Bin
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
