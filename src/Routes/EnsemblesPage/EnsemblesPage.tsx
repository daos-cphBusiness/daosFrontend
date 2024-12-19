import styles from "./EnsemblesPage.module.css";
import { useState, useEffect } from "react";
import { EnsembleCard } from "../../components/EnsembleCard/EnsembleCard.tsx";
import Navbar from "../../components/Navbar/Navbar.tsx";



export function EnsemblesPage() {
  const [ensembles, setEnsembles] = useState<{ _id: string; name: string; description: string }[]>(
    []
  );
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

      if (!response.ok) {
        alert("Failed to link user to ensemble");
        throw new Error("Failed to link user to ensemble");
      }

      const result = await response.json();
      console.log("User linked successfully:", result);
    } catch (error) {
      console.error("Error linking user to ensemble:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <div className={styles.ensembleList}>
          {ensembles.map((ensemble) => (
            <EnsembleCard
              key={ensemble._id}
              variant="join"
              title={ensemble.name}
              description={ensemble.description}
              onClick={() => handleButtonClick(ensemble._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
