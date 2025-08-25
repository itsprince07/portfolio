import { motion, useMotionValue } from "framer-motion";
import { useState } from "react";

const PROJECTS = [
  {
    title: "ArenaWar.in",
    desc: "An eSports Tournament Platform with hosting, memberships & automated rewards.",
    link: "https://arenawar.in",
  },
  {
    title: "SocialStore.live",
    desc: "A Social Media Marketing (SMM) Panel offering automated API services & secure payments.",
    link: "https://socialstore.live",
  },
  {
    title: "PBH STORE",
    desc: "Windows/Linux software solutions. Example: PBH LIVE – FFmpeg-based live streaming software optimized for low CPU usage.",
    link: "#",
  },
];

// Particle component
function Particle({ top, left }) {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={{
        x: Math.random() * 40 - 20,
        y: Math.random() * -30 - 10,
        opacity: 0,
        scale: 0.5,
      }}
      transition={{ duration: 0.6 }}
      className="absolute w-1 h-1 bg-white rounded-full pointer-events-none"
      style={{ top, left }}
    />
  );
}

export default function Projects() {
  // Fixed random stars & clouds for realistic effect
  const [stars] = useState(
    [...Array(50)].map(() => ({
      top: Math.random() * 100 + "%",
      left: Math.random() * 100 + "%",
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
    }))
  );

  const [clouds] = useState(
    [...Array(3)].map((_, i) => ({
      top: 20 + i * 15 + "%",
      left: i * 20 + "%",
      width: 200 + i * 60,
      height: 120 + i * 40,
      duration: 25 + i * 10,
      direction: i % 2 === 0 ? 1 : -1,
    }))
  );

  const [particles, setParticles] = useState({});
  const [trail, setTrail] = useState({});

  const spawnParticles = (cardId, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newParticles = [...Array(6)].map(() => ({
      id: Math.random(),
      top: e.clientY - rect.top + "px",
      left: e.clientX - rect.left + "px",
    }));
    setParticles((prev) => ({
      ...prev,
      [cardId]: [...(prev[cardId] || []), ...newParticles],
    }));
    setTimeout(() => {
      setParticles((prev) => ({
        ...prev,
        [cardId]: (prev[cardId] || []).slice(newParticles.length),
      }));
    }, 700);
  };

  const handleMouseMove = (cardId, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTrail((prev) => ({
      ...prev,
      [cardId]: { x: e.clientX - rect.left, y: e.clientY - rect.top },
    }));
  };

  return (
    <section
      id="projects"
      className="relative min-h-[100vh] px-6 py-24 bg-gradient-to-b from-sky-300 via-sky-200 to-sky-400 overflow-hidden"
    >
      {/* Dynamic stars */}
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full opacity-20"
          style={{
            width: `${s.size}px`,
            height: `${s.size}px`,
            top: s.top,
            left: s.left,
            animation: `twinkle ${s.duration}s infinite alternate`,
          }}
        />
      ))}

      {/* Dynamic clouds */}
      {clouds.map((c, i) => (
        <motion.div
          key={i}
          animate={{ x: [0, c.direction * 60, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: c.duration, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bg-white/70 blur-3xl rounded-[60%] opacity-70"
          style={{
            top: c.top,
            left: c.left,
            width: `${c.width}px`,
            height: `${c.height}px`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-sky-900 text-4xl md:text-6xl font-extrabold mb-16 text-center drop-shadow-lg">
          My <span className="text-sky-700">Projects</span>
        </h2>

        {/* Project Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {PROJECTS.map((p, i) => {
            const rotateX = useMotionValue(0);
            const rotateY = useMotionValue(0);

            const handleCardMouse = (e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left - rect.width / 2;
              const y = e.clientY - rect.top - rect.height / 2;
              rotateX.set(-y / 20);
              rotateY.set(x / 20);
            };

            const resetRotate = () => {
              rotateX.set(0);
              rotateY.set(0);
            };

            return (
              <motion.a
                href={p.link}
                key={p.title}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                style={{ rotateX, rotateY, transformPerspective: 800 }}
                className="group relative rounded-3xl border border-white/30 bg-white/20 
                           backdrop-blur-xl p-8 text-sky-900 shadow-2xl overflow-hidden cursor-pointer"
                onMouseEnter={(e) => spawnParticles(i, e)}
                onMouseMove={(e) => {
                  handleCardMouse(e);
                  handleMouseMove(i, e);
                }}
                onMouseLeave={resetRotate}
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <h3 className="text-2xl font-semibold drop-shadow-lg">{p.title}</h3>
                  <p className="text-sky-800/90 text-sm mt-3 leading-relaxed">{p.desc}</p>

                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="mt-6 inline-block px-5 py-2 rounded-xl 
                               bg-sky-600/80 text-white font-medium shadow-md border border-sky-700/50"
                  >
                    View Project
                  </motion.div>

                  {(particles[i] || []).map((pt) => (
                    <Particle key={pt.id} top={pt.top} left={pt.left} />
                  ))}

                  {trail[i] && <Particle top={trail[i].y + "px"} left={trail[i].x + "px"} />}
                </motion.div>
              </motion.a>
            );
          })}
        </div>

        {/* Business & Entrepreneurship Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 text-center max-w-3xl mx-auto bg-white/30 backdrop-blur-md rounded-3xl p-8 shadow-xl"
        >
          <h3 className="text-2xl font-bold text-sky-900 mb-4">📈 Business & Entrepreneurship</h3>
          <p className="text-sky-900/90 leading-relaxed">
            Founded and scaled multiple online platforms with strong focus on automation tools, SaaS businesses, and subscription models.
            I combine <span className="font-semibold text-sky-700">technical development</span> with <span className="font-semibold text-sky-700">business growth strategies</span> to deliver impactful solutions.
          </p>
        </motion.div>

        {/* Portfolio Links */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <a href="https://arenawar.in" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-xl bg-sky-700 text-white shadow-lg hover:scale-105 transition">🌐 eSports Platform</a>
          <a href="https://socialstore.live" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-xl bg-sky-700 text-white shadow-lg hover:scale-105 transition">🌐 SMM Panel</a>
          <a href="#" className="px-6 py-3 rounded-xl bg-sky-700 text-white shadow-lg hover:scale-105 transition">🖥️ PBH STORE</a>
        </motion.div>
      </div>

      {/* Bottom Hills */}
      <motion.div
        className="absolute bottom-0 left-0 w-full z-0"
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          className="w-full h-40 md:h-56"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#34d399"
            d="M0,192L48,176C96,160,192,128,288,128C384,128,480,160,576,192C672,224,768,256,864,245.3C960,235,1056,181,1152,170.7C1248,160,1344,192,1392,208L1440,224L1440,320L0,320Z"
          />
        </svg>
      </motion.div>

      <style>{`
        @keyframes twinkle {
          0% {opacity: 0.3;}
          50% {opacity: 1;}
          100% {opacity: 0.3;}
        }
      `}</style>
    </section>
  );
}
