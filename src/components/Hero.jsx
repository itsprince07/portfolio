import { motion, useReducedMotion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } },
};

// Reusable Bird
function Bird({
  src = "/bird.gif",
  top = "20%",
  width = "80px",
  from = "-15%",
  to = "115%",
  duration = 18,
  delay = 0,
  reverse = false,
  opacity = "opacity-70",
}) {
  const prefersReducedMotion = useReducedMotion();
  const xPath = reverse ? [to, from] : [from, to];

  return (
    <motion.img
      aria-hidden
      src={src}
      className={`absolute pointer-events-none ${opacity}`}
      style={{ top, width }}
      initial={{ x: xPath[0], y: 0 }}
      animate={
        prefersReducedMotion
          ? { x: xPath[1] }
          : { x: xPath, y: [0, -20, 0] }
      }
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

export default function Hero() {
  const title = "Hi, I’m Prince".split("");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center text-gray-900 px-4 sm:px-6 lg:px-12 overflow-hidden bg-gradient-to-b from-sky-100 via-white to-sky-200">
      {/* Floating Clouds */}
      <motion.div
        animate={{ x: [0, 80, 0] }}
        transition={{ duration: 30, repeat: Infinity }}
        className="absolute top-10 left-4 sm:top-16 sm:left-10 w-32 sm:w-52 h-20 sm:h-28 bg-white/70 rounded-full blur-2xl"
      />
      <motion.div
        animate={{ x: [0, -90, 0] }}
        transition={{ duration: 35, repeat: Infinity }}
        className="absolute top-20 right-4 sm:top-32 sm:right-10 w-40 sm:w-72 h-24 sm:h-36 bg-white/60 rounded-full blur-2xl"
      />

      {/* Birds */}
      <div className="absolute inset-0 z-0">
        <Bird top="10%" width="60px" from="-12%" to="112%" duration={20} opacity="opacity-80" />
        <Bird top="28%" width="50px" from="110%" to="-10%" duration={25} delay={2} reverse opacity="opacity-60" />
      </div>

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="z-10 px-2 sm:px-6"
      >
        {/* Badge */}
        <motion.span
          variants={item}
          className="inline-block mb-4 sm:mb-6 px-4 sm:px-5 py-1 rounded-full border border-gray-300 bg-white/70 backdrop-blur-md text-xs sm:text-sm text-gray-600 shadow"
        >
          🌍 Developer & Entrepreneur
        </motion.span>

        {/* Animated Title */}
        <motion.h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-sm leading-tight flex flex-wrap justify-center">
          {title.map((char, i) => (
            <motion.span
              key={i}
              variants={item}
              className="inline-block mx-0.5"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={item}
          className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl max-w-xl sm:max-w-2xl text-gray-700 mx-auto leading-relaxed px-2"
        >
          I craft{" "}
          <span className="text-blue-500 font-semibold">interactive</span> and{" "}
          <span className="text-pink-500 font-semibold">aesthetic</span>{" "}
          websites with modern tools like{" "}
          <span className="text-violet-500 font-semibold">React</span>,{" "}
          <span className="text-teal-500 font-semibold">Tailwind</span>, &{" "}
          <span className="text-amber-500 font-semibold">Three.js</span>.  
          My goal is to blend{" "}
          <span className="font-semibold">performance</span> with{" "}
          <span className="font-semibold">creativity</span> ✨.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={item}
          className="mt-6 sm:mt-10 flex gap-4 sm:gap-6 justify-center flex-wrap"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-2 sm:py-3 rounded-xl bg-blue-500 text-white text-sm sm:text-base font-semibold shadow-lg hover:bg-blue-600 transition-all"
          >
            🚀 View Projects
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-2 sm:py-3 rounded-xl bg-gray-200 text-gray-800 text-sm sm:text-base font-semibold shadow-lg hover:bg-gray-300 transition-all"
          >
            📩 Contact
          </motion.a>
        </motion.div>

        {/* Extra Skill Highlights */}
        <motion.div
          variants={item}
          className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-sm sm:max-w-3xl mx-auto"
        >
          {[
            { text: "⚡ Fast & Optimized" },
            { text: "🎨 Modern UI/UX" },
            { text: "🛠 Full-Stack Ready" },
          ].map((skill, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-white/70 shadow backdrop-blur-md text-gray-700 text-sm sm:text-base font-medium"
            >
              {skill.text}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Layered Parallax Hills */}
      <div className="absolute bottom-0 left-0 w-full z-0">
        <svg
          className="w-full h-28 sm:h-40 md:h-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#6EE7B7"
            d="M0,192L48,176C96,160,192,128,288,128C384,128,480,160,576,192C672,224,768,256,864,245.3C960,235,1056,181,1152,170.7C1248,160,1344,192,1392,208L1440,224L1440,320L0,320Z"
          />
          <path
            fill="#34D399"
            fillOpacity="0.6"
            d="M0,224L60,208C120,192,240,160,360,165.3C480,171,600,213,720,213.3C840,213,960,171,1080,165.3C1200,160,1320,192,1380,208L1440,224L1440,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  );
}
