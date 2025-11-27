
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Product } from './src/type/ProductType';
import AppRoute from './src/component/StackRoute';

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
  const Stack = createNativeStackNavigator<RootStackParamList>();
  
  return (
    <AppRoute />
  );
}

export default App;
