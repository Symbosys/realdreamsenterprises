import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SceneCanvas } from "./SceneCanvas";
import { damp } from "@/lib/three-utils";

/** Illuminated night skyline used as the closing cinematic frame. */
function Skyline() {
  const buildings = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => {
        const x = -34 + i * 2.1 + (i % 3) * 0.4;
        const h = 3 + ((i * 7919) % 13) + (Math.abs(x) < 6 ? 8 : 0);
        return { x, h, z: (i % 4) * -3.2, hero: Math.abs(x) < 3 };
      }),
    [],
  );
  return (
    <group>
      {buildings.map((b, i) => (
        <group key={i} position={[b.x, 0, b.z]}>
          <mesh position={[0, b.h / 2, 0]}>
            <boxGeometry args={[1.7, b.h, 1.7]} />
            <meshStandardMaterial color={b.hero ? "#39434d" : "#1b232b"} metalness={0.7} roughness={0.4} />
          </mesh>
          {Array.from({ length: Math.floor(b.h / 1.2) }, (_, r) => (
            <mesh key={r} position={[0, 0.8 + r * 1.2, 0.86]}>
              <planeGeometry args={[1.4, 0.3]} />
              <meshBasicMaterial
                color={b.hero ? "#ffb054" : "#8fd0f2"}
                transparent
                opacity={((i + r) % 3 === 0 ? 0.15 : 0.55) * (b.hero ? 1 : 0.7)}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function Traffic({ count = 16 }) {
  const g = useRef<THREE.Group>(null);
  const cars = useMemo(
    () => Array.from({ length: count }, (_, i) => ({ dir: i % 2 ? 1 : -1, o: (i / count) * 70, lane: i % 2 ? 1.1 : -1.1 })),
    [count],
  );
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    g.current?.children.forEach((c, i) => {
      const car = cars[i];
      const x = ((car.o + t * 7 * car.dir) % 70 + 70) % 70 - 35;
      c.position.set(x, 0.25, 4 + car.lane);
    });
  });
  return (
    <group ref={g}>
      {cars.map((c, i) => (
        <mesh key={i}>
          <boxGeometry args={[0.7, 0.16, 0.16]} />
          <meshBasicMaterial color={c.dir > 0 ? "#ffd0a0" : "#ff5c3a"} />
        </mesh>
      ))}
    </group>
  );
}

function Stars({ count = 300 }) {
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 90;
      a[i * 3 + 1] = 10 + Math.random() * 30;
      a[i * 3 + 2] = -30 - Math.random() * 30;
    }
    return a;
  }, [count]);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.12} color="#cfe6ff" transparent opacity={0.75} depthWrite={false} />
    </points>
  );
}

function FooterRig() {
  const { camera, pointer } = useThree();
  useFrame((_, dt) => {
    camera.position.x = damp(camera.position.x, pointer.x * 5, 1.2, dt);
    camera.position.y = damp(camera.position.y, 8 - pointer.y * 1.5, 1.2, dt);
    camera.lookAt(0, 6, -6);
  });
  return null;
}

export default function SkylineNightScene() {
  return (
    <SceneCanvas camera={{ position: [0, 8, 26], fov: 40 }} fog={["#080d12", 24, 80]} background="#080d12">
      <hemisphereLight args={["#5b7fa8", "#05080b", 0.4]} />
      <directionalLight position={[-14, 18, 8]} intensity={0.5} color="#6f9fd6" />
      <FooterRig />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 4]}>
        <planeGeometry args={[100, 8]} />
        <meshStandardMaterial color="#12181e" roughness={0.6} metalness={0.3} />
      </mesh>
      <Skyline />
      <Traffic />
      <Stars />
    </SceneCanvas>
  );
}
