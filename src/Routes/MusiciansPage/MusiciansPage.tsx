import Navbar from "../../components/Navbar/Navbar";
import { User } from "../../types/global";
import { useState, useEffect } from "react";

export function MusiciansPage() {
  const [musicians, setMusicians] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchMusicians() {
      try {
        const response = await fetch("/api/users");
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

    fetchMusicians();
  }, []);

  if (loading) {
    return <div>Loading musicians...</div>;
  }
  return (
    <>
      <Navbar />
      <div className="wrapper">
        <div className="mainSection">
          <h1>Musicians</h1>
          <ul>
            {musicians.map((musician) => (
              <li key={musician?._id}>
                <h2>{musician?.fullName}</h2>
                <ul>
                  {musician?.instrument.map((instrument) => (
                    <li key={instrument._id}>
                      <p>
                        <strong>Instrument:</strong> {instrument.name}
                      </p>
                      <p>
                        <strong>Genres:</strong>
                      </p>
                      <ul>
                        {instrument.genre?.map((genre, index) => (
                          <li key={index}>{genre}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
