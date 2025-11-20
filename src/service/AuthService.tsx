import { Alert } from "react-native";
import { getUser, getUserById } from "./UserService";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (username: string, password: string) => {
    const user = await getUser({username, password});
    if (user) {
        await AsyncStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user.id));
        await AsyncStorage.setItem(LOGGED_IN_ROLE_KEY, user.role);
    } else {
        Alert.alert("Lỗi đăng nhập", "Tên đăng nhập hoặc mật khẩu không đúng.");
        return null;
    }
}

export const isUserLoggedIn = async (): Promise<boolean> => {
    const userId = await AsyncStorage.getItem(LOGGED_IN_USER_KEY);
    if (!userId) return false;
    const user = await getUserById(Number(userId));
    console.log("Logged in user:", user);
    if(user) {
        return true;
    }
    return false;
}

export const logout = async () => {
    await AsyncStorage.removeItem(LOGGED_IN_USER_KEY);
    await AsyncStorage.removeItem(LOGGED_IN_ROLE_KEY);
    Alert.alert("Đăng xuất thành công!");
}

export const LOGGED_IN_USER_KEY = 'loggedInUser';
export const LOGGED_IN_ROLE_KEY = 'userRole';