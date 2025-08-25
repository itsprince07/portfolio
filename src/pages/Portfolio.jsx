import ThreeBackground from "../components/ThreeBackground.jsx";
import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import Skills from "../components/Skills.jsx";
import Projects from "../components/Projects.jsx";
import Contact from "../components/Contact.jsx";


export default function Portfolio() {
return (
<div className="relative w-screen h-screen overflow-y-auto bg-black">
<ThreeBackground />
<div className="relative z-10">
<Hero />
<About />
<Skills />
<Projects />
<Contact />
</div>
</div>
);
}