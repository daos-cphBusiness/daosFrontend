import styles from "./MusiciansPage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { UserCard } from "../../components/UserCard/UserCard";
import { User } from "../../types/global";
import { useState, useEffect } from "react";

export function MusiciansPage() {
  const [musicians, setMusicians] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    async function fetchMusicians(query: string = "") {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/search?username=${query}`);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setMusicians(data);
      } catch (error) {
        console.error("Error fetching musicians:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMusicians(searchValue);
  }, [searchValue]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  if (loading) {
    return <div>Loading musicians...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="wrapper">
        <div className="mainSection">
          <div className={styles.sectionTitle}>
            <h1>Musicians</h1>
            <input
              type="text"
              placeholder="Search by name"
              value={searchValue}
              onChange={handleSearchChange}
              className={styles.searchBar}
            />
          </div>

          <div className={styles.musiciansList}>
            {musicians.map((musician) => (
              <UserCard
                key={musician?._id}
                title={musician?.username}
                instruments={musician?.instrument}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
