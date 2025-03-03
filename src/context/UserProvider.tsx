import { ReactNode, useState } from "react";
import { User } from "../types/global";
import { UserContext } from "./UserContext";
  
  export function UserProvider({ children }: { children: ReactNode }): JSX.Element {
    const [user, setUser] = useState<User>(null);
  
    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
  }