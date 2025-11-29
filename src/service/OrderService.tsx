import { getDbConnection } from "../database/dbService";
import { OrderType } from "../type/OrderType";

export const getOrders = async (): Promise<OrderType[]> => {
    const db = await getDbConnection();
    const results = await db.executeSql("SELECT * FROM orders");
    const orders: OrderType[] = [];

    results.forEach(result => {
        for (let i = 0; i < result.rows.length; i++) {
            orders.push(result.rows.item(i));
        }
    });

    return orders;
};

export const getOrderById = async (id: number): Promise<OrderType | null> => {
    const db = await getDbConnection();
    const results = await db.executeSql("SELECT * FROM orders WHERE id = ?", [id]);

    if (results[0].rows.length > 0) {
        return results[0].rows.item(0);
    }

    return null;
};

export const addOrder = async (order: Omit<OrderType, "id">) => {
    const db = await getDbConnection();

    const {
        name,
        product_id,
        user_id,
        size,
        color,
        status,
        date,
        quantity,
        total,
        address,
        phone
    } = order;

    await db.executeSql(
        `INSERT INTO orders 
        (name, product_id, user_id, size, color, status, date, quantity, total, address, phone) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, product_id, user_id, size, color, status, date, quantity, total, address, phone]
    );
};

export const updateOrder = async (order: OrderType) => {
    const db = await getDbConnection();

    const {
        id,
        name,
        product_id,
        user_id,
        size,
        color,
        status,
        date,
        quantity,
        total,
        address,
        phone
    } = order;

    await db.executeSql(
        `UPDATE orders SET 
            name = ?, 
            product_id = ?, 
            user_id = ?, 
            size = ?, 
            color = ?, 
            status = ?, 
            date = ?, 
            quantity = ?, 
            total = ?, 
            address = ?,
            phone = ?
        WHERE id = ?`,
        [
            name,
            product_id,
            user_id,
            size,
            color,
            status,
            date,
            quantity,
            total,
            address,
            id,
            phone
        ]
    );
};
