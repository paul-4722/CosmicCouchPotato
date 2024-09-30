import * as THREE from "three";
import { zoomRatio } from "./CelestialSphere";

type StarProp = {
  dist: number;
  azi: number;
  pol: number;
};

const white = new THREE.Color("#ffffff");

export default function Star(props: StarProp) {
  const { dist, azi, pol } = props;

  // option 1: 별의 밀도를 균일하게 유지
  const y =
    dist *
    (1 - (1 - Math.sin(pol)) * (1 - Math.cos(Math.PI / (2 * zoomRatio))));
  const pol_ = Math.asin(y / dist);

  // option 2: 별의 각도를 균일하게 유지
  // const pol_ = Math.PI / 2 - (Math.PI / 2 - pol) / zoomRatio;
  // const y = dist * Math.sin(pol_);

  const x = dist * Math.sin(azi) * Math.cos(pol_);
  const z = dist * Math.cos(azi) * Math.cos(pol_);

  return (
    <mesh position={[x, y, z]} {...props}>
      <sphereGeometry args={[0.1 / zoomRatio, 50, 50]} />
      <meshStandardMaterial color={white} />
    </mesh>
  );
}
