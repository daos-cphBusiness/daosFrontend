import { useState } from "react";
import "./App.css";
import { Button } from "./components/Button/Button";
import { Input } from "./components/Input/Input.tsx";

function App() {
  const [newUserData, setNewUserData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<any>([]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUserData({ ...newUserData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:3000/users", {
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
    return errors.find((error: { field: string }) => error.field == fieldName)?.message;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>

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

        <Button variant="primary" size="default" type="submit" label="Register" />
      </form>

      {/* <div className="test">
        <Button variant="primary" size="default" label="Primary" onClick={handleOnClick} />
        <Button variant="secondary" size="default" label="Secondary" onClick={handleOnClick} />
        <Button variant="primary" size="default" label="Default size" onClick={handleOnClick} />
        <Button variant="primary" size="auto" label="Auto size" onClick={handleOnClick} />
      </div>
      <br />
      <br />
      <br /> */}
    </>
  );
}

export default App;
