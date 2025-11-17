import { SQLiteDatabase } from "react-native-sqlite-storage";

const sampleCategories = [
    {
        id: 1,
        name: "Áo ngắn tay",
    },
    {
        id: 2,
        name: "Áo dài tay",
    },
    {
        id: 3,
        name: "Quần Jeans",
    },
    {
        id: 4,
        name: "Quần Short",
    }
];

export const createCategoryTable = async (db: SQLiteDatabase) => {
    await db.executeSql("CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY, name STRING NOT NULL)")
}

export const insertSampleCategories = async (db: SQLiteDatabase) => {
    const existing = await db.executeSql(
        "SELECT COUNT (*) AS count FROM categories"
    );
    const count = existing[0].rows.item(0).count;
    console.log("This is count of category", count);

    if(count === 0) {
        for(const element of sampleCategories) {
            await db.executeSql(
                "INSERT INTO categories (id, name) VALUES (?, ?)",
                [element.id, element.name]
            )
        }
    }
}