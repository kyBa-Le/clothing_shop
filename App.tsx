import { Product } from './src/type/ProductType';
import AppRoute from './src/component/StackRoute';
import { UserType } from './src/type/UserType';
import { useEffect, useState } from 'react';
import { AuthContext } from './src/component/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGGED_IN_USER_KEY } from './src/service/AuthService';

export type RootStackParamList = {
  Main: undefined;
  Category: undefined;
  SignUp: undefined;
  Login: undefined;
  Search: { searchQuery: string };
  Detail: { item: Product };
  Admin: undefined;
}

function App() {
  const [user, setUser] = useState<UserType | null>(null);
  
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem(LOGGED_IN_USER_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <AppRoute />
    </AuthContext.Provider>
  );
}

export default App;
