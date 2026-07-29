import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { Beam, Birds, Clouds, DustField, Sparks, TmtBar } from "./parts";
import { SceneCanvas } from "./SceneCanvas";
import { damp } from "@/lib/three-utils";

const FLOORS = 11;
const FLOOR_H = 1.5;
const W = 5;

function Tower() {
  const floors = useMemo(() => Array.from({ length: FLOORS }, (_, i) => i), []);
  const columns = useMemo(
    () =>
      [-1, 1].flatMap((x) => [-1, 1].map((z) => [x * (W / 2), z * (W / 2)] as [number, number])),
    [],
  );

  return (
    <group position={[0, 0, 0]}>
      {/* Core columns */}
      {columns.map(([x, z], i) => (
        <Beam
          key={`c${i}`}
          position={[x, (FLOORS * FLOOR_H) / 2, z]}
          size={[0.26, FLOORS * FLOOR_H, 0.26]}
        />
      ))}
      {/* Floor slabs + edge beams */}
      {floors.map((f) => {
        const y = f * FLOOR_H;
        const clad = f < FLOORS - 4;
        return (
          <group key={f} position={[0, y, 0]}>
            <mesh receiveShadow castShadow>
              <boxGeometry args={[W + 0.5, 0.16, W + 0.5]} />
              <meshStandardMaterial color="#6f7780" metalness={0.25} roughness={0.85} />
            </mesh>
            {clad ? (
              <mesh position={[0, FLOOR_H / 2, 0]}>
                <boxGeometry args={[W + 0.35, FLOOR_H - 0.2, W + 0.35]} />
                <meshPhysicalMaterial
                  color="#12222e"
                  metalness={0.9}
                  roughness={0.08}
                  transmission={0.35}
                  thickness={0.6}
                  transparent
                  opacity={0.72}
                />
              </mesh>
            ) : (
              <>
                <Beam position={[0, FLOOR_H / 2, W / 2]} size={[W, 0.14, 0.14]} />
                <Beam position={[0, FLOOR_H / 2, -W / 2]} size={[W, 0.14, 0.14]} />
                <Beam position={[W / 2, FLOOR_H / 2, 0]} size={[0.14, 0.14, W]} />
                <Beam
                  position={[W / 2, FLOOR_H / 2, 0]}
                  size={[0.1, 0.1, W * 1.4]}
                  rotation={[0.72, 0, 0]}
                />
              </>
            )}
          </group>
        );
      })}
      {/* Exposed rebar cage on the top deck */}
      {Array.from({ length: 10 }).map((_, i) => (
        <TmtBar
          key={`r${i}`}
          length={2.2}
          radius={0.05}
          ribs={12}
          position={[-2 + (i % 5) * 1, FLOORS * FLOOR_H + 1.1, -1.4 + Math.floor(i / 5) * 2.6]}
        />
      ))}
      {/* Material stack on the ground */}
      {Array.from({ length: 6 }).map((_, i) => (
        <TmtBar
          key={`s${i}`}
          length={7}
          radius={0.08}
          ribs={16}
          position={[6.5, 0.2 + Math.floor(i / 3) * 0.19, -1 + (i % 3) * 0.2]}
          rotation={[0, 0, Math.PI / 2]}
        />
      ))}
    </group>
  );
}

