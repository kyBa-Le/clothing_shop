import { useEffect, useState } from "react";
import { UserType } from "../type/UserType";
import { NavigationContainer } from "@react-navigation/native";
import UserLayout from "../layout/UserLayout";
import { RootStackParamList } from "../../App";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../page/Login";
import SignUp from "../page/SignUp";
import BottomTab from "./BottomTab";
import Search from "../page/Search";
import ProductDetails from "../page/ProductDetails";
import Admin from "../page/Admin";
import { Screen } from "react-native-screens";
import { isUserLoggedIn } from "../service/AuthService";

const UserRoute = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    return (
        <UserLayout>
            <Stack.Navigator initialRouteName='Main'>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                <Stack.Screen name="Main" component={BottomTab} options={{ headerShown: false }} />
                <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
                <Stack.Screen name="Detail" component={ProductDetails} options={{ headerShown: false }} />
            </Stack.Navigator>
        </UserLayout>
    )
}

const AdminRoute = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    return (
        <Stack.Navigator initialRouteName='Admin'>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
            <Stack.Screen name="Admin" component={Admin} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const AppRoute = () => {
    const [user, setUser] = useState<UserType | null>(null);
    
        useEffect(() => {
            const getLoggedInUser = async () => {
                const result = await isUserLoggedIn();
                setUser(result);
            };
            getLoggedInUser();
        }, []);
    return (
        <NavigationContainer>
            {
                user?.role === 'admin' ? <AdminRoute /> : <UserRoute />
            }
        </NavigationContainer>
    )
}

export default AppRoute;