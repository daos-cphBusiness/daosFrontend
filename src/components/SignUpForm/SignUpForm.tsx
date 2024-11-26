import styles from "./SignUpForm.module.css";
import { useState } from "react";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

export function SignUpForm() {
  const [newUserData, setNewUserData] = useState({
    email: "",
    username: "",
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

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: newUserData.email,
          username: newUserData.username,
          password: newUserData.password,
        }),
      });
      const data = await response.json();
      console.log("Response:", data);
      if (response.ok) {
        setNewUserData({ email: "", username: "", password: "", confirmPassword: "" });
        setErrors([]);
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
        label="Username"
        name="username"
        placeholder="username"
        error={findError("username")}
        value={newUserData.username}
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

      <Button type="submit">Sign Up</Button>
    </form>
  );
}
