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
      <Link to="/" className={styles.logo}>
        Music Samspil
      </Link>
      <div className={styles.links}>
        {isAuthenticated ? (
          <>
            <Link to="/find-ensemble" className={styles.customLink}>
              Find Ensemble
            </Link>
            <Link to="/profile" className={styles.customLink}>
             Profile
            </Link>
            <Button size="auto" variant="secondary" onClick={handleSignOut}>
              Sign out
            </Button>
          </>
        ) : (
          <>
            <Link to="/sign-up">
              <Button size="auto">Sign up</Button>
            </Link>
            <Link to="/sign-in">
              <Button size="auto" variant="secondary">
                Sign in
              </Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
