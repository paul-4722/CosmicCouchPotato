// @ts-nocheck

import React, { useState, useEffect, useRef } from "react";
import { Canvas, Ellipse, Circle, Shadow, FabricObject } from "fabric";
import Slider from "../Slider";
import PlanetMotion from "./PlanetMotion";


type SolarSystemProp = {
  height: number;
  width: number;
  habitable_min: number;
  habitable_max: number;
  planets: Array<PlanetProp>;
  create: Boolean;
};

type PlanetProp = {
  ec: number;
  axis: number;
  color: string;
  size: number;
};

type EllipseProp = {
  ec: number;
  axis: number;
  width: number;
  height: number;
  size: number;
  color: string;
  check: number;
}; 

type ControllerProp = {
  ec: number;
  setEc: (newValue: number) => void;
  axis: number;
  setAxis: (newValue: number) => void;
}; 

const STAR_RADIUS = 5;

function SolarSystemEllipse(props: EllipseProp){
  const {ec, axis, width, height, size, color, check} = props;
  const center_x = width/2, center_y = height/2;
  return (
    <div style={{position: "absolute", top: 0, left: 0}}>
      <PlanetMotion ec={ec} axis={axis} offsetX={center_x} offsetY={center_y} size={size} color={color} check={check}/>
    </div>
  )
}

function DrawEllipse(ec: number, axis: number, canvas: Canvas){
  const center_x = canvas.width/2, center_y = canvas.height/2;
  
  let ellipse_props = {
    rx: axis, 
    ry: Math.sqrt(1 - ec*ec) * axis, 
    left: center_x - (1 + ec) * axis, 
    top: center_y - Math.sqrt(1 - ec*ec) * axis, 
    fill: "transparent", 
    stroke: "black", 
  }

  
  function stopDragging(element: FabricObject){
    element.lockMovementX = true;
    element.lockMovementY = true;
    element.selectable = false;
  }
  

  if(canvas){
    canvas.__onMouseDown = () => null;
    canvas.renderTop();
    var orbit = new Ellipse(ellipse_props);
    stopDragging(orbit)
    canvas.add(orbit)
  }
}

function DrawHabitable(min_radius: number, max_radius: number, canvas: Canvas){
  const center_x = canvas.width/2, center_y = canvas.height/2;

  let star_props = {
    radius: STAR_RADIUS, 
    left: center_x - STAR_RADIUS, 
    top: center_y - STAR_RADIUS, 
    fill: "red",
  }

  let habitable_max_props = {
    radius: max_radius, 
    left: center_x - max_radius, 
    top: center_y - max_radius, 
    fill: "green", 
    opacity: 0.3, 
  }

  let habitable_min_props = {
    radius: min_radius, 
    left: center_x - min_radius, 
    top: center_y - min_radius, 
    fill: "white", 
    globalCompositeOperation: 'destination-out'
  }

  let shadow1_props = {
    color: 'white',
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
    var habitable_1 = new Circle(habitable_max_props);
    habitable_1.set('shadow', new Shadow(shadow1_props))
    var habitable_2 = new Circle(habitable_min_props);
    habitable_2.set('shadow', new Shadow(shadow2_props))
    var star = new Circle(star_props);


    var elements = [];
    elements.push(habitable_1);
    elements.push(habitable_2);
    elements.push(star);
    for(let i=0 ; i<elements.length ; i++){
      stopDragging(elements[i]);
    }
    canvas.add(...elements);
  }
}

function SolarSystemController(props: ControllerProp){
  
  const {ec, setEc, axis, setAxis} = props;
  return (
    <div style={{right: 0}}>
      <Slider name="setEc" min={0} max={0.95} step={0.001} value={ec} valueToShow={"Eccentricity: " + ec} setValue={setEc}/>
      <Slider name="setAxis" min={50} max={100} step={0.001} value={axis} valueToShow={"Semi-major Axis: " + axis} setValue={setAxis}/>
    </div>
  );
}

export default function SolarSystem(props: SolarSystemProp) {

  const {height, width, habitable_min, habitable_max, planets, create} = props;

  const [ec, setEc] = useState(0); // eccentricity
  const [axis, setAxis] = useState(100); // semi-major axis
  const planetList = planets.map((planet, idx) => (
    <SolarSystemEllipse key={idx} ec={planet.ec} axis={planet.axis} size={planet.size} color={planet.color} 
      width={width} height={height} check={ec}/>
  ));
  var canvas: Canvas;

  useEffect(() => {
    canvas = new Canvas("canvas", {
      height: height,
      width: width
    });
    DrawHabitable(habitable_min, habitable_max, canvas)
    if(create) DrawEllipse(ec, axis, canvas)
    planets.map((planet) => {DrawEllipse(planet.ec, planet.axis, canvas)})
    return () => {
      canvas.dispose();
    };
  })


  return (
    <div>
      <div style={{position: "relative", width: width, height: height, pointerEvents: "none", userSelect: "none" }}>
        <canvas id="canvas"/>
        {planetList}
        {create === true ? <SolarSystemEllipse key={0} ec={ec} axis={axis} size={10} color={"white"}
          width={width} height={height} check={ec}/> : null}
      </div>
      <div style={{right: 0}}>
        {create === true ? <SolarSystemController ec={ec} setEc={setEc} axis={axis} setAxis={setAxis} /> : null}
        
      </div>
    </div>
  );
  
}
