import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents, Environment, Lightformer } from "@react-three/drei";
import { Suspense, useMemo, type ReactNode } from "react";
import { detectPerfTier, dprFor, type PerfTier } from "@/lib/three-utils";

type Props = {
  children: ReactNode;
  camera?: { position: [number, number, number]; fov?: number };
  fog?: [string, number, number];
  background?: string;
  className?: string;
  tierOverride?: PerfTier;
};

export function SceneCanvas({ children, camera, fog, background, className }: Props) {
  const tier = useMemo(() => detectPerfTier(), []);

  return (
    <Canvas
      className={className}
      dpr={dprFor(tier)}
      shadows={tier === "high" ? "soft" : false}
      gl={{ antialias: tier !== "low", powerPreference: "high-performance", alpha: !background }}
      camera={{ position: camera?.position ?? [8, 4, 12], fov: camera?.fov ?? 40, near: 0.1, far: 400 }}
    >
      {background ? <color attach="background" args={[background]} /> : null}
      {fog ? <fog attach="fog" args={fog} /> : null}
      <Suspense fallback={null}>
        {children}
        <Environment resolution={tier === "low" ? 64 : 128}>
          <Lightformer intensity={2.4} position={[0, 6, 4]} scale={[12, 12, 1]} color="#ffd9a8" />
          <Lightformer intensity={1.1} position={[-8, 2, -4]} scale={[10, 10, 1]} color="#7fb2d8" />
          <Lightformer intensity={0.7} position={[8, -2, 2]} scale={[10, 10, 1]} color="#3a4552" />
        </Environment>
      </Suspense>
      <AdaptiveDpr pixelated={false} />
      <AdaptiveEvents />
    </Canvas>
  );
}