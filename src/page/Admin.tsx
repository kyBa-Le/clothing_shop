import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

const Admin = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>👑 Chào mừng đến với trang quản trị</Text>

            <View style={styles.gridContainer}>
                <GridItem label="Quản lý sản phẩm" color="#4A90E2" page="ProductManagement" />
                <GridItem label="Quản lý danh mục" color="#50C878" page="CategoryManagement" />
                <GridItem label="Quản lý đơn hàng" color="#FFB020" page="OrderManagement" />
                <GridItem label="Quản lý người dùng" color="#E24A4A" page="UserManagement" />
            </View>

            <TouchableOpacity style={styles.logoutBtn}>
                <Text style={styles.logoutText}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
};

type GridItemProps = {
    label: string;
    color: string;
    page: string;
};

const GridItem = ({ label, color, page }: GridItemProps) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => {navigation.navigate(page as never)}} style={[styles.gridItem, { backgroundColor: color }]}>
            <Text style={styles.gridText}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        fontSize: 22,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 30,
        color: "#222",
    },

    gridContainer: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 40,
    },

    gridItem: {
        width: "48%",
        height: 120,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
        marginVertical: 10,
    },

    gridText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        textAlign: "center",
    },

    logoutBtn: {
        backgroundColor: "#ff4d4d",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        elevation: 2,
    },

    logoutText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "700",
    },
});

export default Admin;
