import styles from "./EnsemblesPage.module.css";
import { useState, useEffect } from "react";
import { EnsembleCard } from "../../components/EnsembleCard/EnsembleCard.tsx";
import Navbar from "../../components/Navbar/Navbar.tsx";

export function EnsemblesPage() {
  const [ensembles, setEnsembles] = useState<{ id: string; name: string; description: string }[]>(
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

  return (
    <div>
      <Navbar />

      <div className={styles.ensembleList}>
        {ensembles.map((ensemble) => (
          <EnsembleCard
            key={ensemble.id}
            title={ensemble.name}
            description={ensemble.description}
          />
        ))}
      </div>
    </div>
  );
}
