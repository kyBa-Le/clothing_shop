import { SQLiteDatabase } from "react-native-sqlite-storage";

const sampleUsersData = [
    {
        username: 'user1',
        password: 'password1',
        role: 'admin'
    },
    {
        username: 'user2',
        password: 'password2',
        role: 'customer'
    },
    {
        username: 'admin',
        password: 'admin',
        role: 'admin'
    }
];
    
export const createUserTable = async (db: SQLiteDatabase) => {
    const query = `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('admin', 'customer')),
        email TEXT,
        phone TEXT
    );`;
    await db.executeSql(query);
}

export const insertSampleUsers = async (db: SQLiteDatabase) => {
    const existing = await db.executeSql('SELECT COUNT(*) as count FROM users;');
    const count = existing[0].rows.item(0).count;
    if (count === 0) {
        for (const user of sampleUsersData) {
            const insertQuery = `INSERT INTO users (username, password, role) VALUES (?, ?, ?);`;
            await db.executeSql(insertQuery, [user.username, user.password, user.role]);
        }
    }
}