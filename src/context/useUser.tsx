import { useContext } from "react";
import { UserContext } from "./UserContext";

export function useUser() {
    const user = useContext(UserContext);
    if (user === undefined) {
      throw new Error("useUser must be used within a UserProvider");
    }
    return user;
  }