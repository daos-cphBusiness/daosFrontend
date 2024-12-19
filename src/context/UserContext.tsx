import { createContext, useState, ReactNode, useContext } from "react";
import { User } from "../types/global";

// Define the shape of the user object

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
};

 const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useState<User>(null);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

export function useUser() {
  const user = useContext(UserContext);
  if (user === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return user;
}
