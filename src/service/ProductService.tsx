import { getDbConnection } from "../database/dbService";
import { Product } from "../type/ProductType";

export const getProducts = async () => {
    const db = await getDbConnection();
    const results = await db.executeSql('SELECT * FROM products');
    const products: Product[] = [];
    results.forEach(result => {
        for (let i = 0; i < result.rows.length; i++) {
            products.push(result.rows.item(i));
        }
    });
    return products;
};

export const getProductsByCategory = async (categoryId: number) => {
    const db = await getDbConnection();
    const results = await db.executeSql('SELECT * FROM products WHERE category_id = ?;', [categoryId]);
    const products: Product[] = [];
    results.forEach(result => {
        for (let i = 0; i < result.rows.length; i++) {
            products.push(result.rows.item(i));
        }
    });
    console.log("Fetched products by category ", categoryId, products);
    return products;
};