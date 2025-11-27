import { getUser } from "./UserService";
import { UserType } from "../type/UserType";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (username: string, password: string) => {
    const user = await getUser({username, password});
    if (user != null) {
        await AsyncStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user));
    }
    return user;
}

export const logout = async ({setUser}: {setUser: React.Dispatch<React.SetStateAction<UserType | null>>}) => {
    await AsyncStorage.removeItem(LOGGED_IN_USER_KEY);
    setUser(null);
}

export const LOGGED_IN_USER_KEY = "loggedInUser";