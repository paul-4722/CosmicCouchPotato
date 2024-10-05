import { motion } from 'framer-motion';
import { useState } from 'react';


// T: theta
// r * vel = r^2 * dT/dt = c ~ sqrt(e / a)
// r = k / (1 + ecos(T))

const REAL_SPEED = 1000;
const C_MUL = 50;
const dT = 0.1;

function nextState(pos: number[], nparam: number[]){
  let x = pos[0], y = pos[1], e = nparam[0], a = nparam[1];

  let r_0 = Math.sqrt(x*x + y*y);
  let T_0 = Math.atan2(y, x);

  let [x_res, y_res] = [0, 0];
  let c = Math.sqrt(a * (1 - e*e)) * C_MUL;
  let k = (1 - e*e) * a;
  let T_1_bar = T_0 + dT * c / (r_0 * r_0);
  let r_1_bar = k / (1 + e * Math.cos(T_1_bar)); 
  let T_1 = T_0 + dT * (c / (r_0 * r_0) + c / (r_1_bar * r_1_bar)) / 2;

  
  let r_1 = k / (1 + e * Math.cos(T_1));
  [x_res, y_res] = [r_1 * Math.cos(T_1), r_1 * Math.sin(T_1)];
  
  return [x_res, y_res];
}

type PlanetMotionProp = {
  ec: number;
  axis: number;
  offsetX: number;
  offsetY: number;
  size: number;
  color: string;
}


export default function PlanetMotion(props: PlanetMotionProp){

  const {ec, axis, offsetX, offsetY, size, color} = props;
  const [coor, setCoor] = useState([100, 100]);
  const [precoor, setPrecoor] = useState([0, 0]);
  
  
  const ballStyle = {
    display: "block", 
    width: size, 
    height: size, 
    backgroundColor: color, 
    borderRadius: size
  }

  return (
    <motion.span
      
      style={ballStyle}
      animate={{
        x: [precoor[0] + offsetX - size/2, coor[0] + offsetX - size/2], 
        y:[precoor[1] + offsetY - size/2, coor[1] + offsetY - size/2]
      }}
      transition={{
        duration: dT/REAL_SPEED, 
        ease: "linear"
      }}
      onAnimationComplete={() => {
        setPrecoor(coor);
        setCoor(nextState(coor, [ec, axis]));
      }}
    >
    </motion.span>
  );
}
