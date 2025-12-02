import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Alert,
    StyleSheet
} from "react-native";
import { RootStackParamList } from "../../App";
import { useContext, useEffect, useState } from "react";
import { Product } from "../type/ProductType";
import { getProductById } from "../service/ProductService";
import { AuthContext } from "../component/AuthContext";
import { Picker } from "@react-native-picker/picker";
import { addOrder } from "../service/OrderService";
import { OrderType } from "../type/OrderType";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";

type CheckoutProp = RouteProp<RootStackParamList, "Checkout">;

const PRIMARY = "#f89898ff";

const Checkout = () => {
    const route = useRoute<CheckoutProp>();
    const { product_id, color, id, size, user_id } = route.params.cartItems;
    const [product, setProduct] = useState<Product | null>(null);
    const { user } = useContext(AuthContext);

    const [quantity, setQuantity] = useState<number>(1);
    const [address, setAddress] = useState<string>("");
    const [payment, setPayment] = useState<string>("COD");
    const [phone, setPhone] = useState<string>("");

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        const fetchedProduct = async () => {
            const p = await getProductById(product_id);
            setProduct(p);
        };
        fetchedProduct();
    }, [product_id]);

    const handleOrder = async () => {
        if (!product || !user) return;

        // PHONE VALIDATION
        if (!phone.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập số điện thoại");
            return;
        }

        if (!/^[0-9]{10}$/.test(phone)) {
            Alert.alert("Lỗi", "Số điện thoại phải gồm đúng 9 chữ số");
            return;
        }

        // ADDRESS VALIDATION
        if (!address.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập địa chỉ giao hàng");
            return;
        }

        const total = product.price * quantity;

        const order: Omit<OrderType, "id"> = {
            name: product.name,
            product_id: product.id,
            user_id: user.id,
            size: size,
            color: color,
            status: "pending",
            date: new Date().toISOString(),
            quantity: quantity,
            total: total,
            address: address,
            phone: phone,
        };

        try {
            await addOrder(order);
            Alert.alert("Thành công", "Đơn hàng đã được đặt");

            navigation.reset({
                index: 0,
                routes: [{ name: "Main" as never }],
            });
        } catch (err) {
            Alert.alert("Lỗi", "Không thể đặt hàng");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Thanh toán đơn hàng</Text>

            <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10 }}>
                {/* Product Info */}
                <View style={styles.infoBox}>
                    <Text style={styles.label}>Tên sản phẩm</Text>
                    <Text style={styles.value}>{product?.name}</Text>

                    <Text style={styles.label}>Màu</Text>
                    <Text style={styles.value}>{color}</Text>

                    <Text style={styles.label}>Kích thước</Text>
                    <Text style={styles.value}>{size}</Text>
                </View>

                {/* Quantity */}
                <Text style={styles.label}>Số lượng</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        onPress={() => setQuantity((prev) => Math.max(1, prev - 1))}
                        style={styles.qtyButton}
                    >
                        <FontAwesome6Icon name="minus" size={16} color="#fff" />
                    </TouchableOpacity>

                    <Text style={styles.quantityText}>{quantity}</Text>

                    <TouchableOpacity
                        onPress={() => setQuantity((prev) => prev + 1)}
                        style={styles.qtyButton}
                    >
                        <FontAwesome6Icon name="plus" size={16} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Address */}
                <Text style={styles.label}>Địa chỉ giao hàng</Text>
                <TextInput
                    value={address}
                    onChangeText={setAddress}
                    placeholder="Nhập địa chỉ..."
                    style={styles.input}
                />

                {/* Phone Number */}
                <Text style={styles.label}>Số điện thoại</Text>
                <TextInput
                    value={phone}
                    onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ""))}
                    placeholder="Nhập số điện thoại (10 số)"
                    keyboardType="numeric"
                    maxLength={10}
                    style={styles.input}
                />

                {/* Payment */}
                <Text style={styles.label}>Phương thức thanh toán</Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={payment}
                        onValueChange={(v) => setPayment(v)}
                        style={styles.picker}
                    >
                        <Picker.Item label="COD (Thanh toán khi nhận hàng)" value="COD" />
                    </Picker>
                </View>

                {/* Total */}
                <View style={styles.totalBox}>
                    <Text style={styles.totalLabel}>Tổng tiền</Text>
                    <Text style={styles.totalValue}>
                        {(product ? product.price * quantity : 0).toLocaleString()} đ
                    </Text>
                </View>

                {/* Order Button */}
                <TouchableOpacity style={styles.button} onPress={handleOrder}>
                    <Text style={styles.buttonText}>Đặt hàng</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default Checkout;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 5,
        paddingVertical: 10,
        color: "#333",
        borderBottomColor: "black",
        borderBottomWidth: 1,
    },

    infoBox: {
        backgroundColor: "#ffffff",
        padding: 18,
        borderRadius: 14,
        marginBottom: 20,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 5,
    },

    label: {
        marginTop: 12,
        fontWeight: "600",
        fontSize: 15,
        color: "#444",
    },
    value: {
        fontSize: 16,
        marginTop: 3,
        color: "#111",
    },

    input: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 12,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 10,
        fontSize: 16,
    },

    pickerWrapper: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 20,
    },
    picker: {
        height: 50,
        width: "100%",
    },

    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 12,
        width: 180,
        justifyContent: "space-between",
        marginVertical: 10,
    },

    qtyButton: {
        backgroundColor: PRIMARY,
        padding: 8,
        borderRadius: 8,
    },

    quantityText: {
        fontSize: 18,
        fontWeight: "700",
        minWidth: 35,
        textAlign: "center",
    },

    totalBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        marginTop: 20,
        borderWidth: 1,
        borderColor: "#eee",
    },
    totalLabel: {
        fontSize: 18,
        color: "#333",
        fontWeight: "600",
    },
    totalValue: {
        fontSize: 20,
        color: PRIMARY,
        fontWeight: "700",
    },

    button: {
        backgroundColor: PRIMARY,
        padding: 16,
        marginTop: 30,
        borderRadius: 12,
        alignItems: "center",
        elevation: 2,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "700",
    },
});
