import styles from "./SandBoxPage.module.scss";
import { useState } from "react";
import Slider from "../components/Slider";
import PieChartSlider from "../components/PieChartSlider";
import SolarSystem from "../components/solar_system/SolarSystem";

const planet1 = {
  ec: 0.1, 
  axis: 100, 
  color: "red", 
  size: 50
}

const planet2 = {
  ec: 0.5, 
  axis: 50, 
  color: "blue", 
  size: 10
}

export default function CreatePage() {
  const [radi, setRadi] = useState(1);
  return (
    <div>
      <SolarSystem height={500} width={500} habitable_max={200} habitable_min={100} planets={[planet1, planet2]} create={true}/>
    </div>
  );
}
