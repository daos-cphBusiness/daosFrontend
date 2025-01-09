import { createContext} from "react";
import { User } from "../types/global";

// Define the shape of the user object

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
};

 export const UserContext = createContext<UserContextType | undefined>(undefined);



