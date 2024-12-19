import { Button } from "../Button/Button";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

export function Index() {
  return (
    <>
      <Navbar />
      <Link to="/musicians">
        <Button variant="secondary" size="auto">
          Find musicians
        </Button>
      </Link>
    </>
  );
}
