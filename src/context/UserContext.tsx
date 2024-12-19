import { createContext, useState, ReactNode, useContext } from "react";

// Define the shape of the user object
export type User = {
  username: string;
  fullName: string;
  description: string;
  email: string;
  instrument?: Instrument;
} | null;

export type Instrument = [
  {
    name: string;
    genre: string[];
  }
];

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useState<User>(null);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

export function useUser() {
  const user = useContext(UserContext);
  if (!user) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return user;
}
