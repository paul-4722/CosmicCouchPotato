import styles from "./CelestialSphere.module.scss";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import StarGroup, { star } from "./StarGroup";
import { OrbitControls } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

export const zoomRatio = 2;

const stars: star[] = [
  {
    id: 0,
    dist: 10,
    azi: 0,
    pol: Math.PI / 2,
  },
  {
    id: 1,
    dist: 10,
    azi: 0,
    pol: Math.PI / 4,
  },
  {
    id: 2,
    dist: 10,
    azi: Math.PI * 0.5,
    pol: Math.PI / 4,
  },
  {
    id: 3,
    dist: 10,
    azi: Math.PI * 1,
    pol: Math.PI / 4,
  },
  {
    id: 4,
    dist: 10,
    azi: Math.PI * 1.5,
    pol: Math.PI / 4,
  },
];

const groundColor = new THREE.Color("#080808");

function BackGround() {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry
          args={[
            5,
            80,
            80,
            0,
            2 * Math.PI,
            (Math.PI * 0.5) / zoomRatio,
            Math.PI * (1 - 0.5 / zoomRatio),
          ]}
        />
        <meshStandardMaterial side={THREE.BackSide} color={groundColor} />
      </mesh>
    </group>
  );
}

export default function CelestialSphere() {
  return (
    <div className={styles.canvas}>
      <Canvas
        camera={{
          position: [0, -0.01, 0],
          fov: 60 / zoomRatio,
        }}
        style={{
          backgroundColor: "#141428",
        }}
      >
        <EffectComposer>
          <Bloom
            intensity={0.2}
            mipmapBlur={true}
            luminanceThreshold={0.55}
            luminanceSmoothing={5}
            levels={2}
          />
        </EffectComposer>
        <ambientLight color="#ffffff" intensity={7} />
        <StarGroup stars={stars} />
        <OrbitControls
          minPolarAngle={Math.PI * (1 - 0.4 / zoomRatio)}
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          rotateSpeed={-0.28}
        />
        <BackGround />
      </Canvas>
    </div>
  );
}
