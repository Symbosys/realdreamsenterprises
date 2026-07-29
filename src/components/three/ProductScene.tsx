import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { SceneCanvas } from "./SceneCanvas";
import { TmtBar } from "./parts";
import { damp } from "@/lib/three-utils";

export type ProductId = "tmt" | "rod" | "stambh" | "structural";
export type ViewMode = "solid" | "wireframe" | "exploded" | "section";

export type Hotspot = { label: string; position: [number, number, number] };

function ProductGeometry({
  product,
  mode,
}: {
  product: ProductId;
  mode: ViewMode;
}) {
  const group = useRef<THREE.Group>(null);
  const exploded = mode === "exploded";
  const wireframe = mode === "wireframe";
  const section = mode === "section";

  useFrame((_, dt) => {
    group.current?.children.forEach((child, i) => {
      const dir = child.userData.explodeDir as THREE.Vector3 | undefined;
      if (!dir) return;
      const t = exploded ? 1 : 0;
      child.position.x = damp(child.position.x, dir.x * t, 4, dt);
      child.position.y = damp(child.position.y, dir.y * t + (child.userData.baseY ?? 0), 4, dt);
      child.position.z = damp(child.position.z, dir.z * t, 4, dt);
      child.rotation.y = damp(child.rotation.y, exploded ? 0.4 * i : 0, 4, dt);
    });
  });

  const mat = (color: string, rough = 0.32) => (
    <meshStandardMaterial
      color={color}
      metalness={wireframe ? 0 : 1}
      roughness={rough}
      wireframe={wireframe}
      transparent={section}
      opacity={section ? 0.45 : 1}
      side={section ? THREE.DoubleSide : THREE.FrontSide}
    />
  );

  if (product === "tmt") {
    return (
      <group ref={group}>
        {[-0.7, 0, 0.7].map((x, i) => (
          <group
            key={i}
            userData={{ explodeDir: new THREE.Vector3(x * 1.6, i * 0.5, 0) }}
            position={[x, 0, 0]}
          >
            <TmtBar length={4} radius={0.16} ribs={26} rotation={[0, 0, Math.PI / 2]} />
          </group>
        ))}
        {section ? (
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.09, 0.09, 4.02, 20]} />
            <meshStandardMaterial color="#ff8a2b" emissive="#ff8a2b" emissiveIntensity={0.5} />
          </mesh>
        ) : null}
      </group>
    );
  }

  if (product === "rod") {
    return (
      <group ref={group}>
        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            position={[0, (i - 1) * 0.5, 0]}
            rotation={[0, 0, Math.PI / 2]}
            userData={{ explodeDir: new THREE.Vector3(0, (i - 1) * 1.4, 0), baseY: (i - 1) * 0.5 }}
            castShadow
          >
            <cylinderGeometry args={[0.2, 0.2, 4, 28]} />
            {mat("#b6bdc4", 0.14)}
          </mesh>
        ))}
      </group>
    );
  }

  if (product === "stambh") {
    return (
      <group ref={group}>
        <mesh
          position={[0, -1.4, 0]}
          userData={{ explodeDir: new THREE.Vector3(0, -1.2, 0), baseY: -1.4 }}
          castShadow
        >
          <cylinderGeometry args={[1.1, 1.3, 0.4, 32]} />
          {mat("#6f7780", 0.6)}
        </mesh>
        <mesh userData={{ explodeDir: new THREE.Vector3(0, 0, 0) }} castShadow>
          <cylinderGeometry args={[0.55, 0.7, 3, 32]} />
          {mat("#9aa1a8", 0.22)}
        </mesh>
        <mesh
          position={[0, 1.8, 0]}
          userData={{ explodeDir: new THREE.Vector3(0, 1.4, 0), baseY: 1.8 }}
          castShadow
        >
          <cylinderGeometry args={[0.2, 0.55, 0.8, 32]} />
          {mat("#c9a84c", 0.18)}
        </mesh>
      </group>
    );
  }

  // Structural I-beam assembly
  return (
    <group ref={group}>
      {[
        { p: [0, 0.9, 0], s: [3.6, 0.18, 1.2], d: new THREE.Vector3(0, 1.2, 0) },
        { p: [0, 0, 0], s: [3.6, 1.6, 0.2], d: new THREE.Vector3(0, 0, 0) },
        { p: [0, -0.9, 0], s: [3.6, 0.18, 1.2], d: new THREE.Vector3(0, -1.2, 0) },
      ].map((b, i) => (
        <mesh
          key={i}
          position={b.p as [number, number, number]}
          userData={{ explodeDir: b.d, baseY: b.p[1] }}
          castShadow
        >
          <boxGeometry args={b.s as [number, number, number]} />
          {mat("#8d949c", 0.28)}
        </mesh>
      ))}
    </group>
  );
}

function Hotspots({ hotspots }: { hotspots: Hotspot[] }) {
  return (
    <>
      {hotspots.map((h) => (
        <group key={h.label} position={h.position}>
          <mesh>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color="#ff8a2b" />
          </mesh>
          <Html distanceFactor={7} center>
            <span className="pointer-events-none whitespace-nowrap rounded-sm border border-border/70 bg-card/85 px-2 py-1 text-[10px] font-semibold tracking-[0.18em] text-foreground uppercase backdrop-blur">
              {h.label}
            </span>
          </Html>
        </group>
      ))}
    </>
  );
}

function Turntable({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.18;
  });
  return <group ref={ref}>{children}</group>;
}

export default function ProductScene({
  product,
  mode,
  hotspots,
}: {
  product: ProductId;
  mode: ViewMode;
  hotspots: Hotspot[];
}) {
  const key = useMemo(() => `${product}`, [product]);
  return (
    <SceneCanvas camera={{ position: [0, 1.4, 7], fov: 38 }}>
      <hemisphereLight args={["#dbe9f6", "#22282f", 0.7]} />
      <spotLight position={[6, 8, 6]} angle={0.5} penumbra={0.8} intensity={220} color="#fff0d8" />
      <spotLight position={[-7, 3, -5]} angle={0.6} penumbra={1} intensity={120} color="#7fb2d8" />
      <Turntable>
        <group key={key}>
          <ProductGeometry product={product} mode={mode} />
          <Hotspots hotspots={hotspots} />
        </group>
      </Turntable>
      <ContactShadows position={[0, -2.1, 0]} opacity={0.5} scale={14} blur={2.6} far={6} />
      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.06}
        minDistance={4}
        maxDistance={11}
        minPolarAngle={0.6}
        maxPolarAngle={Math.PI / 1.7}
      />
    </SceneCanvas>
  );
}