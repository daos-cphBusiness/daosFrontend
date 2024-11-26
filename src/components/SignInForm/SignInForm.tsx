import styles from "./SignInForm.module.css";
import { useState } from "react";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

export function SignInForm() {
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
      const response = await fetch("http://127.0.0.1:3000/auth/login", {
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
        setUserData({ username: "", password: "" });
        setErrors([]);
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
// import styles from "./SignInForm.module.css";
// import { useState } from "react";
// import { Input } from "../Input/Input";
// import { Button } from "../Button/Button";

// export function SignInForm() {
//   const [userData, setUserData] = useState({
//     username: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState<
//     Array<{
//       field: string;
//       message: string;
//     }>
//   >([]);

//   const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setUserData({ ...userData, [name]: value });
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     try {
//       const response = await fetch("http://127.0.0.1:3000/users", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username: userData.username,
//           password: userData.password,
//         }),
//       });
//       const data = await response.json();
//       console.log("Response:", data);
//       if (response.ok) {
//         setUserData({ username: "", password: "" });
//         setErrors([]);
//       } else {
//         setErrors(data.message);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const findError = (fieldName: string) => {
//     return errors.find((error: { field: string }) => error.field === fieldName)?.message;
//   };

//   return (
//     <form className={styles.form} onSubmit={handleSubmit}>
//       <h1 className={styles.h1}>Sign in</h1>

//       <Input
//         type="text"
//         label="Username"
//         name="username"
//         placeholder="username"
//         error={findError("username")}
//         value={userData.username}
//         onChange={handleOnChange}
//       />

//       <Input
//         type="password"
//         label="Password"
//         name="password"
//         error={findError("password")}
//         placeholder="password"
//         value={userData.password}
//         onChange={handleOnChange}
//       />

//       <Button type="submit">Sign In</Button>
//     </form>
//   );
// }
