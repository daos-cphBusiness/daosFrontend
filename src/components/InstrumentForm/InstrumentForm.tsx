import styles from "./InstrumentForm.module.css";
import { useState } from "react";
import { Button } from "../Button/Button";
import { useNavigate } from "react-router-dom";

const instruments = [
  "Viola",
  "Viol",
  "Vihuela",
  "Trumpet",
  "Theorbo",
  "Slide trumpet",
  "Serpent",
  "Sackbut",
  "Bassoon",
  "Clarinet",
  "Oboe",
  "Flute",
  "Violin",
  "Cello",
  "Horn",
  "Timpani",
  "Tuba",
  "Trumpet",
  "Accordion",
  "Guitar",
  "Piano",
];

const genre = ["Classical", "Jazz", "Baroque", "Romantic", "Opera", "Choral", "Folk"];

// Define the state type
type InstrumentDataProps = {
  instrument: string;
  genre: string[];
};

export function InstrumentForm() {
  const navigate = useNavigate();
  const [newInstrumentData, setNewInstrumentData] = useState<InstrumentDataProps>({
    instrument: "",
    genre: [],
  });

  const [errors, setErrors] = useState<Array<{ field: string; message: string }>>([]);

  const handleInstrumentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewInstrumentData({ ...newInstrumentData, instrument: event.target.value });
  };

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGenre = event.target.value;
    if (!newInstrumentData.genre.includes(selectedGenre)) {
      setNewInstrumentData({
        ...newInstrumentData,
        genre: [...newInstrumentData.genre, selectedGenre],
      });
    }
  };

  const handleRemoveGenre = (genreToRemove: string) => {
    setNewInstrumentData({
      ...newInstrumentData,
      genre: newInstrumentData.genre.filter((genre) => genre !== genreToRemove),
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("User not authenticated");
        throw new Error("User not authenticated");
      }

      const response = await fetch("/api/users/instruments", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newInstrumentData.instrument,
          genre: newInstrumentData.genre,
        }),
      });

      const data = await response.json();
      console.log("Response:", data);
      if (response.ok) {
        setNewInstrumentData({ instrument: "", genre: [] });
        setErrors([]);
        navigate("/profile");
      } else {
        if (Array.isArray(data.message)) {
          setErrors(data.message);
        } else {
          alert(data.message);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const findError = (fieldName: string) => {
    return errors.find((error) => error.field === fieldName)?.message;
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.h1}>Add an Instrument</h1>

      <div className={styles.dropdownContainer}>
        <select
          className={styles.instrumentDropdown}
          value={newInstrumentData.instrument}
          onChange={handleInstrumentChange}
        >
          <option value="" disabled>
            Select an instrument
          </option>
          {instruments.map((instrument, index) => (
            <option key={index} value={instrument}>
              {instrument}
            </option>
          ))}
        </select>
        <span>{findError("instrument")}</span>
      </div>

      <div className={styles.dropdownContainer}>
        <select className={styles.genreDropdown} value="" onChange={handleGenreChange}>
          <option value="" disabled>
            Select a genre
          </option>
          {genre.map((g, index) => (
            <option key={index} value={g}>
              {g}
            </option>
          ))}
        </select>
        <span>{findError("genre")}</span>
      </div>

      <ul className={styles.genreList}>
        {newInstrumentData.genre.map((g, index) => (
          <li key={index} className={styles.genreItem}>
            {g}
            <button
              type="button"
              className={styles.removeButton}
              onClick={() => handleRemoveGenre(g)}
            >
              X
            </button>
          </li>
        ))}
      </ul>

      <Button type="submit">Create</Button>
    </form>
  );
}
