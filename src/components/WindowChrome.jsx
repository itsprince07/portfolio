import { Minus, Square, X } from "lucide-react";
import { useState } from "react";

export default function WindowChrome({ title = "Window", onClose, children }) {
  const [max, setMax] = useState(false);

  return (
    <div
      className={`rounded-2xl overflow-hidden border border-white/10 bg-white/10 backdrop-blur shadow-2xl
        w-full max-w-sm sm:max-w-md md:${max ? "max-w-lg" : "max-w-md"}`}
    >
      {/* Top bar */}
      <div className="h-10 bg-white/10 flex items-center px-3">
        <span className="text-white/90 text-sm font-semibold truncate">
          {title}
        </span>
        <div className="ml-auto flex items-center space-x-1">
          <button className="p-2 hover:bg-white/10 rounded-lg active:scale-95 transition">
            <Minus className="w-4 h-4 text-white/80" />
          </button>
          <button
            onClick={() => setMax(!max)}
            className="p-2 hover:bg-white/10 rounded-lg active:scale-95 transition"
          >
            <Square className="w-4 h-4 text-white/80" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg active:scale-95 transition"
          >
            <X className="w-4 h-4 text-white/80" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 bg-black/30 text-white text-sm sm:text-base">
        {children}
      </div>
    </div>
  );
}
