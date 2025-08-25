// About.jsx
import React, { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

/* ✅ Puff texture for cloud */
function usePuffTexture() {
  return useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    const grd = ctx.createRadialGradient(
      size / 2,
      size / 2,
      size * 0.1,
      size / 2,
      size / 2,
      size * 0.48
    );
    grd.addColorStop(0, "rgba(255,255,255,0.95)");
    grd.addColorStop(0.4, "rgba(255,255,255,0.7)");
    grd.addColorStop(0.7, "rgba(255,255,255,0.35)");
    grd.addColorStop(1, "rgba(255,255,255,0.0)");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, size, size);

    return new THREE.CanvasTexture(canvas);
  }, []);
}

/* ✅ 3D Cloud using sprites */
function Cloud3D({ width = 360, height = 220, density = 12, baseScale = 1.0, speed = 0.12 }) {
  const mountRef = useRef(null);
  const puffTex = usePuffTexture();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setClearAlpha(0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xffffff, 0.015);

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 50);
    camera.position.set(0, 0, 8);

    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambient);
    const dir = new THREE.DirectionalLight(0xffffff, 0.35);
    dir.position.set(-1, 1, 1);
    scene.add(dir);

    const group = new THREE.Group();
    scene.add(group);

    const sprites = [];
    const material = new THREE.SpriteMaterial({
      map: puffTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.95,
    });

    const rng = (min, max) => Math.random() * (max - min) + min;

    for (let i = 0; i < density; i++) {
      const sprite = new THREE.Sprite(material.clone());
      const x = rng(-2.2, 2.2);
      const y = rng(-0.6, 0.6);
      const z = rng(-0.6, 0.6);

      const s = baseScale * (0.9 + Math.random() * 0.8);
      sprite.position.set(x, y, z);
      sprite.scale.set(2.2 * s, 2.2 * s, 1);

      sprite.material.opacity = 0.75 + Math.random() * 0.25;

      sprite.userData = {
        ox: x,
        oy: y,
        oz: z,
        baseS: 2.2 * s,
        phase: Math.random() * Math.PI * 2,
        amp: 0.06 + Math.random() * 0.08,
      };

      group.add(sprite);
      sprites.push(sprite);
    }

    let rafId;
    const start = performance.now();

    const animate = () => {
      const t = (performance.now() - start) / 1000;

      for (const s of sprites) {
        const { ox, oy, oz, phase, amp, baseS } = s.userData;
        const x = ox + Math.sin(t * speed + phase) * amp * 1.2;
        const y = oy + Math.sin(t * (speed * 1.3) + phase * 0.7) * amp;
        const z = oz + Math.cos(t * (speed * 0.9) + phase) * amp;
        s.position.set(x, y, z);

        const pulse = 1 + Math.sin(t * (speed * 2.2) + phase) * 0.04;
        s.scale.set(baseS * pulse, baseS * pulse, 1);
      }

      group.rotation.y = Math.sin(t * speed * 0.5) * 0.05;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      renderer.dispose();
      sprites.forEach((s) => s.material.dispose());
      mount.removeChild(renderer.domElement);
    };
  }, [puffTex, width, height, density, baseScale, speed]);

  return <div ref={mountRef} style={{ width, height }} />;
}

/* ✅ Unique Cloud Card */
function CloudCard({ title, desc, delay = 0, gradient }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: 5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      whileHover={{ scale: 1.05, rotate: -2 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, delay, type: "spring", stiffness: 120 }}
      className="relative mx-auto hover:shadow-2xl hover:shadow-sky-200 transition-all duration-300"
      style={{ width: 360, height: 270 }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <Cloud3D width={360} height={220} density={14} baseScale={1.05} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`backdrop-blur-sm rounded-3xl shadow-xl px-6 py-6 max-w-[80%] text-center text-white`}
          style={{
            background: gradient,
          }}
        >
          <h3 className="text-xl font-bold mb-2 drop-shadow-lg">{title}</h3>
          <p className="text-sm leading-relaxed opacity-95">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

const container = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { staggerChildren: 0.2, duration: 1 },
  },
};
const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } },
};

/* ✅ About Section */
export default function About() {
  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-gradient-to-b from-sky-100 via-white to-sky-200">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="z-10 max-w-6xl mx-auto space-y-12"
      >
        <motion.h2
          variants={item}
          className="text-4xl md:text-6xl font-extrabold tracking-wide text-sky-900"
        >
          About <span className="text-sky-600">Me</span>
        </motion.h2>

      <motion.p
  variants={item}
  className="
    w-full sm:w-11/12 lg:w-4/5 
    text-base sm:text-lg md:text-xl 
    text-gray-700 dark:text-gray-300 
    mx-auto 
    leading-relaxed sm:leading-loose 
    px-3 sm:px-6
  "
>
  I am a passionate{" "}
  <span className="font-semibold text-sky-700 dark:text-sky-400">
    Full-Stack Developer
  </span>{" "}
  &{" "}
  <span className="font-semibold text-sky-700 dark:text-sky-400">
    Software Entrepreneur
  </span>{" "}
  with hands-on experience in building scalable web applications, automation tools,
  and digital platforms. Skilled in{" "}
  <span className="font-semibold">Python, PHP, HTML, CSS, and Linux</span>, 
  I have successfully delivered projects in areas such as{" "}
  <span className="font-semibold">
    eSports platforms, SMM panels, and custom software development
  </span>.
  <br /><br />
  My goal is to create efficient, high-performance, and user-friendly solutions while combining{" "}
  <span className="font-semibold">technical development</span> with{" "}
  <span className="font-semibold">business growth strategies</span>.
</motion.p>



        {/* Cloud Cards */}
        <div className="grid md:grid-cols-3 gap-12 mt-6">
          <CloudCard
            title="Python Developer"
            desc="Deep expertise in AI, data science, machine learning, and robust backend systems with Django & Flask. Turning raw data into powerful business insights."
            delay={0.1}
            gradient="linear-gradient(135deg, #38bdf8 0%, #3b82f6 100%)"
          />
          <CloudCard
            title="PHP Developer"
            desc="Crafting secure, scalable, and performance-driven apps with Laravel & modern PHP. Specializing in enterprise solutions and API integrations."
            delay={0.3}
            gradient="linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)"
          />
          <CloudCard
            title="Our Values"
            desc="Innovation, transparency, and relentless dedication. We don’t just build projects, we build trust and long-term partnerships with our clients."
            delay={0.5}
            gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)"
          />
        </div>
      </motion.div>
    </section>
  );
}
