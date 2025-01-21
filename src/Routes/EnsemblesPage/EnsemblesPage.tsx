import styles from "./EnsemblesPage.module.css";
import { useState, useEffect } from "react";
import { EnsembleCard } from "../../components/EnsembleCard/EnsembleCard.tsx";
import Navbar from "../../components/Navbar/Navbar.tsx";

export function EnsemblesPage() {
  const [ensembles, setEnsembles] = useState<
    { _id: string; name: string; genre: string; description: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchEnsembles() {
      try {
        const response = await fetch("/api/ensembles");
        if (!response.ok) {
          throw new Error("Failed to fetch ensembles");
        }
        const data = await response.json();
        setEnsembles(data);
      } catch (error) {
        console.error("Error fetching ensembles:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEnsembles();
  }, []);

  if (loading) {
    return <div>Loading ensembles...</div>;
  }
  const handleButtonClick = async (ensembleId: string) => {
    try {
      const token = localStorage.getItem("authToken"); // Retrieve JWT from local storage
      if (!token) {
        alert("User not authenticated");
        throw new Error("User not authenticated");
      }

      const response = await fetch(`/api/ensembles/${ensembleId}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("You have joined the ensemble");
        console.log("User linked successfully:", data);
      }

      if (!response.ok) {
        alert(`${data.message}`);
      }

      const result = await response.json();
      alert(`You are now part of ${result.name}`);
      console.log("User linked successfully:", result);
    } catch (error) {
      console.error("Error linking user to ensemble:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <h1>Ensembles</h1>
        <div className={styles.ensembleList}>
          {ensembles.map((ensemble) => (
            <EnsembleCard
              key={ensemble._id}
              variant="join"
              title={ensemble.name}
              genre={
                ensemble.genre && ensemble.genre.length > 0
                  ? ensemble.genre[0]
                  : "Unknown"
              } // Safe fallback
              description={ensemble.description}
              onClick={() => handleButtonClick(ensemble._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
