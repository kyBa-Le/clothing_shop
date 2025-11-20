
import Home from './src/page/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Category from './src/page/Category';
import UserLayout from './src/layout/UserLayout';
import SignUp from './src/page/SignUp';

export type RootStackParamList = {
  Home: undefined;
  Category: undefined;
  SignUp: undefined;
}

function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer> 
        <UserLayout>
          <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Category" component={Category} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }} />
          </Stack.Navigator>
        </UserLayout>
    </NavigationContainer>
  );
}

export default App;
