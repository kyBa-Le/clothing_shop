import { createContext } from "react";
import { UserType } from "../type/UserType";

export const AuthContext = createContext<{
    user: UserType | null;
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}>({
    user: null,
    setUser: () => {},
});