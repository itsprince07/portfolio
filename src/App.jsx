import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Portfolio from "./pages/Portfolio.jsx";


export default function App() {
return (
<Routes>
<Route path="/" element={<Home />} />
<Route path="/portfolio" element={<Portfolio />} />
<Route path="*" element={<Navigate to="/" replace />} />
</Routes>
);
}