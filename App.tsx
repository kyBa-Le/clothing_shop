
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Category from './src/page/Category';
import UserLayout from './src/layout/UserLayout';
import SignUp from './src/page/SignUp';
import Login from './src/page/Login';
import Search from './src/page/Search';
import BottomTab from './src/component/BottomTab';
import ProductDetails from './src/page/ProductDetails';
import { Product } from './src/type/ProductType';

export type RootStackParamList = {
  Main: undefined;
  Category: undefined;
  SignUp: undefined;
  Login: undefined;
  Search: { searchQuery: string };
  Detail: { item: Product };
}

function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer> 
        <UserLayout>
          <Stack.Navigator initialRouteName='Main'>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
            <Stack.Screen name="Main" component={BottomTab} options={{ headerShown: false }} />
            <Stack.Screen name="Category" component={Category} options={{ headerShown: false }} />
            <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
            <Stack.Screen name="Detail" component={ProductDetails} options={{ headerShown: false }} />
          </Stack.Navigator>
        </UserLayout>
    </NavigationContainer>
  );
}

export default App;
