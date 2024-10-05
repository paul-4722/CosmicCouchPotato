import styles from "./SandBoxPage.module.scss";
import { useState } from "react";
import Slider from "../components/Slider";
import PieChartSlider from "../components/PieChartSlider";
import RegisterModal from "../components/RegisterModal";
import ScenarioList from "../components/ScenarioList";

export default function CreatePage() {
  const [radi, setRadi] = useState(1);
  const [showModal, setShowModal] = useState(false);
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
      <button
        className={styles.createButton}
        onClick={() => setShowModal(true)}
      >
        Show Modal
      </button>
      <br />
      <input placeholder="Name Your Planet" className={styles.formTitle} />
      <br />
      <textarea placeholder="Description" className={styles.formDesc} />
      <RegisterModal show={showModal} setShow={setShowModal} />
      <ScenarioList />
    </div>
  );
}