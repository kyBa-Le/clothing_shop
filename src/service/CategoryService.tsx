import { getDbConnection } from "../database/dbService";
import { CategoryType } from "../type/CategoryType";

export const getCategories = async () => {
    try {
        const db = await getDbConnection();
        const results = await db.executeSql("SELECT * FROM categories;");
        const categories: CategoryType[] = [];
        results.forEach(result => {
            for (let i = 0; i<result.rows.length; i++) {
                categories.push(result.rows.item(i));
            }
        });
        console.log("Fetched categories: ", categories);
        return categories;
    } catch (error) {
        console.error("Failed to fetch categories: ", error);
        return [];
    }
};