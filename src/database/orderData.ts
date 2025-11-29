import { SQLiteDatabase } from "react-native-sqlite-storage";
import { OrderType } from "../type/OrderType";
import { ProductColor, ProductSize } from "../type/ProductType";

const sampleOrders: Omit<OrderType, 'id'>[] = [
    {
        name: "string",
        product_id: 1,
        user_id: 4,
        size: ProductSize.M,
        color: ProductColor.BLACK,
        status: "pending",
        date: "15/04/2025",
        quantity: 3,
        total: 3,
        address: "string",
        phone: "0869110503"
    },
]

export const createOrderTable = async (db: SQLiteDatabase) => {
    await db.executeSql(`
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            product_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            size TEXT NOT NULL,
            color TEXT NOT NULL,
            status TEXT NOT NULL,
            date TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            total REAL NOT NULL,
            address TEXT NOT NULL,
            phone TEXT NOT NULL
        )
    `);
};


export const insertSampleOrders = async (db: SQLiteDatabase) => {
    const existing = await db.executeSql(
        "SELECT COUNT(*) AS count FROM orders"
    );

    const count = existing[0].rows.item(0).count;
    console.log("Existing order count:", count);

    if (count === 0) {
        for (const element of sampleOrders) {
            await db.executeSql(
                `INSERT INTO orders 
                (name, product_id, user_id, size, color, status, date, quantity, total, address, phone)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    element.name,
                    element.product_id,
                    element.user_id,
                    element.size,
                    element.color,
                    element.status,
                    element.date,
                    element.quantity,
                    element.total,
                    element.address,
                    element.phone
                ]
            );
        }
    }
};
