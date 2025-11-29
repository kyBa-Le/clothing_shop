import { useContext, useEffect } from "react";
import { NavigationContainer, NavigationProp, useNavigation } from "@react-navigation/native";
import UserLayout from "../layout/UserLayout";
import { RootStackParamList } from "../../App";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../page/Login";
import SignUp from "../page/SignUp";
import BottomTab from "./BottomTab";
import Search from "../page/Search";
import ProductDetails from "../page/ProductDetails";
import { AuthContext } from "./AuthContext";
import AdminBottomTab from "./AdminBottomTab";
import ProductManagement from "../page/ProductManagement";
import CategoryManagement from "../page/CategoryManagement";
import UserManagement from "../page/UserManagement";

const UserRoute = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    const { user } = useContext(AuthContext);
    return (
        <UserLayout>
            <Stack.Navigator initialRouteName={user != null ? "Main" : "Login"}>
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
    const { user } = useContext(AuthContext);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    
    useEffect(() => {
        if (user != null && user.role == 'admin') {
            navigation.reset({
                index: 0,
                routes: [{ name: "AdminTab" as never }],
            });
        }
    }, [user]);

    return (
        <Stack.Navigator initialRouteName={user != null ? "AdminTab" : "Login"}>
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="AdminTab" component={AdminBottomTab} options={{ headerShown: false }} />
            <Stack.Screen name="ProductManagement" component={ProductManagement} options={{ headerShown: false }} />
            <Stack.Screen name="CategoryManagement" component={CategoryManagement} options={{ headerShown: false }} />
            <Stack.Screen name="UserManagement" component={UserManagement} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const AppRoute = () => {
    const {user} = useContext(AuthContext);

    return (
        <NavigationContainer>
            {
                user != null && user.role === 'admin' ? <AdminRoute /> : <UserRoute />
            }
        </NavigationContainer>
    )
}

export default AppRoute;