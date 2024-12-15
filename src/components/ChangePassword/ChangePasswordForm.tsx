import React, { useState } from "react";
import styles from "./ChangePasswordForm.module.css";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { useNavigate } from "react-router-dom";

export function ChangePasswordForm() {
  const navigate = useNavigate();
  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Array<{ field: string; message: string }>>([]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const validateForm = () => {
    const validationErrors = [];
    if (passwordData.password.length < 6) {
      validationErrors.push({
        field: "password",
        message: "Password must be at least 6 characters long.",
      });
    }
    if (passwordData.password !== passwordData.confirmPassword) {
      validationErrors.push({
        field: "confirmPassword",
        message: "Passwords do not match.",
      });
    }
    return validationErrors;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors = validateForm();

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

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
          password: passwordData.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Password updated successfully:", data);
        setPasswordData({ password: "", confirmPassword: "" });
        setErrors([]);
        navigate("/profile");
      } else {
        setErrors([{ field: "form", message: data.message || "Error updating password." }]);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      // setErrors([{ field: "form", message: "An error occurred. Please try again later." }]);
      console.log(error);
    }
  };

  const findError = (fieldName: string) => {
    return errors.find((error) => error.field === fieldName)?.message;
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.h1}>Change Password</h1>

      <Input
        type="password"
        label="Password"
        name="password"
        placeholder="Enter new password"
        value={passwordData.password}
        onChange={handleOnChange}
        error={findError("password")}
      />

      <Input
        type="password"
        label="Confirm Password"
        name="confirmPassword"
        placeholder="Re-enter new password"
        value={passwordData.confirmPassword}
        onChange={handleOnChange}
        error={findError("confirmPassword")}
      />

      {findError("form") && <span className={styles.error}>{findError("form")}</span>}

      <Button type="submit">Update Password</Button>
    </form>
  );
}
