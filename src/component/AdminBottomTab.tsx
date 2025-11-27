import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import Home from "../page/Home";
import Admin from "../page/Admin";
import Login from "../page/Login";
import SignUp from "../page/SignUp";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <Tab.Navigator
            screenOptions = {({route}) => ({
                tabBarIcon: ({color, size}) => {
                    let iconName: string = '';

                    switch (route.name) {
                        case 'User':
                            iconName = 'user';
                            break;
                        case 'Admin':
                            iconName = 'shield-halved';
                            break;
                        case 'Login':
                            iconName = 'door-closed';
                            break;
                        case 'SignUp':
                            iconName = 'user-plus';
                            break;
                        default:
                            iconName = 'circle-question';
                    }
                    return <FontAwesome6Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen name="User" component={Home} />
            <Tab.Screen name="Admin" component={Admin} />
            <Tab.Screen name="Login" component={Login} />
            <Tab.Screen name="SignUp" component={SignUp} />
        </Tab.Navigator>
    )
}

export default BottomTab;