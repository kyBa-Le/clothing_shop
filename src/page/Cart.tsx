import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../component/AuthContext";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import { CartItemType } from "../type/CartItemType";
import {
    getCartItemsByUserId,
    updateCartItemQuantity,
    removeCartItem,
} from "../service/CartService";
import { getProductById } from "../service/ProductService";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const PRIMARY = "#f89898ff";

type CartItemWithProduct = CartItemType & { productName: string; price: number };

const Cart = () => {
    const {user} = useContext(AuthContext);
    const navigation = useNavigation<any>();
    const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([]);

    const fetchCart = async () => {
        console.log("user ne", user);
        if (user == null) return;
        const data = await getCartItemsByUserId(user.id);

        const enrichedData: CartItemWithProduct[] = await Promise.all(
            data.map(async (item) => {
                const product = await getProductById(item.product_id);
                return {
                    ...item,
                    productName: product?.name || "Unknown",
                    price: product?.price || 0,
                };
            })
        );

        setCartItems(enrichedData);
    };

    useFocusEffect(
        useCallback(() => {
            fetchCart();
        }, [user])
    );

    const handleUpdateQuantity = async (item: CartItemType, delta: number) => {
        const newQuantity = item.quantity + delta;
        if (newQuantity < 1) return;
        await updateCartItemQuantity(item.id, newQuantity);
        fetchCart();
    };

    const handleRemoveItem = async (item: CartItemType) => {
        await removeCartItem(item.id);
        fetchCart();
    };

    const handleCheckout = (item: CartItemWithProduct) => {
        if (user == null) {
            Alert.alert("Thông báo", "Vui lòng đăng nhập để mua hàng");
            navigation.navigate("Login");
            return;
        }

        navigation.navigate("Checkout", { cartItems: item });
    };

    if (!user) {
        return (
            <View style={styles.center}>
                <Text style={styles.emptyText}>Vui lòng đăng nhập để xem giỏ hàng</Text>
            </View>
        );
    }

    if (cartItems.length === 0) {
        return (
            <View style={styles.center}>
                <FontAwesome6Icon name="box-open" size={70} color="#ccc" />
                <Text style={styles.emptyText}>Không có sản phẩm trong giỏ hàng</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.productName}>{item.productName}</Text>
                            <Text style={styles.label}>
                                Màu: <Text style={styles.value}>{item.color}</Text>
                            </Text>
                            <Text style={styles.label}>
                                Size: <Text style={styles.value}>{item.size}</Text>
                            </Text>
                            <Text style={styles.price}>{item.price.toLocaleString()} đ</Text>
                        </View>

                        <View style={styles.rightColumn}>
                            {/* Horizontal action row: quantity + trash */}
                            <View style={styles.actionRow}>
                                

                                <TouchableOpacity onPress={() => handleUpdateQuantity(item, -1)}>
                                    <Text style={styles.quantityBtn}>-</Text>
                                </TouchableOpacity>

                                <Text style={styles.quantityText}>{item.quantity}</Text>

                                <TouchableOpacity onPress={() => handleUpdateQuantity(item, 1)}>
                                    <Text style={styles.quantityBtn}>+</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Checkout button below */}
                            <View style={[styles.actionRow, { marginTop: 20 }]}>
                                <TouchableOpacity onPress={() => handleRemoveItem(item)} style={styles.trashBtn}>
                                    <FontAwesome6Icon name="trash" size={20} color="#FF3B30" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.itemCheckoutBtn}
                                    onPress={() => handleCheckout(item)}
                                >
                                    <Text style={styles.itemCheckoutText}>Thanh toán</Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 12 },

    center: { flex: 1, justifyContent: "center", alignItems: "center" },

    emptyText: {
        marginTop: 16,
        fontSize: 16,
        color: "#777",
        fontWeight: "500",
    },

    card: {
        backgroundColor: "#fff",
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 2,
    },

    productName: {
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 2,
        color: "#333",
    },

    label: { fontSize: 12, color: "#555", marginBottom: 1 },
    value: { fontWeight: "600", color: "#333" },

    price: {
        marginTop: 2,
        fontSize: 13,
        fontWeight: "700",
        color: PRIMARY,
    },

    rightColumn: {
        flexShrink: 0,
        alignItems: "center",
        marginLeft: 8,
    },

    actionRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginBottom: 6,
    },

    trashBtn: {
        marginRight: 16,
    },

    quantityBtn: {
        fontSize: 16,
        fontWeight: "700",
        width: 26,
        height: 26,
        textAlign: "center",
        textAlignVertical: "center",
        backgroundColor: "#f1f1f1",
        borderRadius: 6,
    },

    quantityText: {
        fontSize: 14,
        fontWeight: "700",
        width: 24,
        textAlign: "center",
    },

    itemCheckoutBtn: {
        backgroundColor: PRIMARY,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 10,
    },

    itemCheckoutText: { color: "#fff", fontWeight: "700", fontSize: 13 },
});

export default Cart;
