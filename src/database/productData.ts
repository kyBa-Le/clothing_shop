import { SQLiteDatabase } from "react-native-sqlite-storage";

const productsData: any = [
    {
        name: 'Áo thun trơn 1',
        price: 189000,
        image: 'https://plus.unsplash.com/premium_photo-1690820318702-06867bb1405e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category_id: 1
    },
    {
        name: 'Áo dài tay số 2',
        price: 279000,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        category_id: 2
    },
    {
        name: 'Áo dài tay số 3',
        price: 299000,
        image: 'https://images.unsplash.com/photo-1585820117003-4d6aafa444ac?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category_id: 2
    },
    {
        name: 'Quần Jeans số 4',
        price: 450000,
        image: 'https://images.unsplash.com/photo-1608366558876-185ea88608eb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category_id: 3
    },
    {
        name: 'Quần Jeans số 5',
        price: 499000,
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        category_id: 3
    },
    {
        name: 'Áo thun trơn số 6',
        price: 169000,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        category_id: 1
    },
    {
        name: 'Áo dài tay số 7',
        price: 325000,
        image: 'https://plus.unsplash.com/premium_photo-1672136996534-00298cbdb14f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category_id: 2
    },
    {
        name: 'Áo dài tay số 8',
        price: 289000,
        image: 'https://images.unsplash.com/photo-1646888000308-620e64df78fe?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category_id: 2
    },
    {
        name: 'Áo thun trơn số 9',
        price: 199000,
        image: 'https://plus.unsplash.com/premium_photo-1690038784195-ce98748c7855?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category_id: 1
    },
    {
        name: 'Quần Short số 10',
        price: 249000,
        image: 'https://images.unsplash.com/photo-1714143136361-386dae5672e2?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category_id: 4
    },
    {
        name: 'Quần Short số 11',
        price: 229000,
        image: 'https://images.unsplash.com/photo-1714143136385-c449be6760f6?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category_id: 4
    },
];

export const createProductTable = async (db: SQLiteDatabase) => {
    const query = await db.executeSql(
        'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price DOUBLE NOT NULL, image TEXT NOT NULL, category_id INTEGER, FOREIGN KEY(category_id) REFERENCES categories(id));',
    );
    console.log("Create table: ", query);
}

export const insertSampleProducts = async (db: SQLiteDatabase) => {
    const existing = await db.executeSql(
        'SELECT COUNT(*) as count FROM products;',
    );
    console.log("This is count ", existing);
    const count = existing[0].rows.item(0).count;

    if (count === 0) {
        for (const element of productsData) {
            await db.executeSql(
                'INSERT INTO products (name, price, image, category_id) VALUES (?, ?, ?, ?)',
                [element.name, element.price, element.image, element.category_id],
            );
        }
    }
}
