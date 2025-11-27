import { Product } from './src/type/ProductType';
import AppRoute from './src/component/StackRoute';
import { UserType } from './src/type/UserType';
import { useEffect, useState } from 'react';
import { AuthContext } from './src/component/AuthContext';

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

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <AppRoute />
    </AuthContext.Provider>
  );
}

export default App;
