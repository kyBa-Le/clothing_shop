import { getDbConnection } from "../database/dbService";
import { CartItemType } from "../type/CartItemType";

/**
 * Get all cart items for all users (optional, mostly for admin/debug)
 */
export const getCartItems = async (): Promise<CartItemType[]> => {
    const db = await getDbConnection();
    const results = await db.executeSql("SELECT * FROM cart");
    const cart: CartItemType[] = [];

    results.forEach(result => {
        for (let i = 0; i < result.rows.length; i++) {
            cart.push(result.rows.item(i));
        }
    });

    return cart;
};

/**
 * Get cart items for a specific user
 */
export const getCartItemsByUserId = async (user_id: number): Promise<CartItemType[]> => {
    const db = await getDbConnection();
    const results = await db.executeSql("SELECT * FROM cart WHERE user_id = ?", [user_id]);
    const cart: CartItemType[] = [];

    results.forEach(result => {
        for (let i = 0; i < result.rows.length; i++) {
            cart.push(result.rows.item(i));
        }
    });

    return cart;
};

/**
 * Add a new item to the cart
 */
export const addCartItem = async (item: Omit<CartItemType, "id">) => {
    const db = await getDbConnection();
    const { user_id, product_id, color, size, quantity } = item;

    await db.executeSql(
        `INSERT INTO cart (user_id, product_id, color, size, quantity)
         VALUES (?, ?, ?, ?, ?)`,
        [user_id, product_id, color, size, quantity]
    );
};

/**
 * Update a cart item completely (full item)
 */
export const updateCartItem = async (item: CartItemType) => {
    const db = await getDbConnection();
    const { id, quantity } = item;

    await db.executeSql(
        `UPDATE cart SET quantity = ? WHERE id = ?`,
        [quantity, id]
    );
};

/**
 * Update only quantity of a cart item
 */
export const updateCartItemQuantity = async (id: number, quantity: number) => {
    const db = await getDbConnection();
    await db.executeSql(
        `UPDATE cart SET quantity = ? WHERE id = ?`,
        [quantity, id]
    );
};

/**
 * Remove a cart item by ID
 */
export const removeCartItem = async (id: number) => {
    const db = await getDbConnection();
    await db.executeSql(`DELETE FROM cart WHERE id = ?`, [id]);
};

/**
 * Clear all cart items for a specific user
 */
export const clearCartByUserId = async (user_id: number) => {
    const db = await getDbConnection();
    await db.executeSql(`DELETE FROM cart WHERE user_id = ?`, [user_id]);
};

/**
 * Add item or increment quantity if it already exists in cart
 */
export const addOrUpdateCartItem = async (item: Omit<CartItemType, "id">) => {
    const db = await getDbConnection();

    const existing = await db.executeSql(
        `SELECT * FROM cart WHERE user_id = ? AND product_id = ? AND color = ? AND size = ?`,
        [item.user_id, item.product_id, item.color, item.size]
    );

    if (existing[0].rows.length > 0) {
        const current = existing[0].rows.item(0);
        const newQuantity = current.quantity + item.quantity;
        await updateCartItemQuantity(current.id, newQuantity);
    } else {
        await addCartItem(item);
    }
};

/**
 * Get all cart items for a specific user
 * @param user_id - ID of the user
 * @returns Array of CartItemType
 */
export const getCartByUserId = async (user_id: number): Promise<CartItemType[]> => {
    const db = await getDbConnection();
    const results = await db.executeSql("SELECT * FROM cart WHERE user_id = ?", [user_id]);
    const cart: CartItemType[] = [];

    results.forEach(result => {
        for (let i = 0; i < result.rows.length; i++) {
            cart.push(result.rows.item(i));
        }
    });

    return cart;
};
