import { getUser } from "./UserService";
import { UserType } from "../type/UserType";

export const login = async (username: string, password: string) => {
    const user = await getUser({username, password});
    return user;
}

export const logout = async ({setUser}: {setUser: React.Dispatch<React.SetStateAction<UserType | null>>}) => {
    setUser(null);
}