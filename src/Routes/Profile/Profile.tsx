import { useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import UserIcon from "../../assets/icons/user-icon.svg";
import { EnsembleCard } from "../../components/EnsembleCard/EnsembleCard";
import styles from "./Profile.module.css";
import { PostCard } from "../../components/PostCard/PostCard";
import { User, useUser } from "../../context/UserContext";

// after logging the data of the response we declare new types to make the state of each data type safe

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
  instrument: string;
};

export function Profile() {
  const { user } = useUser(); // Access user from context
  const navigate = useNavigate(); // Redirect if user is not logged in
  const [ensembles, setEnsembles] = useState<Ensemble[]>([]);

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Redirect to login if user is not authenticated
    if (!user) {
      navigate("/sign-in");
      return;
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Retrieve JWT from local storage
        if (!token) {
          alert("User not authenticated");
          throw new Error("User not authenticated");
        }
        const [ensemblesData, postData] = await Promise.all([
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

        // logging the data to declare new types based on them and make the state of each data type safe

        // console.log(userData);
        // console.log(ensemblesData);
        // console.log(postData);

        setPosts(postData);
        setEnsembles(ensemblesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user, navigate]); // the effect re-runs whenever the user or navigate value changes

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleAddInstrument = () => {
    navigate("/add-intrument");
  };
  const handleCreatePost = () => {
    navigate("/create-post");
  };

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
            <h3>Instruments</h3>
            <Button size="auto" variant="secondary" onClick={handleAddInstrument}>
              Add instrumnet
            </Button>
            <p>
              {user.instrument?.map((instrument) => (
                <div>
                  <p>{instrument.name}</p>
                  <p>{instrument.genre}</p>
                </div>
              ))}
            </p>
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
            <Button size="auto" variant="secondary" onClick={handleCreatePost}>
              Create a post
            </Button>
            <div className={styles.infoSectionCards}>
              {posts?.map((post) => (
                <PostCard
                  variant="view"
                  key={post._id}
                  title={post.title}
                  author={post.user?.fullName} // Updated to access populated user
                  instrument={post.instrument.length > 0 ? post.instrument : "No instrument"}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
