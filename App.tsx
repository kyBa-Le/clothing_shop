import { Product } from './src/type/ProductType';
import AppRoute from './src/component/StackRoute';
import { UserType } from './src/type/UserType';
import { useEffect, useState } from 'react';
import { AuthContext } from './src/component/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGGED_IN_USER_KEY } from './src/service/AuthService';
import { createTables, getDbConnection, insertSampleDb } from './src/database/dbService';

export type RootStackParamList = {
  Main: undefined;
  Category: undefined;
  SignUp: undefined;
  Login: undefined;
  Search: { searchQuery: string };
  Detail: { item: Product };
  AdminTab: undefined;
  ProductManagement: undefined;
  CategoryManagement: undefined;
  UserManagement: undefined;
  OrderManagement: undefined
}

function App() {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const initDb = async () => {
      const db = await getDbConnection();
      await createTables(db);
      await insertSampleDb(db);
    }
    initDb();
  }, []);
  
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
