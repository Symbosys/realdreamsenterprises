import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Html } from "@react-three/drei";
import * as THREE from "three";
import { SceneCanvas } from "./SceneCanvas";
import { damp } from "@/lib/three-utils";

export type CampusZone = "office" | "warehouse" | "distribution" | "parking" | "delivery";

const ZONES: Record<CampusZone, { pos: [number, number, number]; label: string }> = {
  office: { pos: [0, 0, 0], label: "Main office" },
  warehouse: { pos: [-9, 0, -4], label: "Warehouse" },
  distribution: { pos: [8, 0, -5], label: "Distribution centre" },
  parking: { pos: [7, 0, 6], label: "Parking" },
  delivery: { pos: [-8, 0, 7], label: "Delivery zone" },
};

function Trucks() {
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    g.current?.children.forEach((c, i) => {
      const o = (t * 2.4 + i * 9) % 36;
      c.position.set(-18 + o, 0.35, i % 2 ? 9.4 : 8.2);
      c.rotation.y = i % 2 ? 0 : Math.PI;
    });
  });
  return (
    <group ref={g}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} castShadow>
          <boxGeometry args={[1.7, 0.7, 0.8]} />
          <meshStandardMaterial color={i % 2 ? "#c96a1e" : "#9aa2aa"} metalness={0.7} roughness={0.35} />
        </mesh>
      ))}
    </group>
  );
}

function Buildings({ active }: { active: CampusZone }) {
  return (
    <group>
      {(Object.keys(ZONES) as CampusZone[]).map((k) => {
        const z = ZONES[k];
        const isActive = k === active;
        const h = k === "office" ? 6 : k === "warehouse" ? 3.4 : 2.6;
        const w = k === "office" ? 5 : k === "parking" ? 6 : 7;
        return (
          <group key={k} position={z.pos}>
            <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
              <boxGeometry args={[w, h, k === "office" ? 5 : 5.5]} />
              <meshStandardMaterial
                color={isActive ? "#4b5661" : "#2c353d"}
                emissive={isActive ? "#ff8a2b" : "#000000"}
                emissiveIntensity={isActive ? 0.18 : 0}
                metalness={0.75}
                roughness={0.3}
              />
            </mesh>
            <Html position={[0, h + 1.1, 0]} center distanceFactor={22}>
              <span
                className={`pointer-events-none rounded-sm border px-2 py-1 text-[10px] font-semibold tracking-[0.18em] whitespace-nowrap uppercase backdrop-blur ${
                  isActive
                    ? "border-ember/70 bg-background/80 text-ember"
                    : "border-border/60 bg-background/60 text-muted-foreground"
                }`}
              >
                {z.label}
              </span>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

function CampusRig({ active }: { active: CampusZone }) {
  const { camera, pointer } = useThree();
  const look = useRef(new THREE.Vector3());
  useFrame((_, dt) => {
    const t = ZONES[active].pos;
    camera.position.x = damp(camera.position.x, t[0] * 0.6 + 12 + pointer.x * 2, 1.4, dt);
    camera.position.y = damp(camera.position.y, 11 - pointer.y * 2, 1.4, dt);
    camera.position.z = damp(camera.position.z, t[2] * 0.6 + 15, 1.4, dt);
    look.current.lerp(new THREE.Vector3(t[0], 2, t[2]), Math.min(1, dt * 2));
    camera.lookAt(look.current);
  });
  return null;
}

export default function CampusScene({ active }: { active: CampusZone }) {
  return (
    <SceneCanvas camera={{ position: [12, 11, 15], fov: 40 }} fog={["#0f161c", 22, 70]} background="#0f161c">
      <hemisphereLight args={["#cfe2f2", "#12181e", 0.65]} />
      <directionalLight position={[14, 18, 10]} intensity={2.1} color="#ffd8a8" castShadow />
      <CampusRig active={active} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[70, 70]} />
        <meshStandardMaterial color="#1a222a" roughness={0.9} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 8.8]}>
        <planeGeometry args={[60, 3.6]} />
        <meshStandardMaterial color="#252e36" roughness={0.7} />
      </mesh>
      <Buildings active={active} />
      <Trucks />
      <ContactShadows position={[0, 0.03, 0]} opacity={0.5} scale={50} blur={3} far={14} />
    </SceneCanvas>
  );
}
