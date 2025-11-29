import {
    FlatList,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Modal,
} from "react-native";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import { useCallback, useEffect, useState } from "react";
import { OrderType } from "../type/OrderType";
import { Picker } from "@react-native-picker/picker";
import { getUserById } from "../service/UserService";
import { UserType } from "../type/UserType";
import { getOrders, updateOrder } from "../service/OrderService";

const PRIMARY = "#FFB020";

/* ----------------------------- ORDER ITEM ----------------------------- */
const OrderItem = ({ order, onUpdated }: { order: OrderType; onUpdated: () => void }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <TouchableOpacity style={styles.card} onPress={() => setShowModal(true)}>
                <Text style={styles.label}>Mã đơn hàng:</Text>
                <Text style={styles.value}>{order.id}</Text>

                <Text style={styles.label}>Tên đơn hàng:</Text>
                <Text style={styles.value}>{order.name}</Text>

                <Text style={styles.label}>Trạng thái:</Text>
                <Text style={[styles.status, styles[`status_${order.status}`]]}>
                    {order.status}
                </Text>

                <Text style={styles.label}>Tổng tiền:</Text>
                <Text style={styles.value}>{order.total} đ</Text>
            </TouchableOpacity>

            <OrderDetailModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                order={order}
                onUpdated={onUpdated}
            />
        </>
    );
};

/* ----------------------------- ORDER DETAIL MODAL ----------------------------- */
const OrderDetailModal = ({
    visible,
    onClose,
    order,
    onUpdated,
}: {
    visible: boolean;
    onClose: () => void;
    order: OrderType;
    onUpdated: () => void;
}) => {
    const [status, setStatus] = useState(order.status);
    const [customer, setCustomer] = useState<UserType | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUserById(order.user_id);
            setCustomer(user);
        };
        fetchUser();
    }, [order.user_id]);

    const handleUpdate = async () => {
        await updateOrder({ ...order, status });
        onUpdated();
        onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.modalOverlay}>
                <View style={styles.modalBox}>
                    <Text style={styles.modalTitle}>Thông tin chi tiết đơn hàng</Text>

                    {/* Order Fields */}
                    <Text style={styles.label}>Mã đơn hàng:</Text>
                    <Text style={styles.value}>{order.id}</Text>

                    <Text style={styles.label}>Tên đơn hàng:</Text>
                    <Text style={styles.value}>{order.name}</Text>

                    <Text style={styles.label}>Khách hàng:</Text>
                    <Text style={styles.value}>
                        {customer ? customer.username : "Không có thông tin"}
                    </Text>

                    <Text style={styles.label}>Sản phẩm ID:</Text>
                    <Text style={styles.value}>{order.product_id}</Text>

                    <Text style={styles.label}>Size:</Text>
                    <Text style={styles.value}>{order.size}</Text>

                    <Text style={styles.label}>Màu sắc:</Text>
                    <Text style={styles.value}>{order.color}</Text>

                    <Text style={styles.label}>Số lượng:</Text>
                    <Text style={styles.value}>{order.quantity}</Text>

                    <Text style={styles.label}>Tổng tiền:</Text>
                    <Text style={styles.value}>{order.total} đ</Text>

                    <Text style={styles.label}>Địa chỉ giao hàng:</Text>
                    <Text style={styles.value}>{order.address}</Text>

                    <Text style={styles.label}>Ngày đặt:</Text>
                    <Text style={styles.value}>{order.date}</Text>

                    <Text style={styles.label}>Trạng thái:</Text>
                    <View style={styles.pickerWrapper}>
                        <Picker selectedValue={status} onValueChange={(v) => setStatus(v)}>
                            <Picker.Item label="Pending" value="pending" />
                            <Picker.Item label="Ordered" value="ordered" />
                            <Picker.Item label="Received" value="received" />
                        </Picker>
                    </View>

                    {/* Action buttons */}
                    <View style={styles.btnRow}>
                        <TouchableOpacity
                            style={[styles.btn, styles.confirmBtn]}
                            onPress={handleUpdate}
                        >
                            <FontAwesome6Icon name="check" size={18} color="#fff" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.btn, styles.cancelBtn]}
                            onPress={onClose}
                        >
                            <FontAwesome6Icon name="xmark" size={18} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

/* ----------------------------- MAIN PAGE ----------------------------- */
const OrderManagement = () => {
    const [orders, setOrders] = useState<OrderType[]>([]);

    const fetchOrders = useCallback(async () => {
        const data = await getOrders();
        setOrders(data);
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={() => (
                    <View style={styles.header}>
                        <View style={styles.iconCircle}>
                            <FontAwesome6Icon
                                name="basket-shopping"
                                size={30}
                                color="#fff"
                            />
                        </View>
                        <Text style={styles.headerTitle}>Quản lý đơn hàng</Text>
                    </View>
                )}
                data={orders}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <OrderItem order={item} onUpdated={fetchOrders} />
                )}
                contentContainerStyle={{ paddingBottom: 40 }}
            />
        </View>
    );
};

export default OrderManagement;

/* ----------------------------- STYLES ----------------------------- */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#FFF7EB",
    },
    header: {
        alignItems: "center",
        marginBottom: 24,
    },
    iconCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: PRIMARY,
        justifyContent: "center",
        alignItems: "center",
        elevation: 4,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "800",
        marginTop: 12,
        color: "#3A2F1F",
    },

    /* Card */
    card: {
        backgroundColor: "#ffffff",
        padding: 18,
        borderRadius: 14,
        marginBottom: 16,
        elevation: 2,
        borderLeftWidth: 6,
        borderLeftColor: PRIMARY,
    },
    label: {
        fontSize: 13,
        fontWeight: "600",
        color: "#5A4A42",
        marginTop: 4,
    },
    value: {
        fontSize: 16,
        color: "#2A2A2A",
        marginBottom: 6,
    },

    /* Status Badge Colors */
    status: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginTop: 4,
        marginBottom: 6,
        color: "#fff",
        fontWeight: "700",
        alignSelf: "flex-start",
    },
    status_pending: { backgroundColor: "#9E9E9E" },
    status_ordered: { backgroundColor: "#1976D2" },
    status_received: { backgroundColor: "#43A047" },

    /* Modal */
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalBox: {
        width: "88%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 16,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 16,
        color: PRIMARY,
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: "#FFD28A",
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: "#FFF3DA",
    },

    /* Buttons */
    btnRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 10,
        gap: 10,
    },
    btn: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 8,
    },
    confirmBtn: {
        backgroundColor: PRIMARY,
    },
    cancelBtn: {
        backgroundColor: "#FF3B30",
    },
});
