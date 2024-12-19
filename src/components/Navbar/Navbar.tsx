import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { Button } from "../Button/Button";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); //hook for navigation

  useEffect(() => {
    // Check if the access token exists in localStorage
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSignOut = () => {
    // Remove token and update state
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link to="/" className={styles.logo}>
          Music Samspil
        </Link>
        <p className={styles.logoText}>Skabt af DAOS - Dansk Amatørorkester Samvirke</p>
      </div>

      {isAuthenticated ? (
        <div className={styles.navLinks}>
          <Link to="/profile" className={styles.customLink}>
            Profile
          </Link>
          <Link to="/ensembles" className={styles.customLink}>
            Find Ensemble
          </Link>
          <Link to="/create-ensemble" className={styles.customLink}>
            Create Ensemble
          </Link>
          <Button size="auto" variant="secondary" onClick={handleSignOut}>
            Sign out
          </Button>
        </div>
      ) : (
        <div className={styles.navLinks}>
          <Link to="/sign-up">
            <Button size="auto">Sign up</Button>
          </Link>
          <Link to="/sign-in">
            <Button size="auto" variant="secondary">
              Sign in
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
