import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <div>title</div>
      <Link to="/select">
        <button>SELECT</button>
      </Link>
      <Link to="/create">
        <button>CREATE</button>
      </Link>
      <Link to="/explore">
        <button>EXPLORE</button>
      </Link>
      <Link to="/sandbox">
        <button>SANDBOX(DEVELOPER ONLY)</button>
      </Link>
    </div>
  );
}
