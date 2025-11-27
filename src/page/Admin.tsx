import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { logout } from "../service/AuthService";
import { AuthContext } from "../component/AuthContext";
import { useContext, useEffect } from "react";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import { RootStackParamList } from "../../App";

const Admin = () => {
    const navigation = useNavigation();
    const { user, setUser } = useContext(AuthContext);

    const handleLogout = async () => {
        await logout({ setUser });
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' as never }],
        });
    }

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Main' as never }],
            });
        }
    }, [user, navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chào mừng đến với trang quản trị</Text>

            <View style={styles.gridContainer}>
                <GridItem label="Quản lý sản phẩm" color="#4A90E2" page="ProductManagement" icon="box" />
                <GridItem label="Quản lý danh mục" color="#50C878" page="CategoryManagement" icon="tags" />
                <GridItem label="Quản lý đơn hàng" color="#FFB020" page="OrderManagement" icon="basket-shopping" />
                <GridItem label="Quản lý người dùng" color="#E24A4A" page="UserManagement" icon="users" />
            </View>

            <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
                <Text style={styles.logoutText}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
};

type GridItemProps = {
    label: string;
    color: string;
    page: string;
    icon: string;
};

const GridItem = ({ label, color, page, icon }: GridItemProps) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    return (
        <TouchableOpacity onPress={() => {navigation.navigate(page as never)}} style={[styles.gridItem, { backgroundColor: color }]}>
            <FontAwesome6Icon name={icon} size={32} color="#fff" />
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
