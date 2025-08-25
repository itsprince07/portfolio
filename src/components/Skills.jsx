import { motion } from "framer-motion";

const SKILLS = [
  {
    cat: "Frontend",
    color: "from-sky-200 to-sky-400",
    items: ["React", "Vite", "TailwindCSS", "TypeScript", "Framer Motion", "HTML5", "CSS3", "JavaScript"],
  },
  {
    cat: "Backend",
    color: "from-emerald-200 to-emerald-400",
    items: ["Node.js", "Express", "MongoDB", "REST APIs", "JWT Auth", "PHP (Websites, APIs, SMM Panels)", "Python (Web Apps, Automation, Software Development)"],
  },
  {
    cat: "Programming & Development",
    color: "from-violet-200 to-violet-400",
    items: ["Linux System & Server Management", "Windows & Linux App Development", "FFmpeg Integration (Streaming Apps)", "MySQL", "SQLite"],
  },
  {
    cat: "Software & Tools",
    color: "from-rose-200 to-rose-400",
    items: ["Three.js / R3F", "WebGL", "GLSL", "Shaders", "Canvas API", "Git", "GitHub", "VS Code", "Vercel", "Figma", "Postman", "Docker"],
  },
  {
    cat: "Specialized Expertise",
    color: "from-amber-200 to-amber-400",
    items: ["SMM Panel Development (Automation)", "Payment Gateway Integration", "Live Streaming & Automation Tools", "Business Process Automation"],
  },
  {
    cat: "Business & Strategy",
    color: "from-cyan-200 to-cyan-400",
    items: ["Website Hosting & Management", "SaaS & Subscription Models", "Problem-Solving & Optimization"],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative min-h-[100vh] px-6 py-24 bg-gradient-to-b from-sky-200 via-sky-300 to-sky-400 overflow-hidden"
    >
      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-40"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Floating Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ x: [0, (i + 1) * 50, 0] }}
            transition={{ duration: 25 + i * 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bg-white/70 blur-3xl rounded-[60%] opacity-70"
            style={{
              top: `${20 + i * 15}%`,
              left: `${i * 20}%`,
              width: `${200 + i * 60}px`,
              height: `${120 + i * 40}px`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-sky-900 text-4xl md:text-6xl font-extrabold mb-16 text-center drop-shadow-lg">
          My <span className="text-sky-700">Skills</span>
        </h2>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-2 gap-12">
          {SKILLS.map((block, i) => (
            <motion.div
              key={block.cat}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, type: "spring", stiffness: 120 }}
              className={`p-6 rounded-3xl bg-gradient-to-br ${block.color} border border-white/30 backdrop-blur-xl shadow-2xl hover:scale-105 transition-transform duration-300 relative overflow-hidden`}
            >
              <h3 className="text-2xl font-semibold text-sky-900 mb-6 drop-shadow">
                {block.cat}
              </h3>
              <div className="flex flex-wrap gap-3 relative">
                {block.items.map((s) => (
                  <motion.div
                    key={s}
                    whileHover={{ scale: 1.1 }}
                    onHoverStart={(e) => {
                      const parent = e.target.closest("div.relative");
                      const particle = document.createElement("div");
                      particle.className =
                        "absolute w-1 h-1 bg-white rounded-full animate-ping";
                      particle.style.top = `${Math.random() * 100}%`;
                      particle.style.left = `${Math.random() * 100}%`;
                      parent.appendChild(particle);
                      setTimeout(() => parent.removeChild(particle), 500);
                    }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="px-5 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white/40 shadow-md text-sky-900 font-medium text-sm cursor-pointer hover:bg-white hover:shadow-lg relative z-10"
                  >
                    {s}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Hills */}
      <motion.div
        className="absolute bottom-0 left-0 w-full z-0"
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          className="w-full h-52 md:h-64"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#6EE7B7"
            d="M0,192L48,176C96,160,192,128,288,128C384,128,480,160,576,192C672,224,768,256,864,245.3C960,235,1056,181,1152,170.7C1248,160,1344,192,1392,208L1440,224L1440,320L0,320Z"
          />
        </svg>
      </motion.div>

      <style>
        {`
        @keyframes twinkle {
          0% {opacity: 0.3;}
          50% {opacity: 1;}
          100% {opacity: 0.3;}
        }
        `}
      </style>
    </section>
  );
}
