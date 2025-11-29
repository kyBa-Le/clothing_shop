import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../component/AuthContext";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import { CartItemType } from "../type/CartItemType";
import {
    getCartItemsByUserId,
    updateCartItemQuantity,
    removeCartItem,
} from "../service/CartService";
import { getProductById } from "../service/ProductService";

const PRIMARY = "#f89898ff";

type CartItemWithProduct = CartItemType & { productName: string; price: number };

const Cart = () => {
    const user = useContext(AuthContext)?.user;
    const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([]);

    const fetchCart = async () => {
        if (!user) return;
        const data = await getCartItemsByUserId(user.id);

        const enrichedData: CartItemWithProduct[] = await Promise.all(
            data.map(async (item) => {
                const product = await getProductById(item.product_id);
                return {
                    ...item,
                    productName: product?.name || "Unknown",
                    price: product?.price || 0
                };
            })
        );

        setCartItems(enrichedData);
    };

    useEffect(() => {
        fetchCart();
    }, [user]);

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

    const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

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
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.productName}>{item.productName}</Text>
                            <Text style={styles.label}>Màu: <Text style={styles.value}>{item.color}</Text></Text>
                            <Text style={styles.label}>Size: <Text style={styles.value}>{item.size}</Text></Text>
                            <Text style={styles.price}>{item.price.toLocaleString()} đ</Text>
                        </View>

                        <View style={styles.rightColumn}>
                            <View style={styles.quantityRow}>
                                <TouchableOpacity onPress={() => handleUpdateQuantity(item, -1)}>
                                    <Text style={styles.quantityBtn}>-</Text>
                                </TouchableOpacity>

                                <Text style={styles.quantityText}>{item.quantity}</Text>

                                <TouchableOpacity onPress={() => handleUpdateQuantity(item, 1)}>
                                    <Text style={styles.quantityBtn}>+</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity onPress={() => handleRemoveItem(item)} style={styles.trashBtn}>
                                <FontAwesome6Icon name="trash" size={22} color="#FF3B30" />
                            </TouchableOpacity>
                        </View>

                    </View>
                )}
                contentContainerStyle={{ paddingBottom: 80 }}
            />

            {/* STICKY FOOTER */}
            <View style={styles.footer}>
                <Text style={styles.totalText}>Tổng cộng: {totalPrice.toLocaleString()} đ</Text>

                <TouchableOpacity style={styles.checkoutBtn}>
                    <Text style={styles.checkoutText}>Thanh toán</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FFF7EB", padding: 16 },

    center: { flex: 1, justifyContent: "center", alignItems: "center" },

    emptyText: {
        marginTop: 16,
        fontSize: 17,
        color: "#777",
        fontWeight: "500"
    },

    card: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 14,
        marginBottom: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: 12,

        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 3,
    },

    productName: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 6,
        color: "#333",
    },

    label: { fontSize: 14, color: "#555", marginBottom: 2 },
    value: { fontWeight: "600", color: "#333" },

    price: {
        marginTop: 6,
        fontSize: 15,
        fontWeight: "700",
        color: PRIMARY,
    },

    rightColumn: {
        flexShrink: 0,
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
        marginLeft: 12,
    },

    quantityRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    trashBtn: {
        marginTop: 10,
    },

    quantityBtn: {
        fontSize: 20,
        fontWeight: "800",
        width: 32,
        height: 32,
        textAlign: "center",
        textAlignVertical: "center",
        backgroundColor: "#f1f1f1",
        borderRadius: 8,
    },

    quantityText: {
        fontSize: 16,
        fontWeight: "700",
        width: 28,
        textAlign: "center",
    },

    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#eee",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        elevation: 12,
    },

    totalText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#333",
    },

    checkoutBtn: {
        backgroundColor: PRIMARY,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
    },

    checkoutText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});

export default Cart;
