import { useMemo, useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SceneCanvas } from "./SceneCanvas";
import { clamp01, damp } from "@/lib/three-utils";

type P = { progress: RefObject<number> };

const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

function Cityscape({ progress }: P) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const lights = useRef<THREE.InstancedMesh>(null);
  const count = 190;

  const blocks = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const gx = (i % 14) - 6.5;
        const gz = Math.floor(i / 14) - 6.5;
        const h = 1.5 + rand(i) * (Math.abs(gx) + Math.abs(gz) < 5 ? 11 : 4);
        return {
          x: gx * 4 + (rand(i + 9) - 0.5) * 0.8,
          z: gz * 4 + (rand(i + 21) - 0.5) * 0.8,
          h,
          w: 1.6 + rand(i + 3) * 1.2,
          d: 1.6 + rand(i + 7) * 1.2,
        };
      }),
    [],
  );

  useFrame(() => {
    const inst = mesh.current;
    const lit = lights.current;
    if (!inst || !lit) return;
    if (inst.userData.done) return;
    const m = new THREE.Matrix4();
    blocks.forEach((b, i) => {
      m.compose(
        new THREE.Vector3(b.x, b.h / 2, b.z),
        new THREE.Quaternion(),
        new THREE.Vector3(b.w, b.h, b.d),
      );
      inst.setMatrixAt(i, m);
      m.compose(
        new THREE.Vector3(b.x, b.h / 2, b.z),
        new THREE.Quaternion(),
        new THREE.Vector3(b.w * 1.01, b.h * 0.96, b.d * 1.01),
      );
      lit.setMatrixAt(i, m);
    });
    inst.instanceMatrix.needsUpdate = true;
    lit.instanceMatrix.needsUpdate = true;
    inst.userData.done = true;
  });

  useFrame((_, dt) => {
    const night = clamp01((progress.current ?? 0) * 1.4 - 0.25);
    const mat = lights.current?.material as THREE.MeshStandardMaterial | undefined;
    if (mat) mat.emissiveIntensity = damp(mat.emissiveIntensity, night * 1.5, 3, dt);
  });

  return (
    <group>
      <instancedMesh ref={mesh} args={[undefined, undefined, count]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#38414b" metalness={0.65} roughness={0.35} />
      </instancedMesh>
      <instancedMesh ref={lights} args={[undefined, undefined, count]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#0d141b"
          emissive="#ffc27a"
          emissiveIntensity={0}
          transparent
          opacity={0.55}
          wireframe
        />
      </instancedMesh>
    </group>
  );
}

function Traffic({ lanes = 6, perLane = 12 }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const total = lanes * perLane;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    const inst = ref.current;
    if (!inst) return;
    const t = clock.elapsedTime;
    let i = 0;
    for (let l = 0; l < lanes; l++) {
      const axis = l % 2 === 0;
      const offset = (l - lanes / 2) * 8 + 2;
      const dir = l % 4 < 2 ? 1 : -1;
      for (let c = 0; c < perLane; c++) {
        const pos = (((t * (6 + (c % 3)) * dir + c * 9) % 100) + 100) % 100 - 50;
        dummy.position.set(axis ? pos : offset, 0.22, axis ? offset : pos);
        dummy.rotation.y = axis ? 0 : Math.PI / 2;
        dummy.scale.set(0.9, 0.28, 0.4);
        dummy.updateMatrix();
        inst.setMatrixAt(i++, dummy.matrix);
      }
    }
    inst.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, total]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ffb347" emissive="#ff8a2b" emissiveIntensity={1.2} />
    </instancedMesh>
  );
}

function Infrastructure() {
  return (
    <group>
      {/* Flyover deck on piers */}
      <mesh position={[0, 3.2, -14]} castShadow>
        <boxGeometry args={[70, 0.4, 3]} />
        <meshStandardMaterial color="#4b545e" roughness={0.8} metalness={0.3} />
      </mesh>
      {Array.from({ length: 9 }).map((_, i) => (
        <mesh key={i} position={[-32 + i * 8, 1.6, -14]} castShadow>
          <boxGeometry args={[0.8, 3.2, 0.8]} />
          <meshStandardMaterial color="#525b66" roughness={0.85} />
        </mesh>
      ))}
      {/* Cable-stay bridge pylons */}
      {[-6, 6].map((x) => (
        <mesh key={x} position={[x, 6, 16]} castShadow>
          <boxGeometry args={[0.7, 12, 0.7]} />
          <meshStandardMaterial color="#8d949c" metalness={1} roughness={0.35} />
        </mesh>
      ))}
      <mesh position={[0, 2.4, 16]}>
        <boxGeometry args={[40, 0.3, 4]} />
        <meshStandardMaterial color="#4b545e" roughness={0.8} />
      </mesh>
      {/* Industrial plant silos */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[-26 + i * 2.6, 2.4, 22]} castShadow>
          <cylinderGeometry args={[1, 1, 4.8, 20]} />
          <meshStandardMaterial color="#7a828c" metalness={0.8} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function DroneRig({ progress }: P) {
  const { camera, pointer } = useThree();
  const target = new THREE.Vector3();

  useFrame((_, dt) => {
    const p = progress.current ?? 0;
    const angle = p * Math.PI * 1.6 - 0.4;
    const radius = 58 - p * 26;
    const height = 40 - p * 27;
    camera.position.x = damp(camera.position.x, Math.sin(angle) * radius + pointer.x * 4, 1.4, dt);
    camera.position.y = damp(camera.position.y, height - pointer.y * 2, 1.4, dt);
    camera.position.z = damp(camera.position.z, Math.cos(angle) * radius, 1.4, dt);
    target.set(0, 4 + p * 2, 0);
    camera.lookAt(target);
  });
  return null;
}

function Sky({ progress }: P) {
  const sun = useRef<THREE.DirectionalLight>(null);
  const amb = useRef<THREE.HemisphereLight>(null);
  const { scene } = useThree();
  const day = useMemo(() => new THREE.Color("#1a2530"), []);
  const night = useMemo(() => new THREE.Color("#070b11"), []);
  const tmp = useMemo(() => new THREE.Color(), []);

  useFrame((_, dt) => {
    const p = clamp01(progress.current ?? 0);
    if (sun.current) {
      sun.current.intensity = damp(sun.current.intensity, 3.2 * (1 - p * 0.92), 2, dt);
      sun.current.position.set(30 * Math.cos(p * 1.4), 40 - p * 34, 20);
      sun.current.color.setStyle(p > 0.5 ? "#ff9f5a" : "#ffd8a8");
    }
    if (amb.current) amb.current.intensity = 0.7 - p * 0.45;
    tmp.copy(day).lerp(night, p);
    (scene.background as THREE.Color | null)?.copy(tmp);
    if (scene.fog) (scene.fog as THREE.Fog).color.copy(tmp);
  });

  return (
    <>
      <hemisphereLight ref={amb} args={["#b9d6ee", "#141a20", 0.7]} />
      <directionalLight ref={sun} castShadow position={[30, 40, 20]} intensity={3.2} />
    </>
  );
}

export default function CityScene({ progress }: P) {
  return (
    <SceneCanvas
      camera={{ position: [40, 40, 40], fov: 42 }}
      fog={["#1a2530", 60, 190]}
      background="#1a2530"
    >
      <Sky progress={progress} />
      <DroneRig progress={progress} />
      <Cityscape progress={progress} />
      <Traffic />
      <Infrastructure />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[240, 240]} />
        <meshStandardMaterial color="#141a21" roughness={0.7} metalness={0.25} />
      </mesh>
    </SceneCanvas>
  );
}