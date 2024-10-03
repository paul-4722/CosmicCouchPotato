import styles from "./Star.module.scss";
import * as THREE from "three";
import { zoomRatio } from "./CelestialSphere";
import { useEffect, useState } from "react";
import { Html } from "@react-three/drei";
import earthIcon from "../assets/language.svg";
import arrowRight from "../assets/arrow_right_alt.svg";

const ArrowForward = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_438_890"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_438_890)">
        <path
          d="M8.025 22L6.25 20.225L14.475 12L6.25 3.775L8.025 2L18.025 12L8.025 22Z"
          fill="#FFFFFF"
        />
      </g>
    </svg>
  );
};

type StarProp = {
  dist: number;
  azi: number;
  pol: number;
};

const white = new THREE.Color("#ffffff");

export default function Star(props: StarProp) {
  const { dist, azi, pol } = props;

  const [hover, setHover] = useState(false);
  const [hoverBox, setHoverBox] = useState(false);
  const [hoverAny, setHoverAny] = useState(false);
  useEffect(() => {
    if (hover || hoverBox) {
      setHoverAny(true);
    } else {
      const id = setTimeout(() => setHoverAny(false), 200);
      return () => clearTimeout(id);
    }
  }, [hover, hoverBox]);

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
    <mesh
      position={[x, y, z]}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      {...props}
    >
      <sphereGeometry args={[0.1 / zoomRatio, 50, 50]} />
      <meshStandardMaterial color={white} />
      {hoverAny && (
        <Html>
          <div
            onMouseEnter={() => setHoverBox(true)}
            onMouseLeave={() => setHoverBox(false)}
            className={styles.starInfo}
          >
            <div>
              Gravitational Lens
              <ArrowForward />
            </div>
            <div>
              Transit
              <ArrowForward />
            </div>
            <div>
              RV
              <ArrowForward />
            </div>
            <button>
              <img src={earthIcon} />
              Choose a Star
              <img src={arrowRight} />
            </button>
          </div>
        </Html>
      )}
    </mesh>
  );
}
