import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./ProfileSettings.module.css";

export function ProfileSettings() {
  const navigate = useNavigate();

  async function handleOnDelete(): Promise<void> {
    const confirmed = window.confirm(
      "Are you sure you want to delete your profile?"
    );
    if (confirmed) {
      try {
        const token = localStorage.getItem("authToken"); // Retrieve JWT from local storage
        if (!token) {
          alert("User not authenticated");
          throw new Error("User not authenticated");
        }
        const response = await fetch("/api/users", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          console.log("Profile deleted successfully.");
          alert("Profile deleted successfully.");
          navigate("/sign-in");
        } else {
          console.error("Failed to delete profile:", response.statusText);
          alert("Failed to delete profile. Please try again.");
        }
      } catch (error) {
        console.error("Error occurred while deleting profile:", error);
        alert("An error occurred. Please try again.");
      }
    } else {
      console.log("Delete action canceled.");
    }
  }

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
              <Button variant="delete" onClick={handleOnDelete}>
                Delete Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
