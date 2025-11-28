import {
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
    Alert,
    Modal
} from "react-native";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import { useCallback, useEffect, useState } from "react";
import { CategoryType } from "../type/CategoryType";
import { getCategories, updateCategory, deleteCategory, addCategory } from "../service/CategoryService";


const CategoryItem = ({ id, name, onCategoryUpdated }: CategoryType & { onCategoryUpdated: () => void }) => {
    const [editedName, setEditedName] = useState(name);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdate = async () => {
        const updatedCategory: CategoryType = { id, name: editedName };
        await updateCategory(updatedCategory);
        onCategoryUpdated();
    };

    const handleDelete = async () => {
        Alert.alert("Xác nhận", "Bạn có chắc chắn muốn xóa danh mục này?", [
            { text: "Hủy", style: "cancel" },
            {
                text: "Xóa",
                onPress: async () => {
                    await deleteCategory(id);
                    onCategoryUpdated();
                },
                style: "destructive",
            },
        ]);
    };

    return (
        <View style={styles.card}>
            <Text style={styles.label}>ID Danh mục:</Text>
            <Text style={styles.value}>{id}</Text>

            <Text style={styles.label}>Tên danh mục:</Text>
            <TextInput
                value={editedName}
                onChangeText={setEditedName}
                editable={isUpdating}
                style={styles.input}
            />

            {!isUpdating && (
                <TouchableOpacity style={styles.editBtn} onPress={() => setIsUpdating(true)}>
                    <FontAwesome6Icon name="pencil" size={20} color="#50E3C2" />
                </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
                <FontAwesome6Icon name="trash" size={20} color="#FF3B30" />
            </TouchableOpacity>

            {isUpdating && (
                <View style={styles.btnRow}>
                    <TouchableOpacity
                        style={[styles.btn, styles.confirmBtn]}
                        onPress={async () => {
                            await handleUpdate();
                            setIsUpdating(false);
                        }}
                    >
                        <FontAwesome6Icon name="check" size={18} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.btn, styles.cancelBtn]}
                        onPress={() => {
                            setEditedName(name);
                            setIsUpdating(false);
                        }}
                    >
                        <FontAwesome6Icon name="xmark" size={18} color="#fff" />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};


const AddCategoryModal = ({
    visible,
    onClose,
    onAdded,
}: {
    visible: boolean;
    onClose: () => void;
    onAdded: () => void;
}) => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");

    const handleConfirm = async () => {
        const newCategory: CategoryType = {
            id: Number(id),
            name,
        };

        await addCategory(newCategory);

        onAdded();
        onClose();
        setId("");
        setName("");
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.modalOverlay}>
                <View style={styles.modalBox}>
                    <Text style={styles.modalTitle}>Thêm danh mục mới</Text>

                    <Text style={styles.label}>ID:</Text>
                    <TextInput
                        value={id}
                        onChangeText={setId}
                        keyboardType="numeric"
                        style={styles.input}
                        placeholder="Nhập ID"
                        placeholderTextColor={"#8aa0c0"}
                    />

                    <Text style={styles.label}>Tên danh mục:</Text>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                        placeholder="Nhập tên danh mục"
                        placeholderTextColor={"#8aa0c0"}
                    />

                    <View style={styles.btnRow}>
                        <TouchableOpacity
                            style={[styles.btn, styles.confirmBtn]}
                            onPress={handleConfirm}
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



const CategoryManagement = () => {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);

    const fetchCategories = useCallback(async () => {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return (
        <View style={styles.container}>
            <AddCategoryModal
                visible={showAddModal}
                onClose={() => setShowAddModal(false)}
                onAdded={fetchCategories}
            />

            <FlatList
                ListHeaderComponent={() => (
                    <View style={styles.header}>
                        <View style={styles.iconCircle}>
                            <FontAwesome6Icon name="tag" size={30} color="#fff" />
                        </View>
                        <Text style={styles.headerTitle}>Quản lý danh mục</Text>

                        {/* Add Button */}
                        <TouchableOpacity
                            style={styles.addBtn}
                            onPress={() => setShowAddModal(true)}
                        >
                            <FontAwesome6Icon name="plus" size={24} color="#50C878" />
                            <Text style={{ marginLeft: 8, color: "#50C878", fontWeight: "600" }}>
                                Thêm danh mục mới
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
                data={categories}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <CategoryItem {...item} onCategoryUpdated={fetchCategories} />
                )}
                contentContainerStyle={{ paddingBottom: 30 }}
            />
        </View>
    );
};

export default CategoryManagement;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#ECF3FF",
    },
    header: {
        alignItems: "center",
        marginBottom: 24,
    },
    iconCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#50C878",
        justifyContent: "center",
        alignItems: "center",
        elevation: 4,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "800",
        marginTop: 12,
        color: "#2A3749",
    },
    addBtn: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 12,
    },

    /* Card Styles */
    card: {
        backgroundColor: "#ffffff",
        padding: 18,
        borderRadius: 14,
        marginBottom: 16,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.07,
        shadowRadius: 6,
        borderLeftWidth: 6,
        borderLeftColor: "#50C878",
    },
    label: {
        fontSize: 13,
        fontWeight: "600",
        color: "#4A4A4A",
        marginTop: 4,
    },
    value: {
        fontSize: 16,
        color: "#2A3749",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#D3E1FF",
        backgroundColor: "#F6FAFF",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        marginBottom: 10,
        fontSize: 15,
        color: "#2A3749",
    },

    /* Buttons */
    editBtn: {
        position: "absolute",
        top: 14,
        right: 14,
        padding: 6,
    },
    deleteBtn: {
        position: "absolute",
        top: 14,
        right: 50,
        padding: 6,
    },
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
        flexDirection: "row",
        alignItems: "center",
    },
    confirmBtn: {
        backgroundColor: "#50C878",
    },
    cancelBtn: {
        backgroundColor: "#FF3B30",
    },

    /* Modal Styles */
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
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
        fontSize: 20,
        fontWeight: "700",
        color: "#2A3749",
        textAlign: "center",
        marginBottom: 16,
    },
});