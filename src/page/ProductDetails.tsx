import { Image, Text, TouchableOpacity, View, StyleSheet, ScrollView } from "react-native";
import { RootStackParamList } from "../../App";
import { RouteProp, useRoute } from "@react-navigation/native";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";

type ProductDetailRouteProp = RouteProp<RootStackParamList, "Detail">;

const ProductDetails = () => {
    const route = useRoute<ProductDetailRouteProp>();
    const product = route.params.item;

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Product Image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: product.image }}
                        style={styles.productImage}
                        resizeMode="cover"
                    />
                    {/* Optional: Back Button Overlay */}
                    <TouchableOpacity style={styles.backButton}>
                        <FontAwesome6Icon name="arrow-left" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Content */}
                <View style={styles.content}>

                    {/* Product Name */}
                    <Text style={styles.productName}>{product.name}</Text>

                    {/* Price */}
                    <Text style={styles.price}>${product.price}</Text>

                    {/* Description (you can add this to your Product type later) */}
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>
                        {/* {product.description || */}
                            Premium quality product with excellent craftsmanship. Made from high-grade materials for durability and comfort. Perfect for everyday use.
                    </Text>

                    {/* Color & Size Options (Example) */}
                    <View style={styles.optionsContainer}>
                        <View style={styles.optionRow}>
                            <Text style={styles.optionLabel}>Color:</Text>
                            <View style={styles.colorOptions}>
                                <View style={[styles.colorCircle, { backgroundColor: "#000" }]} />
                                <View style={[styles.colorCircle, { backgroundColor: "#E5E5E5", borderWidth: 1 }]} />
                                <View style={[styles.colorCircle, { backgroundColor: "#8B4513" }]} />
                            </View>
                        </View>

                        <View style={styles.optionRow}>
                            <Text style={styles.optionLabel}>Size:</Text>
                            <View style={styles.sizeOptions}>
                                {["S", "M", "L", "XL"].map(size => (
                                    <TouchableOpacity key={size} style={styles.sizeBox}>
                                        <Text style={styles.sizeText}>{size}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>

                    {/* Reviews Placeholder */}
                    <View style={styles.reviewsRow}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            {[...Array(5)].map((_, i) => (
                                <FontAwesome6Icon key={i} name="star" size={20} color="#FFD700" />
                            ))}
                            <Text style={styles.ratingText}>4.8 (123 reviews)</Text>
                        </View>
                    </View>

                    {/* Add to Cart Button */}
                    <TouchableOpacity style={styles.addToCartButton}>
                        <Text style={styles.addToCartText}>Add to Cart</Text>
                    </TouchableOpacity>

                    {/* Buy Now Button */}
                    <TouchableOpacity style={styles.buyNowButton}>
                        <Text style={styles.buyNowText}>Buy Now</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
    },
    imageContainer: {
        position: "relative",
        height: 400,
        backgroundColor: "#eee",
    },
    productImage: {
        width: "100%",
        height: "100%",
    },
    backButton: {
        position: "absolute",
        top: 50,
        left: 20,
        backgroundColor: "rgba(0,0,0,0.4)",
        padding: 10,
        borderRadius: 30,
        zIndex: 10,
    },
    content: {
        padding: 20,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -30,
    },
    productName: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#222",
        marginBottom: 8,
    },
    price: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#007BFF",
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
        marginBottom: 10,
        marginTop: 10,
    },
    description: {
        fontSize: 15,
        color: "#666",
        lineHeight: 22,
        marginBottom: 20,
    },
    optionsContainer: {
        marginVertical: 20,
    },
    optionRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    optionLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        width: 80,
    },
    colorOptions: {
        flexDirection: "row",
        gap: 12,
    },
    colorCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    sizeOptions: {
        flexDirection: "row",
        gap: 12,
    },
    sizeBox: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
    },
    sizeText: {
        fontSize: 14,
        fontWeight: "600",
    },
    reviewsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 20,
    },
    ratingText: {
        marginLeft: 8,
        color: "#666",
        fontSize: 15,
    },
    addToCartButton: {
        backgroundColor: "#fcc95bff",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 12,
    },
    addToCartText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    buyNowButton: {
        backgroundColor: "#f89898ff",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
    },
    buyNowText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default ProductDetails;