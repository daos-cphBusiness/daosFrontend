import styles from "./EnsembleForm.module.css";
import { useState } from "react";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { useNavigate } from "react-router-dom";

export function EnsembleForm() {
  const navigate = useNavigate(); // React Router's navigate hook
  const [newEnsembleData, setNewEnsembleData] = useState({
    name: "",
    description: "",
    genre: "",
  });

  const [errors, setErrors] = useState<
    Array<{
      field: string;
      message: string;
    }>
  >([]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewEnsembleData({ ...newEnsembleData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/ensembles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newEnsembleData.name,
          description: newEnsembleData.description,
          genre: newEnsembleData.genre,
        }),
      });
      const data = await response.json();
      console.log("Response:", data);
      if (response.ok) {
        setNewEnsembleData({ name: "", description: "", genre: "" });
        setErrors([]);

        // Redirect to front page
        navigate("/ensembles");
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
      <h1 className={styles.h1}>Create an ensemble</h1>

      <Input
        type="text"
        label="Ensemble name"
        name="name"
        placeholder="ensemble name"
        error={findError("name")}
        value={newEnsembleData.name}
        onChange={handleOnChange}
      />
      <Input
        type="text"
        label="Description"
        name="description"
        placeholder="description"
        error={findError("description")}
        value={newEnsembleData.description}
        onChange={handleOnChange}
      />
      <Input
        type="text"
        label="Genre"
        name="genre"
        placeholder="genre"
        error={findError("genre")}
        value={newEnsembleData.genre}
        onChange={handleOnChange}
      />

      <Button type="submit">Create</Button>
    </form>
  );
}
