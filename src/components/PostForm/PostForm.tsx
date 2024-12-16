import styles from "./PostForm.module.css";
import { useState } from "react";
import { Input } from "../Input/Input";
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

export function PostForm() {
  const navigate = useNavigate(); // React Router's navigate hook
  const [newPostData, setNewPostData] = useState({
    ensembleName: "",
    title: "",
    description: "",
    genre: "",
    instrument: "",
  });

  const [errors, setErrors] = useState<
    Array<{
      field: string;
      message: string;
    }>
  >([]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewPostData({ ...newPostData, [name]: value });
  };

  const handleInstrumentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewPostData({ ...newPostData, instrument: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ensembleName: newPostData.ensembleName,
          title: newPostData.title,
          description: newPostData.description,
          genre: newPostData.genre,
        }),
      });
      const data = await response.json();
      console.log("Response:", data);
      if (response.ok) {
        setNewPostData({
          ensembleName: newPostData.ensembleName,
          title: newPostData.title,
          description: newPostData.description,
          genre: newPostData.genre,
          instrument: newPostData.instrument,
        });
        setErrors([]);

        // Redirect to front page
        navigate("/profile");
      } else {
        if (Array.isArray(data.message)) {
          setErrors(data.message);
          return;
        }
        alert(`${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const findError = (fieldName: string) => {
    return errors.find((error: { field: string }) => error.field === fieldName)?.message;
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.h1}>Create a post</h1>

      <div className={styles.dropdownContainer}>
        <select
          className={styles.instrumentDropdown}
          value={newPostData.instrument}
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
      </div>

      <Input
        type="text"
        label="Ensemble name (optional)"
        name="ensembleName"
        placeholder="ensemble name"
        error={findError("ensembleName")}
        value={newPostData.ensembleName}
        onChange={handleOnChange}
      />
      <Input
        type="text"
        label="Title"
        name="title"
        placeholder="title"
        error={findError("title")}
        value={newPostData.title}
        onChange={handleOnChange}
      />
      <Input
        type="text"
        label="Description"
        name="description"
        placeholder="description"
        error={findError("description")}
        value={newPostData.description}
        onChange={handleOnChange}
      />
      <Input
        type="text"
        label="Genre"
        name="genre"
        placeholder="genre"
        error={findError("genre")}
        value={newPostData.genre}
        onChange={handleOnChange}
      />

      <Button type="submit">Create</Button>
    </form>
  );
}
