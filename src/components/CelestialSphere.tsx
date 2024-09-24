import { Canvas } from "@react-three/fiber";

export default function CelestialSphere() {
  return (
    <div>
      <Canvas>
        <ambientLight color="ffffff" intensity={7} />
      </Canvas>
    </div>
  );
}
