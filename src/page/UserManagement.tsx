import { FlatList, Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import { UserType } from "../type/UserType";
import { Picker } from '@react-native-picker/picker';
import { useCallback, useEffect, useState } from "react";
import { deleteUserById, getAllUsers, secureAdminUseCase, updateUser } from "../service/UserService";

const PRIMARY = "#E24A4A";

const UserItem = ({ id, username, role, onUserChange }: UserType & { onUserChange: () => void }) => {
    const [selectedValue, setSelectedValue] = useState(role);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleUpdate = async () => {
        setIsUpdating(true);

        try {
            const isDefaultAdmin = await secureAdminUseCase({ username });
            if (isDefaultAdmin) {
                setIsUpdating(false);
                return;
            }
            await updateUser({ id, username, password: '', role: selectedValue as 'admin' | 'customer' });
            onUserChange();
        } catch (err) {
            console.error("Update error:", err);
        }

        setIsUpdating(false);
    };


    const handleDelete = async () => {
        setIsDeleting(true);

        try {
            const isDefaultAdmin = await secureAdminUseCase({ username });
            if (isDefaultAdmin) {
                setIsDeleting(false);
                return;
            }
            Alert.alert(
                "Xác nhận xóa",
                `Bạn có chắc chắn muốn xóa người dùng "${username}" không?`,
                [
                    {
                        text: "Hủy",
                        style: "cancel",
                        onPress: () => setIsDeleting(false),
                    },
                    {
                        text: "Xóa",
                        style: "destructive",
                        onPress: async () => {
                            try {
                                await deleteUserById(id);
                                onUserChange();
                            } catch (err) {
                                console.error("Delete error:", err);
                            }
                            setIsDeleting(false);
                        },
                    },
                ]
            );
        } catch (err) {
            console.error("Delete error:", err);
        }

        setIsDeleting(false);
    };

    return (
        <View style={[styles.card, (isUpdating || isDeleting) && styles.disabledCard]}>
            <Text style={styles.userId}>ID: {id}</Text>
            <Text style={styles.username}>{username}</Text>
            {username === 'admin' ? <Text style={{ color: 'red', marginBottom: 10 }}>Tài khoản quản trị mặc định</Text> : 
            <Picker
                enabled={!isUpdating && !isDeleting}
                selectedValue={selectedValue}
                onValueChange={(itemValue) => setSelectedValue(itemValue)}
                style={styles.picker}
                dropdownIconColor={PRIMARY}
            >
                <Picker.Item label="Admin" value="admin" />
                <Picker.Item label="Customer" value="customer" />
            </Picker>}


            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={[styles.updateBtn, isUpdating && styles.btnDisabled]}
                    onPress={handleUpdate}
                    disabled={isUpdating || isDeleting}
                >
                    {isUpdating ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.btnText}>Update</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.deleteBtn, isDeleting && styles.btnDisabled]}
                    onPress={handleDelete}
                    disabled={isUpdating || isDeleting}
                >
                    {isDeleting ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.btnText}>Delete</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const UserManagement = () => {
    const [users, setUsers] = useState<UserType[]>([]);

    const fetchedUsers = useCallback(async () => {
        const response = await getAllUsers();
        setUsers(response);
    }, []);

    useEffect(() => {
        fetchedUsers();
    }, [fetchedUsers]);

    const onUserChange = () => {
        fetchedUsers();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <FontAwesome6Icon name="users" size={30} color={PRIMARY} />
                <Text style={styles.title}>User Management</Text>
            </View>

            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <UserItem {...item} onUserChange={onUserChange} />
                )}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
};

export default UserManagement;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    header: {
        alignItems: "center",
        marginBottom: 20,
        gap: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: PRIMARY,
    },
    card: {
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    disabledCard: {
        opacity: 0.5,
    },
    userId: {
        fontSize: 12,
        color: "#666",
        marginBottom: 5,
    },
    username: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
        color: "#333",
    },
    picker: {
        height: 'auto',
        borderWidth: 1,
        borderColor: PRIMARY,
        borderRadius: 6,
        backgroundColor: "#fff",
        marginBottom: 15,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    updateBtn: {
        flex: 1,
        marginRight: 10,
        backgroundColor: PRIMARY,
        paddingVertical: 10,
        borderRadius: 6,
        alignItems: "center",
    },
    deleteBtn: {
        flex: 1,
        marginLeft: 10,
        backgroundColor: "#444",
        paddingVertical: 10,
        borderRadius: 6,
        alignItems: "center",
    },
    btnText: {
        color: "#fff",
        fontWeight: "600",
    },
    btnDisabled: {
        opacity: 0.6,
    },
});
