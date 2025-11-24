import { RouteProp } from "@react-navigation/native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../../App";
import ProductCard from "../component/ProductCard";
import { useEffect, useState } from "react";
import { searchProductsByName } from "../service/ProductService";
import { Product } from "../type/ProductType";
import { CARD_MARGIN, CARD_WIDTH, numberOfColumns } from "../constant/CardConstant";
import { LIST_COLUMN_WRAPPER_STYLE, LIST_CONTENT_CONTAINER_STYLE } from "../constant/ListCardConstant";

type SearchScreenProp = RouteProp<RootStackParamList, 'Search'>;

const Search = ({ route }: { route: SearchScreenProp}) => {
    const {searchQuery} = route.params;
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await searchProductsByName(searchQuery);
            setProducts(response);
        }
        fetchProducts();
    }, [searchQuery]);

    return (
        <View>
            <Text style={styles.title}>Kết quả tìm kiếm: "{searchQuery}"</Text>
            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <ProductCard item={item} cardMargin={CARD_MARGIN} cardWidth={CARD_WIDTH} />
                )}
                keyExtractor={(_, index) => index.toString()}
                numColumns={numberOfColumns}
                columnWrapperStyle={LIST_COLUMN_WRAPPER_STYLE}
                contentContainerStyle={LIST_CONTENT_CONTAINER_STYLE}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center',
    }
});
export default Search;