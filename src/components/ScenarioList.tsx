import styles from "./ScenarioList.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type scenario = {
  id: number;
};

function Cell({ scenario }: { scenario: scenario }) {
  return <div className={styles.cell}>{scenario.id}</div>;
}

export default function ScenarioList() {
  const scenarios: scenario[] = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
  ];

  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  return (
    <div className={styles.container}>
      <Slider {...settings}>
        {scenarios.map((s: scenario) => (
          <Cell key={s.id} scenario={s} />
        ))}
      </Slider>
    </div>
  );
}
