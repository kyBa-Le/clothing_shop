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

export const searchProductsByName = async (searchQuery: string) => {
    const db = await getDbConnection();
    const results = await db.executeSql('SELECT * FROM products WHERE name LIKE ?;', [`%${searchQuery}%`]);
    const products: Product[] = [];
    results.forEach(result => {
        for (let i = 0; i < result.rows.length; i++) {
            products.push(result.rows.item(i));
        }
    });
    return products;
};

export const addProduct = async (product: Product) => {
    const db = await getDbConnection();
    const { name, price, category_id, image } = product;
    await db.executeSql(
        `INSERT INTO products (name, price, category_id, image) VALUES (?, ?, ?, ?)`,
        [name, price, category_id, image]
    );
};

export const updateProduct = async (product: Product) => {
    const db = await getDbConnection();
    const { id, name, price, category_id } = product;
    await db.executeSql(
        `UPDATE products SET name = ?, price = ?, category_id = ? WHERE id = ?`,
        [name, price, category_id, id]
    );
};


export const deleteProduct = async (productId: number) => {
    console.log("Deleting product with ID:", productId);
    const db = await getDbConnection();
    await db.executeSql(
        `DELETE FROM products WHERE id = ?`,
        [productId]
    );
};

export const getProductById = async (id: number) => {
    const db = await getDbConnection();
    const results = await db.executeSql(
        `SELECT * FROM products WHERE id = ?`,
        [id]
    )
    const products: Product[] = [];
    results.forEach(result => {
        for (let i = 0; i < result.rows.length; i++) {
            products.push(result.rows.item(i));
        }
    })
    return products[0];
}