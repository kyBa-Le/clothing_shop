import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../page/Home';
import Category from '../page/Category';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import Profile from '../page/Profile';
import OrderHistory from '../page/OrderHistory';
import Cart from '../page/Cart';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
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
                        case "OrderHistory":
                            iconName = 'clock-rotate-left';
                            break;
                        case "Cart":
                            iconName = 'cart-arrow-down';
                            break;
                        case 'Profile':
                            iconName = 'user';
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
            <Tab.Screen name="Category" component={Category} />
            <Tab.Screen name='Profile' component={Profile} />
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name='Cart' component={Cart} />
            <Tab.Screen name='OrderHistory' component={OrderHistory} />
        </Tab.Navigator>
    );
}

export default BottomTab;