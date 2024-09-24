import { useState } from "react";
import Slider from "../components/Slider";

export default function CreatePage() {
  const [radi, setRadi] = useState(1);
  return (
    <div>
      <Slider
        name="장반경"
        min={0.1}
        max={10}
        step={0.1}
        value={radi}
        valueToShow={radi.toFixed(1) + "AU"}
        setValue={setRadi}
      />
    </div>
  );
}
