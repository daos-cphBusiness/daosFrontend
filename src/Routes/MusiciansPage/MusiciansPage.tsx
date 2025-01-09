import styles from "./MusiciansPage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { UserCard } from "../../components/UserCard/UserCard";
import { User } from "../../types/global";
import { useState, useEffect } from "react";

export function MusiciansPage() {
  const [musicians, setMusicians] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>("");

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setMusicians(data);
    } catch (error) {
      console.error("Error fetching all users:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchedUsers = async (query: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users/search?username=${query}`);
      if (!response.ok) {
        throw new Error("Failed to fetch searched users");
      }
      const data = await response.json();
      setMusicians(data);
    } catch (error) {
      console.error("Error fetching searched users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = () => {
    if (searchValue.trim()) {
      fetchSearchedUsers(searchValue);
    } else {
      fetchAllUsers();
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  // Fetch all users when the component mounts
  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <>
      <Navbar />
      <div className="wrapper">
        <div className="mainSection">
          <div className={styles.sectionTitle}>
            <h1>Musicians</h1>
            <div className={styles.search}>
              <input
                type="text"
                placeholder="Search by name"
                value={searchValue}
                onChange={handleSearchChange}
                className={styles.searchBar}
              />
              <button onClick={handleSearchClick} className={styles.searchButton}>
                Search
              </button>
            </div>
          </div>

          {loading ? (
            <div>Loading musicians...</div>
          ) : (
            <div className={styles.musiciansList}>
              {musicians.map((musician) => (
                <UserCard
                  key={musician?._id}
                  title={musician?.username}
                  instruments={musician?.instrument}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
