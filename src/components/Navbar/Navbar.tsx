import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { Button } from "../Button/Button";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        Music Samspil
      </Link>
      <div className={styles.buttons}>
        <Link to="/sign-up">
          <Button size="auto">Sign up</Button>
        </Link>
        <Link to="/sign-in">
          <Button size="auto" variant="secondary">
            Sign in
          </Button>
        </Link>
      </div>
    </nav>
  );
}
