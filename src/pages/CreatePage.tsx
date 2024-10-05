import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { HTTPMethod, baseURL } from "../tools/HTTPMethod";
import { StarData } from "../tools/DataInterface";
import SolarSystem from "../components/solar_system/SolarSystem";

export default function CreatePage() {
  const [star, setStar] = useState<StarData>();

  useEffect(() => {
    HTTPMethod("GET", baseURL + "star/1/")
    .then(response => {setStar(response.star)})
    .catch(error => {console.error(error)})
  }, [])
  
  if(star)
    return (
    <div>
      {star.name}
    </div>
    );
}
