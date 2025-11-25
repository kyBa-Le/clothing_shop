import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { CategoryType } from "../type/CategoryType";
import { getCategories } from "../service/CategoryService";
import { Product } from "../type/ProductType";
import { getProductsByCategory } from "../service/ProductService";
import ProductCard from "../component/ProductCard";
import { CARD_MARGIN, CARD_WIDTH, numberOfColumns } from "../constant/CardConstant";
import { LIST_COLUMN_WRAPPER_STYLE, LIST_CONTENT_CONTAINER_STYLE } from "../constant/ListCardConstant";

const Category = () => {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            return await getCategories();
        };
        fetchCategories().then(data => setCategories(data));
    }, []);

    useEffect(() => {
        if (categories.length > 0) {
            setSelectedCategory(categories[0]);
        }
    }, [categories]);

    useEffect(() => {
        const fetchProductsByCategory = async (categoryId: number) => {
            const products = await getProductsByCategory(categoryId);
            return products;
        }
        if (selectedCategory) {
            fetchProductsByCategory(selectedCategory.id).then(data => setProducts(data));
        }
    }, [selectedCategory]);

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={styles.categoryList}>
                {categories.map(category => {
                    const isSelected = selectedCategory?.id === category.id;
                    return (
                        <TouchableOpacity key={category.id} onPress={() => setSelectedCategory(category)}>
                            <Text style={[styles.categoryItem, { backgroundColor: isSelected ? "#ffe4e4ff" : "white" }]} >{category.name}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <ProductCard item={item} cardMargin={CARD_MARGIN} cardWidth={CARD_WIDTH} />
                )}
                numColumns={numberOfColumns}
                keyExtractor={(_, index) => index.toString()}
                columnWrapperStyle={LIST_COLUMN_WRAPPER_STYLE}
                contentContainerStyle={LIST_CONTENT_CONTAINER_STYLE}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    categoryList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20,
        width: '90%',
    },
    categoryItem: {
        padding: 10,
        margin: 5,
        borderRadius: 30,
    }
})

export default Category;