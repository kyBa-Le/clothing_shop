import { getDbConnection } from "../database/dbService";
import { UserType } from "../type/UserType";

export const getUser = async ({username, password}: {username: string, password: string}): Promise<UserType | null> => {
    const db = await getDbConnection();
    const results = await db.executeSql('SELECT * FROM users WHERE username = ? AND password = ?;', [username, password]);
    if (results[0].rows.length > 0) {
        return results[0].rows.item(0);
    } else {
        return null;
    }
};

export const createUser = async ({username, password, role}: {username: string, password: string, role: 'admin' | 'customer'}) => {
    const db = await getDbConnection();
    const insertQuery = `INSERT INTO users (username, password, role) VALUES (?, ?, ?);`;
    const result = await db.executeSql(insertQuery, [username, password, role]);
    return result;
}

export const isUsernameTaken = async (username: string) => {
    const db = await getDbConnection();
    const results = await db.executeSql('SELECT * FROM users WHERE username = ?;', [username]);
    return results[0].rows.length > 0;
}

export const getUserById = async (id: number): Promise<UserType | null> => {
    const db = await getDbConnection();
    const results = await db.executeSql('SELECT * FROM users WHERE id = ?;', [id]);
    if (results[0].rows.length > 0) {
        return results[0].rows.item(0);
    } else {
        return null;
    }
};