function Crane({
  position,
  scale = 1,
  speed = 0.12,
  offset = 0,
}: {
  position: [number, number, number];
  scale?: number;
  speed?: number;
  offset?: number;
}) {
  const jib = useRef<THREE.Group>(null);
  const hook = useRef<THREE.Group>(null);
  const mastH = 20;

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (jib.current) jib.current.rotation.y = offset + t * speed;
    if (hook.current) hook.current.position.y = -3 - Math.sin(t * 0.5 + offset) * 2.2;
  });

  return (
    <group position={position} scale={scale}>
      <Beam position={[0, mastH / 2, 0]} size={[0.42, mastH, 0.42]} />
      <group ref={jib} position={[0, mastH, 0]}>
        <Beam position={[5.5, 0, 0]} size={[13, 0.32, 0.32]} />
        <Beam position={[0, 1.6, 0]} size={[0.24, 3.2, 0.24]} />
        <mesh position={[-2.6, -0.4, 0]} castShadow>
          <boxGeometry args={[2.2, 1, 1]} />
          <meshStandardMaterial color="#ff8a2b" metalness={0.4} roughness={0.5} />
        </mesh>
        <group ref={hook} position={[9, -3, 0]}>
          <mesh>
            <cylinderGeometry args={[0.03, 0.03, 6, 6]} />
            <meshBasicMaterial color="#3c444d" />
          </mesh>
          <mesh position={[0, -3, 0]} castShadow>
            <boxGeometry args={[1.4, 0.35, 0.6]} />
            <meshStandardMaterial color="#8d949c" metalness={1} roughness={0.35} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

function ConstructionLift() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current)
      ref.current.position.y = 1 + (Math.sin(clock.elapsedTime * 0.35) * 0.5 + 0.5) * 13;
  });
  return (
    <group position={[-(W / 2) - 0.9, 0, 0]}>
      <Beam position={[0, 9, 0]} size={[0.14, 18, 0.14]} />
      <group ref={ref}>
        <mesh castShadow>
          <boxGeometry args={[1, 1.4, 1.2]} />
          <meshStandardMaterial color="#ffb347" metalness={0.5} roughness={0.45} />
        </mesh>
      </group>
    </group>
  );
}

function Blueprints() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (!ref.current) return;
    ref.current.rotation.y = t * 0.18;
    ref.current.position.y = 9 + Math.sin(t * 0.6) * 0.4;
  });
  return (
    <group ref={ref} position={[0, 9, 0]}>
      {[7, 9.5, 12].map((r, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, i]} position={[0, i * 1.6 - 2, 0]}>
          <ringGeometry args={[r, r + 0.03, 64]} />
          <meshBasicMaterial color="#4aa8d8" transparent opacity={0.35} side={THREE.DoubleSide} />
        </mesh>
      ))}
      <mesh position={[8.5, 1.5, 2]} rotation={[0, -0.6, 0]}>
        <planeGeometry args={[5, 3.2, 8, 5]} />
        <meshBasicMaterial color="#4aa8d8" wireframe transparent opacity={0.28} />
      </mesh>
      <mesh position={[-8.5, -1, -2]} rotation={[0, 0.7, 0]}>
        <planeGeometry args={[5, 3.2, 8, 5]} />
        <meshBasicMaterial color="#ff8a2b" wireframe transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

function CameraRig() {
  const { camera, pointer } = useThree();
  const target = useMemo(() => new THREE.Vector3(0, 8, 0), []);

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    const radius = 26 + Math.sin(t * 0.08) * 3;
    const angle = t * 0.055;
    const px = Math.sin(angle) * radius + pointer.x * 3.2;
    const pz = Math.cos(angle) * radius;
    const py = 12 + Math.sin(t * 0.12) * 1.6 - pointer.y * 2.4;
    camera.position.x = damp(camera.position.x, px, 2.2, dt);
    camera.position.y = damp(camera.position.y, py, 2.2, dt);
    camera.position.z = damp(camera.position.z, pz, 2.2, dt);
    camera.lookAt(target);
  });
  return null;
}

function HeroContents() {
  return (
    <>
      <CameraRig />
      <hemisphereLight args={["#cfe4f5", "#2a2f36", 0.5]} />
      <directionalLight
        castShadow
        position={[18, 26, 10]}
        intensity={3.2}
        color="#ffd8a8"
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={80}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={40}
        shadow-camera-bottom={-10}
      />
      <Tower />
      <ConstructionLift />
      <Crane position={[-11, 0, -6]} speed={0.1} />
      <Crane position={[12, 0, 7]} scale={0.78} speed={-0.08} offset={2} />
      <Blueprints />
      <DustField />
      <Sparks origin={[1.4, 12.2, 1.4]} />
      <Clouds />
      <Birds />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.05, 0]}>
        <circleGeometry args={[60, 48]} />
        <meshStandardMaterial color="#20262d" roughness={0.95} metalness={0.05} />
      </mesh>
      <ContactShadows position={[0, 0.02, 0]} opacity={0.55} scale={50} blur={2.6} far={20} />
    </>
  );
}

export default function HeroScene() {
  return (
    <SceneCanvas
      camera={{ position: [22, 12, 22], fov: 38 }}
      fog={["#131a20", 40, 110]}
      background="#131a20"
    >
      <HeroContents />
    </SceneCanvas>
  );
}