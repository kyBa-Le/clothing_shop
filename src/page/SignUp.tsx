import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Alert } from "react-native";
import { createUser, isUsernameTaken } from "../service/UserService";
import { useNavigation } from "@react-navigation/native";
import { login } from "../service/AuthService";

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();

    const validateInformation = async () => {
        if (!username || !password || !confirmPassword) {
            Alert.alert("Vui lòng điền đầy đủ thông tin!");
            return false;
        }
        if (await isUsernameTaken(username)) {
            Alert.alert("Vui lòng chọn tên người dùng khác!");
            return false;
        }
        if (password !== confirmPassword) {
            Alert.alert("Mật khẩu xác nhận không khớp!");
            return false;
        }
        return true;
    }

    const handleSignUp = async () => {
        const isValid = await validateInformation();
        if (!isValid) return;

        await createUser({username, password, role: 'customer'});
        await login(username, password);
        navigation.navigate('Main' as never);
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Đăng Ký Tài Khoản</Text>
            <Text style={styles.label}>Tên người dùng</Text>
            <TextInput
                placeholder="Vui lòng nhập tên người dùng"
                style={styles.input}
                placeholderTextColor="#bbb"
                value={username}
                onChangeText={setUsername}
            />

            <Text style={styles.label}>Mật khẩu</Text>
            <TextInput
                placeholder="Vui lòng nhập mật khẩu"
                secureTextEntry={true}
                style={styles.input}
                placeholderTextColor="#bbb"
                value={password}
                onChangeText={setPassword}
            />

            <Text style={styles.label}>Xác nhận mật khẩu</Text>
            <TextInput
                placeholder="Vui lòng xác nhận mật khẩu"
                secureTextEntry={true}
                style={styles.input}
                placeholderTextColor="#bbb"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Đăng ký</Text>
            </TouchableOpacity>
            <View style={styles.loginRow}>
                <Text style={styles.loginText}>Đã có tài khoản?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
                    <Text style={styles.loginLink}> Đăng nhập</Text>
                </TouchableOpacity>
            </View>

        </View >
    );
};

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f4f4",
        padding: 20,
        justifyContent: "center",
    },

    label: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
        marginBottom: 6,
        marginTop: 12,
    },

    input: {
        height: 45,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: "white",
    },

    button: {
        marginTop: 25,
        backgroundColor: "#f89898ff",
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
    },

    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
    loginRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 15,
        alignItems: "center",
    },

    loginText: {
        fontSize: 14,
        color: "#444",
    },

    loginLink: {
        fontSize: 14,
        color: '#007BFF',
        fontWeight: 'bold',
    }

});
