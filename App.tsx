
import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import Home from './src/page/Home';
import { useEffect, useState } from 'react';
import { createTables, getDbConnection, getProducts, insertSampleDb } from './src/database/dbService';
import { Product } from './src/type/ProductType';
import Banner from './src/component/Banner';
import NavigationBar from './src/component/NavigationBar';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const initDb = async () => {
      const db = await getDbConnection();
      await createTables(db);
      await insertSampleDb(db);
      const products = await getProducts(db);
      setProducts(products);
    }
    initDb();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent product={products} />
    </SafeAreaProvider>
  );
}

function AppContent({ product }: any) {
  return (
    <View style={styles.container}>
      <NavigationBar />
      <Banner />
      <Home products={product} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
