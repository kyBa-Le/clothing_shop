import { SQLiteDatabase } from "react-native-sqlite-storage";

const productsData: any = [
    {
        name: 'Áo thun trơn 1',
        price: 100,
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGEKk1DaaAsuqNnnM9yrZ_6OK6I7CiM1EFEg&s',
        category_id: 1
    },
    {
        name: 'Áo dài tay số 2',
        price: 100,
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGEKk1DaaAsuqNnnM9yrZ_6OK6I7CiM1EFEg&s',
        category_id: 2
    },
    {
        name: 'Áo dài tay số 3',
        price: 100,
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGEKk1DaaAsuqNnnM9yrZ_6OK6I7CiM1EFEg&s',
        category_id: 2
    },
    {
        name: 'Quần Jeans số 4',
        price: 100,
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGEKk1DaaAsuqNnnM9yrZ_6OK6I7CiM1EFEg&s',
        category_id: 3
    },
    {
        name: 'Quần Jeans số 5',
        price: 100,
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGEKk1DaaAsuqNnnM9yrZ_6OK6I7CiM1EFEg&s',
        category_id: 3
    },
    {
        name: 'Áo thun trơn số 6',
        price: 100,
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGEKk1DaaAsuqNnnM9yrZ_6OK6I7CiM1EFEg&s',
        category_id: 1
    },
    {
        name: 'Áo dài tay số 7',
        price: 100,
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGEKk1DaaAsuqNnnM9yrZ_6OK6I7CiM1EFEg&s',
        category_id: 2
    },
    {
        name: 'Áo dài tay số 8',
        price: 100,
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGEKk1DaaAsuqNnnM9yrZ_6OK6I7CiM1EFEg&s',
        category_id: 2
    },
    {
        name: 'Áo thun trơn số 9',
        price: 100,
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGEKk1DaaAsuqNnnM9yrZ_6OK6I7CiM1EFEg&s',
        category_id: 1
    },
    {
        name: 'Quần Short số 10',
        price: 100,
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGEKk1DaaAsuqNnnM9yrZ_6OK6I7CiM1EFEg&s',
        category_id: 4
    },
    {
        name: 'Quần Short số 11',
        price: 100,
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGEKk1DaaAsuqNnnM9yrZ_6OK6I7CiM1EFEg&s',
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
