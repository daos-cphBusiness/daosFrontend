import { useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import UserIcon from "../../assets/icons/user-icon.svg";
import { EnsembleCard } from "../../components/EnsembleCard/EnsembleCard";
import styles from "./Profile.module.css";
import { PostCard } from "../../components/PostCard/PostCard";

// after logging the data of the response we declare new types to make the state of each data type safe

type Instrument = {
  name: string;
  genre: string[];
};

type User = {
  _id: string;
  fullName: string;
  description: string;
  username: string;
  password: string;
  email: string;
  instrument: Instrument[];
};

type Ensemble = {
  _id: string;
  name: string;
  description: string;
  genre: string[];
  users: string[];
};

type Post = {
  _id: string;
  title: string;
  description: string;
  user: User;
  instrument: Instrument[];
};

export function Profile() {
  const [user, setUser] = useState<{ fullName: string; description: string } | null>(null);
  // const [ensembles, setEnsembles] = useState<{ _id: string; name: string; description: string }[]>(
  //   []
  // );
  const [ensembles, setEnsembles] = useState<Ensemble[]>([]);

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Retrieve JWT from local storage
        if (!token) {
          alert("User not authenticated");
          throw new Error("User not authenticated");
        }
        const [userData, ensemblesData, postData] = await Promise.all([
          fetch(`/api/users/user`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }).then((res) => res.json()),
          fetch(`/api/ensembles/myEnsembles`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }).then((res) => res.json()),
          fetch(`/api/posts/myPosts`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }).then((res) => res.json()),
        ]);

        // logging the data here helps declare new types to make the state of each data type safe

        console.log(userData);
        console.log(ensemblesData);
        console.log(postData);
        
        setPosts(postData);
        setUser(userData);
        setEnsembles(ensemblesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
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
            <div className={styles.infoSectionCards}>
              {posts?.map((post) => (
                <PostCard
                  variant="view"
                  key={post._id}
                  title={post.title}
                  author={post.user.fullName} // Updated to access populated user
                  instrument={
                    post.instrument.length > 0 ? post.instrument[0].name : "No instrument"
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
