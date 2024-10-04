import "./Header.module.scss";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div>
        <Link to="/">Home</Link>
        <Link to="/create">Create</Link>
        <Link to="/explore">Explore</Link>
      </div>
    </header>
  );
}
