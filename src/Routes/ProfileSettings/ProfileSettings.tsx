import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./ProfileSettings.module.css";

export function ProfileSettings() {
  return (
    <>
      <Navbar />
      <div className="wrapper">
        <div className="mainSection">
          <h1>Profile Settings</h1>
          <div className={styles.options}>
            <div>
              <Link to="/change-password">
                <Button>Change Password</Button>
              </Link>
            </div>
            <div>
              <Button variant="delete">Delete Profile</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
