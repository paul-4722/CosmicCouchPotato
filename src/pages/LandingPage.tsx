import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <div>title</div>
      <Link to="/tutorial?page=0">
        <button>TUTORIAL</button>
      </Link>
      <Link to="/create">
        <button>CREATE</button>
      </Link>
      <Link to="/explore">
        <button>EXPLORE</button>
      </Link>
    </div>
  );
}
