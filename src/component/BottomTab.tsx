import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../page/Home';
import Category from '../page/Category';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName: string = '';

                    switch (route.name) {
                        case 'Home':
                            iconName = 'house';
                            break;
                        case 'Category':
                            iconName = 'list';
                            break;
                        default:
                            iconName = 'circle-question';
                    }

                    return <FontAwesome6Icon name={iconName as any} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Category" component={Category} />
        </Tab.Navigator>
    );
}

export default BottomTab;