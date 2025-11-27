import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View, StyleSheet, ScrollView } from "react-native";
import ProductCard from "../component/ProductCard";
import { CARD_MARGIN, CARD_WIDTH, numberOfColumns } from "../constant/CardConstant";
import { LIST_COLUMN_WRAPPER_STYLE, LIST_CONTENT_CONTAINER_STYLE } from "../constant/ListCardConstant";
import { getProducts } from "../service/ProductService";
import { Product } from "../type/ProductType";

const ProductManagement = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await getProducts();
            setProducts(fetchedProducts);
        };
        fetchProducts();
    }, []);

    const managementButtons = [
        { title: "Thêm sản phẩm mới", color: "#FF6B6B" },
        { title: "Chỉnh sửa sản phẩm", color: "#4ECDC4" },
        { title: "Xóa sản phẩm", color: "#556270" },
        { title: "Quản lý danh mục", color: "#FFD93D" },
    ];

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Quản lý sản phẩm</Text>

            <View style={styles.buttonGrid}>
                {managementButtons.map((btn, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.button, { backgroundColor: btn.color }]}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>{btn.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <ProductCard item={item} cardMargin={CARD_MARGIN} cardWidth={CARD_WIDTH} />
                )}
                keyExtractor={(_, index) => index.toString()}
                numColumns={numberOfColumns}
                columnWrapperStyle={LIST_COLUMN_WRAPPER_STYLE}
                contentContainerStyle={LIST_CONTENT_CONTAINER_STYLE}
                style={{ marginTop: 20 }}
            />
        </ScrollView>
    );
};

export default ProductManagement;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
        textAlign: "center",
    },
    buttonGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    button: {
        flexBasis: "48%",
        marginBottom: 12,
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
    },
});
