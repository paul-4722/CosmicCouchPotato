import styles from "./CreatePage.module.scss";
import { useState } from "react";
import Slider from "../components/Slider";
import PieChartSlider from "../components/PieChartSlider";

export default function CreatePage() {
  const [radi, setRadi] = useState(1);
  return (
    <div>
      <Slider
        name="Semi-Major Axis(AU)"
        min={0.1}
        max={10}
        step={0.1}
        value={radi}
        valueToShow={radi.toFixed(1) + "AU"}
        setValue={setRadi}
      />
      <PieChartSlider names={["1", "2", "3", "4"]} />
      <button className={styles.backButton}>Back</button>
      <button className={styles.nextButton}>Next</button>
      <button className={styles.createButton}>Create Planet</button>
      <br />
      <input placeholder="Name Your Planet" className={styles.formTitle} />
      <br />
      <textarea placeholder="Description" className={styles.formDesc} />
    </div>
  );
}
