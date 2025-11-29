import {
    FlatList,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Modal,
    Alert,
} from "react-native";
import { useCallback, useContext, useEffect, useState } from "react";
import { OrderType } from "../type/OrderType";
import { getOrdersByUserId } from "../service/OrderService";
import { AuthContext } from "../component/AuthContext";
import { useNavigation } from "@react-navigation/native";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";

const PRIMARY = "#f89898ff";

const OrderHistory = () => {
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [filter, setFilter] = useState<"pending" | "ordered" | "received">("pending");
    const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
    const userId = useContext(AuthContext)?.user?.id;
    const navigation = useNavigation();

    const fetchOrders = useCallback(async () => {
        if (userId == null) {
            Alert.alert("Thông báo", "Vui lòng đăng nhập để xem lịch sử mua hàng");
            navigation.navigate("Login" as never);
            return;
        }
        const data = await getOrdersByUserId(userId);
        setOrders(data);
    }, [userId]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const filteredOrders = orders.filter((o) => o.status === filter);

    const statusMap = {
        pending: "Chờ xác nhận",
        ordered: "Đang giao",
        received: "Đã nhận",
    };

    const statusColor = {
        pending: "#9E9E9E",
        ordered: "#1976D2",
        received: "#43A047",
    };

    const renderEmpty = () => (
        <View style={styles.emptyContainer}>
            <FontAwesome6Icon name="box-open" size={60} color="#ccc" />
            <Text style={styles.emptyText}>Không có đơn hàng nào</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Lịch sử mua hàng của bạn</Text>

            {/* Filter Buttons */}
            <View style={styles.filterRow}>
                {(["pending", "ordered", "received"] as const).map((type) => (
                    <TouchableOpacity
                        key={type}
                        style={[
                            styles.filterBtn,
                            filter === type && { backgroundColor: PRIMARY },
                        ]}
                        onPress={() => setFilter(type)}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                filter === type && { color: "#fff" },
                            ]}
                        >
                            {statusMap[type]}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Orders List */}
            <FlatList
                data={filteredOrders}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 40 }}
                ListEmptyComponent={renderEmpty}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => setSelectedOrder(item)}
                    >
                        <View style={styles.row}>
                            <Text style={styles.label}>Mã đơn:</Text>
                            <Text style={styles.value}>{item.id}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Tên:</Text>
                            <Text style={styles.value}>{item.name}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Tổng tiền:</Text>
                            <Text style={styles.value}>{item.total} đ</Text>
                        </View>

                        {/* Status Badge */}
                        <View style={[styles.badge, { backgroundColor: statusColor[item.status] }]}>
                            <Text style={styles.badgeText}>{statusMap[item.status]}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

            {/* Order Details Modal */}
            {selectedOrder && (
                <Modal transparent animationType="fade" visible={true}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalBox}>
                            <Text style={styles.modalTitle}>Chi tiết đơn hàng</Text>
                            <View style={styles.row}>
                                <Text style={styles.label}>Mã đơn:</Text>
                                <Text style={styles.value}>{selectedOrder.id}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Tên:</Text>
                                <Text style={styles.value}>{selectedOrder.name}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Số điện thoại:</Text>
                                <Text style={styles.value}>{selectedOrder.phone}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Sản phẩm ID:</Text>
                                <Text style={styles.value}>{selectedOrder.product_id}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Size:</Text>
                                <Text style={styles.value}>{selectedOrder.size}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Màu:</Text>
                                <Text style={styles.value}>{selectedOrder.color}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Số lượng:</Text>
                                <Text style={styles.value}>{selectedOrder.quantity}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Tổng tiền:</Text>
                                <Text style={styles.value}>{selectedOrder.total} đ</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Địa chỉ:</Text>
                                <Text style={styles.value}>{selectedOrder.address}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Ngày đặt:</Text>
                                <Text style={styles.value}>{selectedOrder.date}</Text>
                            </View>

                            <TouchableOpacity
                                style={[styles.btn, { backgroundColor: PRIMARY, marginTop: 15 }]}
                                onPress={() => setSelectedOrder(null)}
                            >
                                <Text style={{ color: "#fff", fontWeight: "700" }}>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

export default OrderHistory;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    header: { fontSize: 24, fontWeight: "700", marginBottom: 16, color: PRIMARY },
    filterRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
    filterBtn: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 12,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: PRIMARY,
    },
    filterText: { fontWeight: "600", color: PRIMARY },
    card: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
        position: "relative",
    },
    row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
    label: { fontWeight: "600", color: "#5A4A42", width: 120 },
    value: { color: "#2A2A2A", flex: 1, textAlign: "right" },
    badge: {
        position: "absolute",
        top: 10,
        right: 10,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeText: { color: "#fff", fontWeight: "700", fontSize: 12 },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 60,
    },
    emptyText: { color: "#999", fontSize: 16, marginTop: 12 },
    modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center" },
    modalBox: { width: "88%", backgroundColor: "#fff", padding: 20, borderRadius: 16, elevation: 5 },
    modalTitle: { fontSize: 20, fontWeight: "700", textAlign: "center", marginBottom: 16, color: PRIMARY },
    btn: { paddingVertical: 10, borderRadius: 10, alignItems: "center" },
});
