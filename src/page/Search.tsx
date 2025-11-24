import { RouteProp } from "@react-navigation/native";
import { FlatList, StyleSheet, Text, TouchableOpacity, View, LayoutAnimation, UIManager, Platform } from "react-native";
import { RootStackParamList } from "../../App";
import ProductCard from "../component/ProductCard";
import { useEffect, useState } from "react";
import { searchProductsByName } from "../service/ProductService";
import { Product } from "../type/ProductType";
import { CARD_MARGIN, CARD_WIDTH, numberOfColumns } from "../constant/CardConstant";
import { LIST_COLUMN_WRAPPER_STYLE, LIST_CONTENT_CONTAINER_STYLE } from "../constant/ListCardConstant";
import Slider from '@react-native-community/slider';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

type SearchScreenProp = RouteProp<RootStackParamList, 'Search'>;

const Search = ({ route }: { route: SearchScreenProp }) => {
    const { searchQuery } = route.params;
    const [products, setProducts] = useState<Product[]>([]);
    const [prices, setPrices] = useState<number[]>([]);
    const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 0 });
    const [fromPrice, setFromPrice] = useState<number>(0);
    const [toPrice, setToPrice] = useState<number>(0);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [filterVisible, setFilterVisible] = useState<boolean>(true); // toggle state

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await searchProductsByName(searchQuery);
            setProducts(response);
            const priceList = response.map(product => product.price);
            setPrices(priceList);
        };
        fetchProducts();
    }, [searchQuery]);

    useEffect(() => {
        if (prices.length > 0) {
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            setPriceRange({ min: minPrice, max: maxPrice });
            setFromPrice(0);
            setToPrice(maxPrice);
        }
    }, [prices]);

    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

    const filterProducts = () => {
        setFilteredProducts(products.filter(product => product.price >= fromPrice && product.price <= toPrice));
    };

    const resetFilter = () => {
        setFilteredProducts(products);
        setFromPrice(priceRange.min);
        setToPrice(priceRange.max);
    };

    const toggleFilter = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // smooth animation
        setFilterVisible(prev => !prev);
    };

    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.title}>Kết quả tìm kiếm: "{searchQuery}"</Text>

            <TouchableOpacity onPress={toggleFilter} style={styles.toggleButton}>
                <Text style={styles.toggleButtonText}>
                    {filterVisible ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
                </Text>
            </TouchableOpacity>

            {filterVisible && (
                <View style={styles.filterContainer}>
                    <Text style={styles.filterTitle}>Lọc theo giá</Text>

                    <View style={styles.sliderRow}>
                        <Text style={styles.priceLabel}>Từ: {fromPrice}</Text>
                        <Text style={styles.priceLabel}>Đến: {toPrice}</Text>
                    </View>

                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={priceRange.max}
                        minimumTrackTintColor="#f89898ff"
                        maximumTrackTintColor="#ccc"
                        thumbTintColor="#f89898ff"
                        value={fromPrice}
                        onValueChange={setFromPrice}
                        step={priceRange.max / 100}
                    />

                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={priceRange.max}
                        minimumTrackTintColor="#f89898ff"
                        maximumTrackTintColor="#ccc"
                        thumbTintColor="#f89898ff"
                        value={toPrice}
                        onValueChange={setToPrice}
                        step={priceRange.max / 100}
                        lowerLimit={fromPrice}
                    />

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.filterButton} onPress={filterProducts}>
                            <Text style={styles.buttonText}>Áp dụng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.filterButton} onPress={resetFilter}>
                            <Text style={styles.buttonText}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* Product List */}
            <FlatList
                data={filteredProducts}
                renderItem={({ item }) => (
                    <ProductCard item={item} cardMargin={CARD_MARGIN} cardWidth={CARD_WIDTH} />
                )}
                keyExtractor={(_, index) => index.toString()}
                numColumns={numberOfColumns}
                columnWrapperStyle={LIST_COLUMN_WRAPPER_STYLE}
                contentContainerStyle={LIST_CONTENT_CONTAINER_STYLE}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center',
    },
    toggleButton: {
        alignSelf: 'center',
        backgroundColor: '#f89898ff',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginBottom: 5,
    },
    toggleButtonText: {
        color: '#fff',
    },
    filterContainer: {
        marginHorizontal: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 5,
    },
    filterTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
        fontSize: 16,
        color: '#333',
    },
    sliderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    priceLabel: {
        fontSize: 14,
        color: '#333',
    },
    slider: {
        width: '100%',
        height: 30,
        marginVertical: 5,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    filterButton: {
        flex: 1,
        backgroundColor: '#f89898ff',
        paddingVertical: 6,
        marginHorizontal: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Search;
