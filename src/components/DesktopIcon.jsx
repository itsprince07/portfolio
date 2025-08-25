import { useEffect, useState } from "react";


export default function DesktopIcon({ label, icon, onOpen }) {
const [clicks, setClicks] = useState(0);
useEffect(() => {
if (!clicks) return;
const t = setTimeout(() => setClicks(0), 350);
return () => clearTimeout(t);
}, [clicks]);


const handleClick = () => {
if (clicks === 1) {
onOpen();
setClicks(0);
} else {
setClicks(1);
}
};


return (
<div onClick={handleClick} className="w-24 text-center select-none cursor-default">
<div className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur transition transform hover:-translate-y-1">
<div className="flex justify-center mb-2 text-white">{icon}</div>
<div className="text-white text-xs font-medium truncate">{label}</div>
</div>
<div className="text-[10px] text-white/60 mt-1">Double‑click</div>
</div>
);
}