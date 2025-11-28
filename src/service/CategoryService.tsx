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

export const updateCategory = async (category: CategoryType) => {
    try {
        const db = await getDbConnection();
        const { id, name } = category;
        await db.executeSql(
            `UPDATE categories SET name = ? WHERE id = ?`, [name, id]
        );
        console.log("Updated category: ", category);
    } catch (error) {
        console.error("Failed to update category: ", error);
    }
};

export const deleteCategory = async (categoryId: number) => {
    try {
        const db = await getDbConnection();
        await db.executeSql(
            `DELETE FROM categories WHERE id = ?`, [categoryId]
        );
        console.log("Deleted category with id: ", categoryId);
    } catch (error) {
        console.error("Failed to delete category: ", error);
    }
};