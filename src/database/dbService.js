import SQLite from 'react-native-sqlite-storage';
import {productsData} from './productData';

SQLite.enablePromise(true);

export const getDbConnection = async () => {
  return SQLite.openDatabase({ name: 'clothing_app.db', location: 'default' });
};

export const createTables = async (db) => {
  const query = await db.executeSql(
    'CREATE TABLE IF NOT EXISTS products (id INTEGER AUTO INCREMENT PRIMARY KEY, name TEXT NOT NULL, price DOUBLE NOT NULL, image TEXT NOT NULL);',
  );
  console.log("Create table: ", query);
};

export const insertSampleDb = async db => {
  const existing = await db.executeSql(
    'SELECT COUNT(*) as count FROM products',
  );
  console.log("This is count ", existing);
  const count = existing[0].rows.item(0).count;

  if (count === 0) {
    for (const element of productsData) {
      await db.executeSql(
        'INSERT INTO products (name, price, image) VALUES (?, ?, ?)',
        [element.name, element.price, element.image],
      );
    }
  }
};

export const getProducts = async db => {
  const results = await db.executeSql('SELECT * FROM products');
  const products = [];
  results.forEach(result => {
    for (let i = 0; i < result.rows.length; i++) {
      products.push(result.rows.item(i));
    }
  });
  return products;
};
