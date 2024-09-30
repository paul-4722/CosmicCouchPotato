import { ChangeEvent, useState } from "react";
import styles from "./Slider.module.scss";

type SliderProp = {
  name: string;
  min: number;
  max: number;
  step: number;
  value: number;
  valueToShow: string;
  setValue: (newValue: number) => void;
};

export default function Slider(props: SliderProp) {
  const { name, min, max, step, value, valueToShow, setValue } = props;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.valueAsNumber);
  };

  const gradValue = (100 * (value - min)) / (max - min);

  const [hover, setHover] = useState(false);

  return (
    <div className={styles.sliderDiv}>
      <div className={styles.nameDiv}>{name}</div>
      <input
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        style={{
          background:
            "linear-gradient(to right, #" +
            (hover ? "ffa0e9" : "ffa0d9") +
            " 0% " +
            gradValue +
            "%, #ffffff " +
            gradValue +
            "% 100%)",
        }}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
      <div className={styles.valDiv}>
        <span>{min}</span>
        <span>{valueToShow}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
