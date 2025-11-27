import { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet, Alert } from "react-native";
import { isUserLoggedIn } from "../service/AuthService";
import { UserType } from "../type/UserType";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
    const [user, setUser] = useState<UserType | null>(null);
    const navigation = useNavigation();

    useEffect(() => {
        const getLoggedInUser = async () => {
            const result = await isUserLoggedIn();
            if (result) {
                setUser(result);
            } else {
                Alert.alert("Bạn chưa đăng nhập", "Vui lòng đăng nhập để xem trang cá nhân.");
                navigation.navigate("Login" as never);
            }
        };
        getLoggedInUser();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>

            {user ? (
                <View>
                    <Image
                        style={styles.avatar}
                        source={{
                            uri: "https://static.vecteezy.com/system/resources/thumbnails/032/176/191/small/business-avatar-profile-black-icon-man-of-user-symbol-in-trendy-flat-style-isolated-on-male-profile-people-diverse-face-for-social-network-or-web-vector.jpg",
                        }}
                    />

                    <View style={styles.infoCard}>
                        <Text style={styles.fieldLabel}>Username</Text>
                        <Text style={styles.fieldValue}>{user?.username ?? ""}</Text>

                        <Text style={styles.fieldLabel}>Birthday</Text>
                        <Text style={styles.fieldValue}></Text>

                        <Text style={styles.fieldLabel}>Email</Text>
                        <Text style={styles.fieldValue}></Text>

                        <Text style={styles.fieldLabel}>Phone</Text>
                        <Text style={styles.fieldValue}></Text>
                    </View>
                </View>
            ) : (
                <Text>Vui lòng đăng nhập để xem trang cá nhân.</Text>
            )}
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 40,
        backgroundColor: "#f9f9f9",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
    },
    avatar: {
        width: 130,
        height: 130,
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
    fieldValue: {
        fontSize: 16,
        color: "#f89898ff",
        borderBottomWidth: 1,
        borderColor: "#ddd",
        paddingBottom: 6,
    },
});
