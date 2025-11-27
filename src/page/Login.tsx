import { useContext, useEffect, useState } from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
    Alert,
    Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { login } from "../service/AuthService";
import type { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { AuthContext } from "../component/AuthContext";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        if (user != null) {
            if (user.role === 'customer') {
                console.log("Navigating to Main");
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Main" as never }],
                });
            }
        }
    }, [user]);

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleLogin = async () => {
        if (!username.trim() || !password.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ tên người dùng và mật khẩu!");
            return;
        } 
        setLoading(true);
        try {
            const success = await login(username.trim(), password);
            if (success != null) {
                setUser(success);
            }
            else {
                Alert.alert("Lỗi đăng nhập", "Tên đăng nhập hoặc mật khẩu không đúng.");
            }
        } catch (error) {
            Alert.alert("Lỗi", "Đã có lỗi xảy ra. Vui lòng thử lại sau.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>

            {/* Background Image */}
            <Image
                source={require("../asset/login-background.jpg")}
                style={styles.backgroundImage}
            />

            {/* Dark overlay */}
            <View style={styles.overlay} />

            {/* Foreground Content */}
            <View style={styles.card}>
                <Text style={styles.title}>Đăng Nhập</Text>

                <Text style={styles.label}>Tên người dùng</Text>
                <TextInput
                    placeholder="Nhập tên người dùng"
                    style={styles.input}
                    placeholderTextColor="#bbb"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    editable={!loading}
                />

                <Text style={styles.label}>Mật khẩu</Text>
                <TextInput
                    placeholder="Nhập mật khẩu"
                    secureTextEntry
                    style={styles.input}
                    placeholderTextColor="#bbb"
                    value={password}
                    onChangeText={setPassword}
                    editable={!loading}
                />

                <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </Text>
                </TouchableOpacity>

                <View style={styles.signupRow}>
                    <Text style={styles.signupText}>Chưa có tài khoản?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                        <Text style={styles.signupLink}> Đăng ký ngay</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },

    backgroundImage: {
        ...StyleSheet.absoluteFill,
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },

    overlay: {
        ...StyleSheet.absoluteFill,
        backgroundColor: "rgba(0, 0, 0, 0.45)",
    },

    card: {
        marginHorizontal: 25,
        padding: 25,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        borderRadius: 15,
        elevation: 7,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 8,
    },

    title: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 25,
        color: "#222",
    },

    label: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
        marginBottom: 6,
        marginTop: 12,
    },

    input: {
        height: 48,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        paddingHorizontal: 14,
        backgroundColor: "#fff",
        fontSize: 15,
    },

    button: {
        marginTop: 25,
        backgroundColor: "#f89898",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
    },

    buttonDisabled: {
        backgroundColor: "#bbb",
    },

    buttonText: {
        color: "white",
        fontSize: 17,
        fontWeight: "bold",
    },

    signupRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 18,
    },

    signupText: {
        color: "#333",
        fontSize: 14,
    },

    signupLink: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#007BFF",
    },
});
