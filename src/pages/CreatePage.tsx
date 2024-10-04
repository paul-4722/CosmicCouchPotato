import { Link } from "react-router-dom";

export default function CreatePage() {
  return (
    <div>
      CREATE PAGE My Solar System etc
      <Link to="/create/new">
        <button>+</button>
      </Link>
    </div>
  );
}
