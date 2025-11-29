import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    FlatList,
    StyleSheet,
} from "react-native";
import ProductCard from "../component/ProductCard";
import Banner from "../component/Banner";
import { Product } from "../type/ProductType";
import { CARD_MARGIN, CARD_WIDTH, numberOfColumns } from "../constant/CardConstant";
import { LIST_COLUMN_WRAPPER_STYLE, LIST_CONTENT_CONTAINER_STYLE } from "../constant/ListCardConstant";
import { getProducts } from "../service/ProductService";


const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect( () => {
        const fetchProduct = async () => {
            const products = await getProducts();
            setProducts(products)
        }
        fetchProduct();
    }, [])
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
                    columnWrapperStyle={LIST_COLUMN_WRAPPER_STYLE}
                    contentContainerStyle={LIST_CONTENT_CONTAINER_STYLE}
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
});
