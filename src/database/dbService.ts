import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';
import {createProductTable, insertSampleProducts} from './productData';
import { Product } from '../type/ProductType';
import { createCategoryTable, insertSampleCategories } from './categoryData';

SQLite.enablePromise(true);

export const getDbConnection = async () => {
  return SQLite.openDatabase({ name: 'clothing_app.db', location: 'default' });
};

export const createTables = async (db: SQLiteDatabase) => {
  await createCategoryTable(db);
  await createProductTable(db);
};

export const insertSampleDb = async (db: SQLiteDatabase) => {
  await insertSampleCategories(db);
  await insertSampleProducts(db);
};

