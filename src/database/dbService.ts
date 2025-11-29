import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';
import {createProductTable, insertSampleProducts} from './productData';
import { createCategoryTable, insertSampleCategories } from './categoryData';
import { createUserTable, insertSampleUsers } from './userData';
import { createOrderTable, insertSampleOrders } from './orderData';
import { createCartTable, insertSampleCart } from './cartData';

SQLite.enablePromise(true);

export const getDbConnection = async () => {
  return SQLite.openDatabase({ name: 'clothing_app.db', location: 'default' });
};

export const createTables = async (db: SQLiteDatabase) => {
  await createCategoryTable(db);
  await createProductTable(db);
  await createUserTable(db);
  await createOrderTable(db);
  await createCartTable(db);
};

export const insertSampleDb = async (db: SQLiteDatabase) => {
  await insertSampleCategories(db);
  await insertSampleProducts(db);
  await insertSampleUsers(db);
  await insertSampleOrders(db);
  await insertSampleCart(db);
};

