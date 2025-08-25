import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";

function Particles({ count = 1200 }) {
  const mesh = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 40 * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.15;
    mesh.current.rotation.y = clock.getElapsedTime() * 0.06;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} sizeAttenuation color="#00aaff" depthWrite={false} />
    </points>
  );
}

function NeonGrid() {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.z = (clock.getElapsedTime() * 0.15) % 10;
  });
  return (
    <Float speed={0.5} rotationIntensity={0} floatIntensity={0.3}>
      <mesh ref={ref} rotation-x={-Math.PI / 2} position={[0, -6, 0]}>
        <planeGeometry args={[300, 300, 160, 160]} />
        <meshBasicMaterial wireframe color="#00ffff" transparent opacity={0.15} />
      </mesh>
    </Float>
  );
}

export default function ThreeBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleClick = () => {
    alert("✨ Background clicked! You can link this to projects or any action.");
  };

  return (
    <div className="absolute inset-0 -z-10" onClick={handleClick}>
      {/* Wallpaper background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/windows-bg.jpg')`,
          filter: isMobile ? "brightness(0.7)" : "brightness(0.6) blur(2px)",
        }}
      />

      {/* 3D Layer */}
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.8} />
        <Particles count={isMobile ? 400 : 1200} />
        <NeonGrid />
        <Stars
          radius={isMobile ? 80 : 120}
          depth={20}
          count={isMobile ? 800 : 2000}
          factor={isMobile ? 2 : 4}
          fade
          speed={0.5}
        />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.35}
          enableRotate
        />
      </Canvas>
    </div>
  );
}
