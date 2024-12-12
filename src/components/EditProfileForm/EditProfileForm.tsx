import styles from "./EditProfileForm.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

export function EditProfileForm() {
  const navigate = useNavigate(); // React Router's navigate hook
  const [newProfileData, setNewProfileData] = useState({
    firstName: "",
    lastName: "",
    description: "",
    email: "",
  });

  const [errors, setErrors] = useState<
    Array<{
      field: string;
      message: string;
    }>
  >([]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewProfileData({ ...newProfileData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("authToken"); // Retrieve JWT from local storage
      if (!token) {
        alert("User not authenticated");
        throw new Error("User not authenticated");
      }
      const response = await fetch("/api/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },
        body: JSON.stringify({
          fullName: `${newProfileData.firstName} ${newProfileData.lastName}`,
          email: newProfileData.email,
        }),
      });
      const data = await response.json();
      console.log("Response:", data);
      if (response.ok) {
        setNewProfileData({ firstName: "", lastName: "", description: "", email: "" });
        setErrors([]);

        // Redirect to profile page
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
      <h1>Edit your profile</h1>

      <Input
        type="text"
        label="First name"
        name="firstName"
        placeholder="first name"
        error={findError("firstNname")}
        value={newProfileData.firstName}
        onChange={handleOnChange}
      />
      <Input
        type="text"
        label="Last name"
        name="lastName"
        placeholder="last name"
        error={findError("lastName")}
        value={newProfileData.lastName}
        onChange={handleOnChange}
      />
      <Input
        type="text"
        label="Description"
        name="description"
        placeholder="description"
        error={findError("description")}
        value={newProfileData.description}
        onChange={handleOnChange}
      />
      <Input
        type="text"
        label="Email"
        name="email"
        placeholder="email"
        error={findError("email")}
        value={newProfileData.email}
        onChange={handleOnChange}
      />

      <Button type="submit">Save</Button>
    </form>
  );
}
