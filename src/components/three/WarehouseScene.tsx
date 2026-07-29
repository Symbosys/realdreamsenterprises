import { useMemo, useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SceneCanvas } from "./SceneCanvas";
import { DustField } from "./parts";
import { damp } from "@/lib/three-utils";

/** Camera dollies down the aisle; scroll progress pushes it deeper. */
function AisleRig({ progress }: { progress?: RefObject<number> }) {
  const { camera, pointer } = useThree();
  const look = useRef(new THREE.Vector3());
  useFrame(({ clock }, dt) => {
    const p = progress?.current ?? Math.min(1, (clock.elapsedTime % 26) / 26);
    const z = 18 - p * 34;
    camera.position.x = damp(camera.position.x, pointer.x * 2.2, 1.6, dt);
    camera.position.y = damp(camera.position.y, 3.2 - pointer.y * 1.1, 1.6, dt);
    camera.position.z = damp(camera.position.z, z, 1.6, dt);
    look.current.set(pointer.x * 1.5, 2.6, z - 12);
    camera.lookAt(look.current);
  });
  return null;
}

function Rack({ x, z }: { x: number; z: number }) {
  const bundles = useMemo(
    () => Array.from({ length: 3 }, (_, i) => ({ y: 1 + i * 1.9, hue: i })),
    [],
  );
  return (
    <group position={[x, 0, z]}>
      {[-1.4, 1.4].map((o) => (
        <mesh key={o} position={[0, 3, o]} castShadow>
          <boxGeometry args={[0.16, 6, 0.16]} />
          <meshStandardMaterial color="#c96a1e" metalness={0.6} roughness={0.45} />
        </mesh>
      ))}
      {bundles.map((b) => (
        <group key={b.y}>
          <mesh position={[0, b.y - 0.35, 0]} castShadow>
            <boxGeometry args={[3.6, 0.1, 2.8]} />
            <meshStandardMaterial color="#7d848b" metalness={0.9} roughness={0.35} />
          </mesh>
          {[-0.6, 0, 0.6].map((zz) => (
            <mesh key={zz} position={[0, b.y, zz]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.22, 0.22, 3.4, 14]} />
              <meshStandardMaterial
                color={b.hue % 2 ? "#9aa2aa" : "#6f767e"}
                metalness={1}
                roughness={0.28}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function Gantry() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.position.z = -8 + Math.sin(clock.elapsedTime * 0.25) * 14;
  });
  return (
    <group ref={ref} position={[0, 7.4, 0]}>
      <mesh castShadow>
        <boxGeometry args={[16, 0.35, 0.6]} />
        <meshStandardMaterial color="#8d949c" metalness={1} roughness={0.3} />
      </mesh>
      <mesh position={[0, -1.6, 0]}>
        <boxGeometry args={[0.1, 3, 0.1]} />
        <meshStandardMaterial color="#4d545b" metalness={0.8} roughness={0.4} />
      </mesh>
      <mesh position={[0, -3.4, 0]}>
        <boxGeometry args={[2.4, 0.5, 1]} />
        <meshStandardMaterial color="#c96a1e" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
}

export default function WarehouseScene({ progress }: { progress?: RefObject<number> }) {
  const racks = useMemo(
    () => Array.from({ length: 12 }, (_, i) => ({ x: i % 2 ? 6 : -6, z: 6 - Math.floor(i / 2) * 8 })),
    [],
  );
  return (
    <SceneCanvas camera={{ position: [0, 3.2, 18], fov: 46 }} fog={["#0e1419", 14, 62]} background="#0e1419">
      <hemisphereLight args={["#cfe2f2", "#12181e", 0.5]} />
      {[10, -8, -26, -44].map((z) => (
        <pointLight key={z} position={[0, 8, z]} intensity={90} distance={30} color="#ffd9a8" />
      ))}
      <AisleRig progress={progress} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 140]} />
        <meshStandardMaterial color="#1b2229" roughness={0.85} metalness={0.15} />
      </mesh>
      {racks.map((r, i) => (
        <Rack key={i} x={r.x} z={r.z} />
      ))}
      <Gantry />
      <DustField />
    </SceneCanvas>
  );
}
