import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Product } from "../type/ProductType";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";

type ProductCardProps = {
    item: Product;
    cardMargin: number;
    cardWidth: number;
}

const ProductCard = ({ item, cardMargin, cardWidth }: ProductCardProps) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    return (
        <TouchableOpacity onPress={() => navigation.navigate({ name: "Detail" , params: {item}})} style={[styles.card, { "width": cardWidth, "marginBottom": cardMargin }]} activeOpacity={0.8}>
            <Image source={{ uri: item.image }} style={[styles.image, { "height": cardWidth }]} />
            <View style={styles.infoContainer}>
                <Text style={styles.name} numberOfLines={1}>
                    {item.name}
                </Text>
                <Text style={styles.price}>{item.price.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create(
    {
        card: {
            backgroundColor: "#fff",
            borderRadius: 12,
            overflow: "hidden",
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            elevation: 3,
        },
        image: {
            width: "100%",
            resizeMode: "cover",
        },
        infoContainer: {
            padding: 10,
        },
        name: {
            fontSize: 16,
            fontWeight: "600",
            color: "#333",
        },
        price: {
            fontSize: 14,
            color: "#f89898ff",
            fontWeight: "600",
            marginTop: 4,
        },
    }
)

export default ProductCard;