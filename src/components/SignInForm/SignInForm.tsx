import styles from "./SignInForm.module.css";
import { useState } from "react";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export function SignInForm() {
  const navigate = useNavigate(); // React Router's navigate hook
  const { setUser } = useUser(); // Access the setUser function from UserContext
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<
    Array<{
      field: string;
      message: string;
    }>
  >([]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userData.username,
          password: userData.password,
        }),
      });
      const data = await response.json();
      console.log("Response:", data);
      if (response.ok) {
        // Save token to local storage
        localStorage.setItem("authToken", data.access_token);

        // Update the UserContext with the decoded user info

        setUser({
          username: data.user.username,
          firstName: data.user.fullName.split(" ")[0],
          lastName: data.user.fullName.split(" ")[1],
          email: data.user.email,
          description: data.user.description,
        });
        console.log()

        // Reset form and errors
        setUserData({ username: "", password: "" });
        setErrors([]);

        // Redirect to front page
        navigate("/");
      } else {
        if (Array.isArray(data.message)) {
          setErrors(data.message);
          return;
        }
        alert(`${data.message}\nIncorrect password or user name`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const findError = (fieldName: string) => {
    console.log("errors", errors);
    return errors?.find((error: { field: string }) => error.field === fieldName)?.message;
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.h1}>Sign in</h1>

      <Input
        type="text"
        label="Username"
        name="username"
        placeholder="username"
        error={findError("username")}
        value={userData.username}
        onChange={handleOnChange}
      />

      <Input
        type="password"
        label="Password"
        name="password"
        error={findError("password")}
        placeholder="password"
        value={userData.password}
        onChange={handleOnChange}
      />

      <Button type="submit">Sign In</Button>
    </form>
  );
}
