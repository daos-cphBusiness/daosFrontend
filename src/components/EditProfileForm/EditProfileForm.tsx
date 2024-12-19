import styles from "./EditProfileForm.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { useUser } from "../../context/UserContext";

export function EditProfileForm() {
  const navigate = useNavigate();
  const { setUser, user } = useUser(); // Get the setUser function from UserContext
  const [newProfileData, setNewProfileData] = useState({
    firstName: user?.fullName.split(" ")[0],
    lastName: user?.fullName.split(" ")[1],
    description: user?.description,
    email: user?.email,
  });

  const [errors, setErrors] = useState<Array<{ field: string; message: string }>>([]);

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
          description: newProfileData.description,
        }),
      });
      const data = await response.json();
      console.log("Response:", data);
      if (response.ok) {
        // Reset form and errors
        setNewProfileData({ firstName: "", lastName: "", description: "", email: "" });
        setErrors([]);

        // Update the global user state using setUser
        setUser({
          username: data.username,
          fullName: data.fullName,
          email: data.email,
          description: data.description,
        });

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
