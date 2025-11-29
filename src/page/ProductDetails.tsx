import { Image, Text, TouchableOpacity, View, StyleSheet, ScrollView, Alert } from "react-native";
import { RootStackParamList } from "../../App";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import { useState, useContext } from "react";
import { ProductColor, ProductSize } from "../type/ProductType";
import { AuthContext } from "../component/AuthContext";
import { addOrUpdateCartItem } from "../service/CartService";

type ProductDetailRouteProp = RouteProp<RootStackParamList, "Detail">;

const ProductDetails = () => {
    const route = useRoute<ProductDetailRouteProp>();
    const product = route.params.item;
    const [pickedColor, setPickedColor] = useState<ProductColor>(ProductColor.BLACK);
    const [pickedSize, setPickedSize] = useState<ProductSize>(ProductSize.L);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const user = useContext(AuthContext)?.user;

    const handleAddToCart = async () => {
        if (!user) {
            Alert.alert("Thông báo", "Vui lòng đăng nhập để thêm vào giỏ hàng");
            navigation.navigate("Login" as never);
            return;
        }

        try {
            await addOrUpdateCartItem({
                user_id: user.id,
                product_id: product.id,
                color: pickedColor,
                size: pickedSize,
                quantity: 1
            });
            Alert.alert("Thành công", "Sản phẩm đã được thêm vào giỏ hàng");
        } catch (error) {
            console.log(error);
            Alert.alert("Lỗi", "Không thể thêm sản phẩm vào giỏ hàng");
        }
    };

    const handleBuyNow = () => {
        if (!user) {
            Alert.alert("Thông báo", "Vui lòng đăng nhập để mua sản phẩm");
            navigation.navigate("Login" as never);
            return;
        }

        navigation.navigate("Checkout", {
            cartItems: [{
                id: 0,
                user_id: user.id,
                product_id: product.id,
                color: pickedColor,
                size: pickedSize,
                quantity: 1
            }]
        });
    };

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
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <FontAwesome6Icon name="arrow-left" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Content */}
                <View style={styles.content}>
                    {/* Product Name */}
                    <Text style={styles.productName}>{product.name}</Text>

                    {/* Price */}
                    <Text style={styles.price}>{product.price} ₫</Text>

                    {/* Description */}
                    <Text style={styles.sectionTitle}>Mô tả</Text>
                    <Text style={styles.description}>
                        Sản phẩm chất lượng cao với thiết kế tinh xảo. Chất liệu bền bỉ, thoải mái khi sử dụng. Phù hợp sử dụng hàng ngày.
                    </Text>

                    {/* Color & Size Options */}
                    <View style={styles.optionsContainer}>
                        <View style={styles.optionRow}>
                            <Text style={styles.optionLabel}>Màu:</Text>
                            <View style={styles.colorOptions}>
                                <TouchableOpacity onPress={() => setPickedColor(ProductColor.BLACK)}>
                                    <View style={[
                                        styles.colorCircle,
                                        { backgroundColor: "#000" },
                                        pickedColor === ProductColor.BLACK && styles.colorCircleSelected
                                    ]} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setPickedColor(ProductColor.GRAY)}>
                                    <View style={[
                                        styles.colorCircle,
                                        { backgroundColor: "#E5E5E5", borderWidth: 1 },
                                        pickedColor === ProductColor.GRAY && styles.colorCircleSelected
                                    ]} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setPickedColor(ProductColor.BROWN)}>
                                    <View style={[
                                        styles.colorCircle,
                                        { backgroundColor: "#8B4513" },
                                        pickedColor === ProductColor.BROWN && styles.colorCircleSelected
                                    ]} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.optionRow}>
                            <Text style={styles.optionLabel}>Size:</Text>
                            <View style={styles.sizeOptions}>
                                {Object.values(ProductSize).map((size) => (
                                    <TouchableOpacity
                                        key={size}
                                        onPress={() => setPickedSize(size)}
                                        style={[
                                            styles.sizeBox,
                                            pickedSize === size && styles.sizeBoxSelected
                                        ]}
                                    >
                                        <Text style={[
                                            styles.sizeText,
                                            pickedSize === size && styles.sizeTextSelected
                                        ]}>
                                            {size}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>

                    {/* Reviews */}
                    <View style={styles.reviewsRow}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            {[...Array(5)].map((_, i) => (
                                <FontAwesome6Icon key={i} name="star" size={20} color="#FFD700" />
                            ))}
                            <Text style={styles.ratingText}>4.8 (123 đánh giá)</Text>
                        </View>
                    </View>

                    {/* Add to Cart Button */}
                    <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                        <Text style={styles.addToCartText}>Thêm vào giỏ hàng</Text>
                    </TouchableOpacity>

                    {/* Buy Now Button */}
                    <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
                        <Text style={styles.buyNowText}>Mua ngay</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f8f8f8" },
    imageContainer: { position: "relative", height: 400, backgroundColor: "#eee" },
    productImage: { width: "100%", height: "100%" },
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
    productName: { fontSize: 26, fontWeight: "bold", color: "#222", marginBottom: 8 },
    price: { fontSize: 28, fontWeight: "bold", color: "#007BFF", marginBottom: 20 },
    sectionTitle: { fontSize: 18, fontWeight: "600", color: "#333", marginBottom: 10, marginTop: 10 },
    description: { fontSize: 15, color: "#666", lineHeight: 22, marginBottom: 20 },
    optionsContainer: { marginVertical: 20 },
    optionRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
    optionLabel: { fontSize: 16, fontWeight: "600", color: "#333", width: 80 },
    colorOptions: { flexDirection: "row", gap: 12 },
    colorCircle: { width: 36, height: 36, borderRadius: 18 },
    colorCircleSelected: { borderWidth: 3, borderColor: "#333" },
    sizeOptions: { flexDirection: "row", gap: 12 },
    sizeBox: { paddingHorizontal: 16, paddingVertical: 10, borderWidth: 1, borderColor: "#ddd", borderRadius: 8 },
    sizeBoxSelected: { backgroundColor: "#333", borderColor: "#333" },
    sizeText: { fontSize: 14, fontWeight: "600" },
    sizeTextSelected: { color: "#fff" },
    reviewsRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 20 },
    ratingText: { marginLeft: 8, color: "#666", fontSize: 15 },
    addToCartButton: { backgroundColor: "#fcc95bff", paddingVertical: 16, borderRadius: 12, alignItems: "center", marginBottom: 12 },
    addToCartText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
    buyNowButton: { backgroundColor: "#f89898ff", paddingVertical: 16, borderRadius: 12, alignItems: "center" },
    buyNowText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default ProductDetails;
