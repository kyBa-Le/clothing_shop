import {
    getProducts,
    addProduct as addProductService,
    updateProduct as updateProductService,
    deleteProduct as deleteProductService
} from "../service/ProductService";

import { useEffect, useState, useCallback } from "react";
import {
    FlatList,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    TextInput,
    Image,
    Alert,
    ActivityIndicator,
    Modal,
} from "react-native";

import { Product } from "../type/ProductType";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";

const CARD_MARGIN = 10;
const CARD_WIDTH = 160;
const numberOfColumns = 2;

const ProductManagement = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const [modalVisible, setModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const [nameInput, setNameInput] = useState("");
    const [priceInput, setPriceInput] = useState("");
    const [imageInput, setImageInput] = useState("");
    const [categoryInput, setCategoryInput] = useState("");

    const loadProducts = useCallback(async () => {
        try {
            setLoading(true);
            const fetchedProducts = await getProducts();
            setProducts(fetchedProducts);
        } catch {
            Alert.alert("Error", "Không thể tải sản phẩm!");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const openAddModal = () => {
        clearForm();
        setEditingProduct(null);
        setModalVisible(true);
    };

    const openEditModal = (product: Product) => {
        setEditingProduct(product);
        setNameInput(product.name);
        setPriceInput(product.price.toString());
        setImageInput(product.image);
        setCategoryInput(product.category_id.toString());
        setModalVisible(true);
    };

    const clearForm = () => {
        setNameInput("");
        setPriceInput("");
        setImageInput("");
        setCategoryInput("");
        setEditingProduct(null);
    };

    const handleAdd = async () => {
        if (!nameInput || !priceInput || !imageInput || !categoryInput) {
            Alert.alert("Lỗi", "Vui lòng nhập đủ thông tin sản phẩm!");
            return;
        }

        try {
            const newProduct: Product = {
                id: 0,
                name: nameInput,
                price: parseFloat(priceInput),
                image: imageInput,
                category_id: parseInt(categoryInput),
            };

            await addProductService(newProduct);
            await loadProducts();
            clearForm();
            setModalVisible(false);
        } catch {
            Alert.alert("Error", "Không thể thêm sản phẩm!");
        }
    };

    const handleSaveEdit = async () => {
        if (!editingProduct) return;

        try {
            const updated: Product = {
                ...editingProduct,
                name: nameInput,
                price: parseFloat(priceInput),
                image: imageInput,
                category_id: parseInt(categoryInput),
            };

            await updateProductService(updated);
            await loadProducts();

            clearForm();
            setModalVisible(false);
        } catch {
            Alert.alert("Error", "Không thể cập nhật sản phẩm!");
        }
    };

    const handleDelete = (productId: number) => {
        Alert.alert("Xóa sản phẩm", "Bạn có chắc muốn xóa sản phẩm này?", [
            { text: "Hủy", style: "cancel" },
            {
                text: "Xóa",
                style: "destructive",
                onPress: async () => {
                    try {
                        await deleteProductService(productId);
                        await loadProducts();
                    } catch {
                        Alert.alert("Error", "Không thể xóa sản phẩm!");
                    }
                },
            },
        ]);
    };

    const renderProductItem = ({ item }: { item: Product }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardPrice}>{item.price.toLocaleString()}₫</Text>
            <Text style={styles.cardDesc}>Category: {item.category_id}</Text>

            <View style={styles.cardButtons}>
                <TouchableOpacity style={styles.editBtn} onPress={() => openEditModal(item)}>
                    <Text style={styles.btnText}>Sửa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item.id)}>
                    <Text style={styles.btnText}>Xóa</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#555" />
                <Text style={{ marginTop: 10, color: "#555" }}>Đang tải sản phẩm...</Text>
            </View>
        );
    }

    return (
        <>
            <FlatList
                data={products}
                renderItem={renderProductItem}
                keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
                numColumns={numberOfColumns}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={{ padding: 10 }}
                ListHeaderComponent={
                    <>
                        <FontAwesome6Icon name="box-open" size={40} color="#4A90E2" style={{ alignSelf: "center", marginBottom: 10 }} />
                        <Text style={styles.title}>Quản lý sản phẩm</Text>

                        <TouchableOpacity style={styles.addBtn} onPress={openAddModal}>
                            <Text style={styles.addText}>+ Thêm sản phẩm mới</Text>
                        </TouchableOpacity>
                    </>
                }
            />

            {/* ----------------------- MODAL ------------------------- */}
            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>
                            {editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
                        </Text>

                        <TextInput
                            placeholder="Tên sản phẩm"
                            value={nameInput}
                            onChangeText={setNameInput}
                            style={styles.modalInput}
                        />
                        <TextInput
                            placeholder="Giá"
                            value={priceInput}
                            onChangeText={setPriceInput}
                            keyboardType="numeric"
                            style={styles.modalInput}
                        />
                        <TextInput
                            placeholder="URL hình ảnh"
                            value={imageInput}
                            onChangeText={setImageInput}
                            style={styles.modalInput}
                        />
                        <TextInput
                            placeholder="Category ID"
                            value={categoryInput}
                            onChangeText={setCategoryInput}
                            keyboardType="numeric"
                            style={styles.modalInput}
                        />

                        <View style={styles.modalBtnRow}>
                            <TouchableOpacity
                                style={[styles.modalBtn, { backgroundColor: "#4A90E2" }]}
                                onPress={editingProduct ? handleSaveEdit : handleAdd}
                            >
                                <Text style={styles.modalBtnText}>
                                    {editingProduct ? "Lưu" : "Thêm"}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalBtn, { backgroundColor: "#FF6B6B" }]}
                                onPress={() => { clearForm(); setModalVisible(false); }}
                            >
                                <Text style={styles.modalBtnText}>Hủy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default ProductManagement;

const styles = StyleSheet.create({
    centered: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 26, fontWeight: "bold", marginBottom: 18, textAlign: "center", color: "#333" },

    addBtn: {
        backgroundColor: "#4A90E2",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 20,
    },
    addText: { color: "#fff", fontSize: 16, fontWeight: "600" },

    card: {
        width: CARD_WIDTH,
        margin: CARD_MARGIN,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        elevation: 2,
    },
    cardImage: { width: "100%", height: 100, borderRadius: 10 },
    cardTitle: { fontSize: 16, fontWeight: "bold", marginTop: 6 },
    cardPrice: { color: "#FF6B6B", fontWeight: "600", marginTop: 4 },
    cardDesc: { color: "#777", fontSize: 12, marginTop: 4 },

    cardButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
    editBtn: { backgroundColor: "#4A90E2", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
    deleteBtn: { backgroundColor: "#FF6B6B", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
    btnText: { color: "#fff", fontWeight: "600" },

    columnWrapper: { justifyContent: "space-between" },

    // ---------------- MODAL ----------------
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "85%",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
        color: "#333",
    },
    modalInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 12,
        marginBottom: 12,
        backgroundColor: "#F9FAFB",
    },
    modalBtnRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    modalBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        marginHorizontal: 5,
        alignItems: "center",
    },
    modalBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
