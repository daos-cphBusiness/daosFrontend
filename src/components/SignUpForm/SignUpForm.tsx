import styles from "./SignUpForm.module.css";
import { useState } from "react";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { useNavigate } from "react-router-dom";

export function SignUpForm() {
  const navigate = useNavigate(); // React Router's navigate hook
  const [newUserData, setNewUserData] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<
    Array<{
      field: string;
      message: string;
    }>
  >([]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUserData({ ...newUserData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Reset errors before validation
    setErrors([]);

    // Check if passwords match
    if (newUserData.password !== newUserData.confirmPassword) {
      setErrors([
        {
          field: "confirmPassword",
          message: "Passwords do not match.",
        },
      ]);
      return; // Stop further execution
    }

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: newUserData.email,
          username: newUserData.username,
          fullName: `${newUserData.firstName} ${newUserData.lastName}`,
          password: newUserData.password,
        }),
      });
      const data = await response.json();
      console.log("Response:", data);
      if (response.ok) {
        setNewUserData({
          email: "",
          username: "",
          firstName: "",
          lastName: "",
          password: "",
          confirmPassword: "",
        });
        setErrors([]);

        // Redirect to sign-in
        navigate("/sign-in");
      } else {
        setErrors(data.message);
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
      <h1 className={styles.h1}>Sign Up</h1>

      <Input
        type="email"
        label="Email"
        name="email"
        placeholder="example@gmail.com"
        error={findError("email")}
        value={newUserData.email}
        onChange={handleOnChange}
      />

      <Input
        type="text"
        label="User name"
        name="username"
        placeholder="username"
        error={findError("username")}
        value={newUserData.username}
        onChange={handleOnChange}
      />
      <Input
        type="text"
        label="First name"
        name="firstName"
        placeholder="first name"
        error={findError("firstName")}
        value={newUserData.firstName}
        onChange={handleOnChange}
      />
      <Input
        type="text"
        label="Last name"
        name="lastName"
        placeholder="last name"
        error={findError("lastName")}
        value={newUserData.lastName}
        onChange={handleOnChange}
      />

      <Input
        type="text"
        label="First name"
        name="firstName"
        placeholder="first name"
        error={findError("firstName")}
        value={newUserData.firstName}
        onChange={handleOnChange}
      />

      <Input
        type="text"
        label="Last name"
        name="lastName"
        placeholder="last name"
        error={findError("lastName")}
        value={newUserData.lastName}
        onChange={handleOnChange}
      />

      <Input
        type="password"
        label="Password"
        name="password"
        error={findError("password")}
        placeholder="password"
        value={newUserData.password}
        onChange={handleOnChange}
      />
      <Input
        type="password"
        label="Confirm password"
        name="confirmPassword"
        error={findError("confirmPassword")}
        placeholder="confirm password"
        value={newUserData.confirmPassword}
        onChange={handleOnChange}
      />

      <Button type="submit">Sign Up</Button>
    </form>
  );
}
