import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    Dimensions,
} from "react-native";
import ProductCard from "../component/ProductCard";
import Banner from "../component/Banner";
import { Product } from "../type/ProductType";
import { createTables, getDbConnection, insertSampleDb } from "../database/dbService";
import { getProducts } from "../service/ProductService";

const screenWidth = Dimensions.get("window").width;
export const numberOfColumns = 2;
export const CARD_MARGIN = 10;
export const CARD_WIDTH = (screenWidth - CARD_MARGIN * (numberOfColumns + 1)) / numberOfColumns;

const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);
    
    useEffect(() => {
    const initDb = async () => {
        const db = await getDbConnection();
        await createTables(db);
        await insertSampleDb(db);
        const products = await getProducts();
        setProducts(products);
    }
    initDb();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Banner />
            <View style={styles.container}>
                <Text style={styles.header}>Thời trang cuối năm</Text>
                <FlatList
                    data={products}
                    numColumns={numberOfColumns}
                    renderItem={({ item }) => (
                        <ProductCard item={item} cardMargin={CARD_MARGIN} cardWidth={CARD_WIDTH} />
                    )}
                    keyExtractor={(_, index) => index.toString()}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.list}
                />
            </View>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
        paddingTop: 10,
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
        color: "#333",
    },
    list: {
        paddingHorizontal: CARD_MARGIN,
        paddingBottom: 20,
    },
    row: {
        justifyContent: "space-between",
    },
});
