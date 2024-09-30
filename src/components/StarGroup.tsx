import Star from "./Star";

export type star = {
  id: number;
  dist: number;
  azi: number;
  pol: number;
};

type StarGroupProp = {
  stars: star[];
};

export default function StarGroup(props: StarGroupProp) {
  const { stars } = props;

  return (
    <group>
      {stars.map((s: star) => {
        return <Star key={s.id} dist={s.dist} azi={s.azi} pol={s.pol} />;
      })}
    </group>
  );
}
