import { createContext } from "react";
import { IUser } from "../../interfaces";

interface contextProps {
  isLoggedIn: boolean;
  user?: IUser;

  loginUser: (password: string, email: string) => Promise<boolean>;
  registerUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<{
    hasError: boolean;
    message?: string;
  }>;
  logout: () => void;
}

export const AuthContext = createContext({} as contextProps);
