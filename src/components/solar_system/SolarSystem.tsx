

import React, { useState, useEffect } from "react";
import { Canvas, Rect, Ellipse, Circle, Shadow, FabricObject, Text} from "fabric";
import Slider from "../Slider";
import PlanetMotion from "./PlanetMotion";


type SolarSystemProp = {
  height: number;
  width: number;
  habitable_min: number;
  habitable_max: number;
};

type ViewerProp = {
  height: number;
  width: number;
  ec: number;
  axis: number;
  min: number;
  max: number;
}; 

type ControllerProp = {
  ec: number;
  setEc: (newValue: number) => void;
  axis: number;
  setAxis: (newValue: number) => void;
}; 

const STAR_RADIUS = 5;

function SolarSystemViewer(props: ViewerProp){
  const {height, width, ec, axis, min, max} = props;
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const center_x = width/2, center_y = height/2;


  const initCanvas = () =>
    new Canvas("canvas", {
      height: height,
      width: width,
    });
  
  let ellipse_props = {
    rx: axis, 
    ry: Math.sqrt(1 - ec*ec) * axis, 
    left: center_x - (1 + ec) * axis, 
    top: center_y - Math.sqrt(1 - ec*ec) * axis, 
    fill: "transparent", 
    stroke: "black", 
  }

  let star_props = {
    radius: STAR_RADIUS, 
    left: center_x - STAR_RADIUS, 
    top: center_y - STAR_RADIUS, 
    fill: "red",
  }

  let habitable_max_props = {
    radius: max, 
    left: center_x - max, 
    top: center_y - max, 
    fill: "green", 
    opacity: 0.4, 
  }

  let habitable_min_props = {
    radius: min, 
    left: center_x - min, 
    top: center_y - min, 
    fill: "white",
  }

  let shadow1_props = {
    color: 'lightgreen',
    blur: 20,
  }

  let shadow2_props = {
    color: 'white',
    blur: 20,
  }

  function stopDragging(element: FabricObject){
    element.lockMovementX = true;
    element.lockMovementY = true;
    element.selectable = false;
  }
  

  if(canvas){
    canvas.__onMouseDown = () => null;
    canvas.renderTop();
    canvas.clear();
    var habitable_1 = new Circle(habitable_max_props);
    habitable_1.set('shadow', new Shadow(shadow1_props))
    var habitable_2 = new Circle(habitable_min_props);
    habitable_2.set('shadow', new Shadow(shadow2_props))
    var orbit = new Ellipse(ellipse_props);
    var star = new Circle(star_props);


    var elements = [];
    elements.push(habitable_1);
    elements.push(habitable_2);
    elements.push(orbit);
    elements.push(star);
    for(let i=0 ; i<elements.length ; i++){
      stopDragging(elements[i]);
    }
    canvas.add(...elements);
  }
    

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);
  return (
    <div style={{position: "relative", width: width, height: height, pointerEvents: "none", userSelect: "none" }}>
      <div style={{position: "absolute", top: "0.25em", left: "0.25em"}}>
        <canvas id='canvas'/>
      </div>
      <div style={{position: "absolute", top: 0, left: 0}}>
        <PlanetMotion ec={ec} axis={axis} offsetX={center_x} offsetY={center_y}/>
      </div>
    </div>
  );
}

function SolarSystemController(props: ControllerProp){
  
  const {ec, setEc, axis, setAxis} = props;
  return (
    <div style={{right: 0}}>
      <Slider name="setEc" min={0} max={0.95} step={0.01} value={ec} valueToShow={"Eccentricity: " + ec} setValue={setEc}/>
      <Slider name="setAxis" min={50} max={100} step={0.01} value={axis} valueToShow={"Semi-major Axis: " + axis} setValue={setAxis}/>
    </div>
  );
}

export default function SolarSystem(props: SolarSystemProp) {

  const {height, width, habitable_min, habitable_max} = props;
  const [ec, setEc] = useState(0); // eccentricity
  const [axis, setAxis] = useState(100); // semi-major axis


  return (
    <div>
      <div style={{width: "50%"}}>
        <SolarSystemViewer height={height/2} width={width/2} ec={ec} axis={axis} min={habitable_min} max={habitable_max}/>
      </div>
      <div style={{right: 0}}>
        <SolarSystemController ec={ec} setEc={setEc} axis={axis} setAxis={setAxis} />
      </div>
    </div>
  );
}
