import { useContext, useEffect, useState } from "react";
import { Image, Text, View, StyleSheet, Alert, TouchableOpacity, TextInput, Modal, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../component/AuthContext";
import { updateUser } from "../service/UserService";

const PRIMARY = "#FFB020";

const Profile = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigation = useNavigation();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        if (!user) {
            Alert.alert("Vui lòng đăng nhập để xem trang cá nhân.");
            navigation.reset({
                index: 0,
                routes: [{ name: "Login" as never }],
            });
        } else {
            setUsername(user.username);
            setEmail(user.email);
            setPhone(user.phone);
        }
    }, [user, navigation]);

    const handleUpdateInfo = async () => {
        if (!user) return;

        await updateUser({
            id: user.id,
            username,
            email,
            phone,
        });

        Alert.alert("Cập nhật thành công!");
        setUser({ ...user, username, email, phone });
    };

    const handleUpdatePassword = async () => {
        if (!user) return;

        if (oldPassword !== user.password) {
            Alert.alert("Sai mật khẩu cũ", "Vui lòng nhập đúng mật khẩu hiện tại.");
            return;
        }

        if (!newPassword) {
            Alert.alert("Lỗi", "Mật khẩu mới không được để trống.");
            return;
        }

        await updateUser({
            id: user.id,
            username: user.username,
            password: newPassword,
            email: user.email,
            phone: user.phone,
        });

        Alert.alert("Mật khẩu đã được cập nhật!");
        setNewPassword("");
        setOldPassword("");
        setShowPasswordModal(false);
    };

    return (
        <>
            {user ? (
                <View style={styles.container}
                >
                        <Text style={styles.title}>Profile</Text>

                        <Image
                            style={styles.avatar}
                            source={{
                                uri: "https://static.vecteezy.com/system/resources/thumbnails/032/176/191/small/business-avatar-profile-black-icon-man-of-user-symbol-in-trendy-flat-style-isolated-on-male-profile-people-diverse-face-for-social-network-or-web-vector.jpg",
                            }}
                        />

                        <View style={styles.infoCard}>
                            <Text style={styles.fieldLabel}>Username</Text>
                            <TextInput
                                value={username}
                                onChangeText={setUsername}
                                style={styles.fieldValueInput}
                            />

                            <Text style={styles.fieldLabel}>Email</Text>
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                style={styles.fieldValueInput}
                            />

                            <Text style={styles.fieldLabel}>Phone</Text>
                            <TextInput
                                value={phone}
                                onChangeText={setPhone}
                                style={styles.fieldValueInput}
                                keyboardType="phone-pad"
                            />

                            <TouchableOpacity
                                style={styles.updateBtn}
                                onPress={handleUpdateInfo}
                            >
                                <Text style={styles.updateBtnText}>Cập nhật thông tin</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.updateBtn, { backgroundColor: "#FF6B6B" }]}
                                onPress={() => setShowPasswordModal(true)}
                            >
                                <Text style={styles.updateBtnText}>Cập nhật mật khẩu</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Password Modal */}
                        <Modal visible={showPasswordModal} transparent animationType="fade">
                            <KeyboardAvoidingView
                                style={{ flex: 1 }}
                                behavior={Platform.OS === "ios" ? "padding" : undefined}
                                keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
                            >
                                <ScrollView contentContainerStyle={styles.modalOverlay} keyboardShouldPersistTaps="handled">
                                    <View style={styles.modalBox}>
                                        <Text style={styles.modalTitle}>Cập nhật mật khẩu</Text>

                                        <Text style={styles.fieldLabel}>Mật khẩu cũ</Text>
                                        <TextInput
                                            placeholder="Nhập mật khẩu hiện tại"
                                            value={oldPassword}
                                            onChangeText={setOldPassword}
                                            secureTextEntry
                                            style={styles.fieldValueInput}
                                        />

                                        <Text style={styles.fieldLabel}>Mật khẩu mới</Text>
                                        <TextInput
                                            placeholder="Nhập mật khẩu mới"
                                            value={newPassword}
                                            onChangeText={setNewPassword}
                                            secureTextEntry
                                            style={styles.fieldValueInput}
                                        />

                                        <View style={styles.btnRow}>
                                            <TouchableOpacity
                                                style={[styles.btn, { backgroundColor: PRIMARY }]}
                                                onPress={handleUpdatePassword}
                                            >
                                                <Text style={{ color: "#fff" }}>Xác nhận</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[styles.btn, { backgroundColor: "#FF3B30" }]}
                                                onPress={() => setShowPasswordModal(false)}
                                            >
                                                <Text style={{ color: "#fff" }}>Hủy</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </ScrollView>
                            </KeyboardAvoidingView>
                        </Modal>
                </View>
            ) : (
                <View style={styles.container}>
                    <TouchableOpacity
                        style={{ padding: 10 }}
                        onPress={() => navigation.navigate("Login" as never)}
                    >
                        <Text style={{ fontSize: 18, color: "#007BFF" }}>Vui lòng đăng nhập để xem trang cá nhân</Text>
                    </TouchableOpacity>
                </View>
            )}
        </>
    );
};

export default Profile;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9f9f9",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 100,
        marginBottom: 25,
        borderWidth: 2,
        borderColor: "#ddd",
    },
    infoCard: {
        width: "85%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 12,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    fieldLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: "#444",
        marginTop: 12,
    },
    fieldValueInput: {
        fontSize: 16,
        color: "#333",
        borderBottomWidth: 1,
        borderColor: "#ddd",
        paddingBottom: 6,
    },
    updateBtn: {
        backgroundColor: PRIMARY,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 16,
        alignItems: "center",
    },
    updateBtnText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },
    /* Modal */
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalBox: {
        width: "85%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 16,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 16,
        textAlign: "center",
        color: PRIMARY,
    },
    btnRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    btn: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        flex: 1,
        marginHorizontal: 5,
    },
});