import React from "react";
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    Dimensions,
} from "react-native";
import ProductCard from "../component/ProductCard";

const screenWidth = Dimensions.get("window").width;
const numberOfColumns = 2;
const CARD_MARGIN = 10;
const CARD_WIDTH = (screenWidth - CARD_MARGIN * (numberOfColumns + 1)) / numberOfColumns;

const Home = ({ products }: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Home Page</Text>
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
