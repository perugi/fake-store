import Button from "../components/Button/Button";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      Home
      <Link to="/shop">
        <Button label="Click Me" variant="secondary" disabled />
      </Link>
    </div>
  );
}

export default Home;
