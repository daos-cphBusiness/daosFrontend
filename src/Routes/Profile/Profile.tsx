import { useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import UserIcon from "../../assets/icons/user-icon.svg";
import { EnsembleCard } from "../../components/EnsembleCard/EnsembleCard";
import styles from "./Profile.module.css";
import { PostCard } from "../../components/PostCard/PostCard";

export function Profile() {
  const [user, setUser] = useState<{ fullName: string; description: string } | null>(null);
  const [ensembles, setEnsembles] = useState<{ _id: string; name: string; description: string }[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Retrieve JWT from local storage
        if (!token) {
          alert("User not authenticated");
          throw new Error("User not authenticated");
        }
        const [userData, ensemblesData] = await Promise.all([
          fetch(`/api/users/user`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include token in the Authorization header
            },
          }).then((res) => res.json()),
          fetch(`/api/ensembles/myEnsembles`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include token in the Authorization header
            },
          }).then((res) => res.json()),
        ]);
        console.log(userData);
        console.log(ensemblesData);
        setUser(userData);
        setEnsembles(ensemblesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!user) {
    return <div>Loading...</div>; // Show loading while data is fetched
  }

  return (
    <>
      <Navbar />
      <div className="wrapper">
        <div className="mainSection">
          <div className={styles.userBanner}>
            <div className={styles.userTitle}>
              <div className={styles.userIconBox}>
                <img src={UserIcon} alt="icon" />
              </div>
              <h2>{user.fullName}</h2>
            </div>
            <div className={styles.profileButtons}>
              <Link to="/edit-profile">
                <Button variant="secondary" size="regular">
                  Edit profile
                </Button>
              </Link>
              <Link to="/profile-settings">
                <Button variant="secondary" size="regular">
                  Settings
                </Button>
              </Link>
            </div>
          </div>

          <div className={styles.infoSection}>
            <h3>About</h3>
            <p>{user.description}</p>
          </div>

          <div className={styles.infoSection}>
            <h3>Ensembles</h3>
            <div className={styles.infoSectionCards}>
              {ensembles?.map((ensemble) => (
                <EnsembleCard
                  key={ensemble._id}
                  variant="view"
                  title={ensemble.name}
                  description={ensemble.description}
                />
              ))}
            </div>
          </div>

          <div className={styles.infoSection}>
            <h3>Posts</h3>

            <PostCard variant="view" author="Matias" title="Post title" instrument="Piano" />
          </div>
        </div>
      </div>
    </>
  );
}
