import styles from "./postsPage.module.css";
import { useState, useEffect } from "react";
import { PostCard } from "../../components/PostCard/PostCard.tsx";
import Navbar from "../../components/Navbar/Navbar.tsx";
import { User } from "../../types/global.ts";

export function PostsPage() {
  const [posts, setposts] = useState<
    { title: string; user: User; instrument: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchposts() {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        console.log(data);
        setposts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchposts();
  }, []);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <h1>Posts</h1>
        <div className={styles.postsList}>
          {posts.map((post) => (
            <PostCard
              variant="view"
              title={post.title}
              author={post.user?.username}
              instrument={post.instrument}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
