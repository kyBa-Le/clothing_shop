import { SQLiteDatabase } from "react-native-sqlite-storage";
import { CartItemType } from "../type/CartItemType";
import { ProductColor, ProductSize } from "../type/ProductType";

const sampleCart: Omit<CartItemType, "id">[] = [
    {
        user_id: 4,
        product_id: 1,
        color: ProductColor.BLACK,
        size: ProductSize.M,
        quantity: 2,
    },
    {
        user_id: 4,
        product_id: 2,
        color: ProductColor.BROWN,
        size: ProductSize.L,
        quantity: 1,
    },
];

export const createCartTable = async (db: SQLiteDatabase) => {
    await db.executeSql(`
        CREATE TABLE IF NOT EXISTS cart (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            color TEXT NOT NULL,
            size TEXT NOT NULL,
            quantity INTEGER NOT NULL
        )
    `);
};

// Insert sample cart items
export const insertSampleCart = async (db: SQLiteDatabase) => {
    const existing = await db.executeSql("SELECT COUNT(*) AS count FROM cart");
    const count = existing[0].rows.item(0).count;

    if (count === 0) {
        for (const item of sampleCart) {
            await db.executeSql(
                `INSERT INTO cart (user_id, product_id, color, size, quantity)
                 VALUES (?, ?, ?, ?, ?)`,
                [item.user_id, item.product_id, item.color, item.size, item.quantity]
            );
        }
    }
};