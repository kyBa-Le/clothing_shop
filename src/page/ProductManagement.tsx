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
} from "react-native";
import { Product } from "../type/ProductType";

const CARD_MARGIN = 10;
const CARD_WIDTH = 160;
const numberOfColumns = 2;

const ProductManagement = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [formVisible, setFormVisible] = useState(false);
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
        } catch (err) {
            Alert.alert("Error", "Không thể tải sản phẩm!");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const toggleForm = () => {
        clearForm();
        setFormVisible(!formVisible);
    };

    const clearForm = () => {
        setEditingProduct(null);
        setNameInput("");
        setPriceInput("");
        setImageInput("");
        setCategoryInput("");
    };

    const handleAdd = async () => {
        if (!nameInput || !priceInput || !imageInput || !categoryInput) {
            Alert.alert("Lỗi", "Vui lòng nhập tất cả các thông tin sản phẩm");
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
            setFormVisible(false);
        } catch (err) {
            Alert.alert("Error", "Không thể thêm sản phẩm!");
        }
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setNameInput(product.name);
        setPriceInput(product.price.toString());
        setImageInput(product.image);
        setCategoryInput(product.category_id.toString());
        setFormVisible(true);
    };

    const handleSaveEdit = async () => {
        if (!editingProduct) return;
        try {
            console.log("Updating product:", editingProduct.id);
            const updatedProduct: Product = {
                ...editingProduct,
                name: nameInput,
                price: parseFloat(priceInput),
                image: imageInput,
                category_id: parseInt(categoryInput),
            };
            await updateProductService(updatedProduct);
            await loadProducts();
            clearForm();
            setFormVisible(false);
        } catch (err) {
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
                    } catch (err) {
                        console.error("Failed to delete product:", err);
                        Alert.alert("Error", "Không thể xóa sản phẩm!");
                    }
                },
            },
        ]);
    };

    const renderProductItem = ({ item }: { item: Product }) => (
        console.log("Rendering product item:", item),
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardPrice}>{item.price.toLocaleString()}₫</Text>
            <Text style={styles.cardDesc}>Category ID: {item.category_id}</Text>
            <View style={styles.cardButtons}>
                <TouchableOpacity style={styles.editBtn} onPress={() => handleEdit(item)}>
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
        <FlatList
            data={products}
            renderItem={renderProductItem}
            keyExtractor={(item, index) => (item?.id ? item.id.toString() : index.toString())}
            numColumns={numberOfColumns}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={{ padding: 10, paddingBottom: 50 }}
            ListHeaderComponent={
                <>
                    <Text style={styles.title}>Quản lý sản phẩm</Text>
                    <TouchableOpacity style={[styles.button, { backgroundColor: "#FF6B6B" }]} onPress={toggleForm}>
                        <Text style={styles.buttonText}>{formVisible ? "Ẩn Form" : "Thêm sản phẩm mới"}</Text>
                    </TouchableOpacity>
                    {formVisible && (
                        <View style={styles.form}>
                            <TextInput
                                placeholder="Tên sản phẩm"
                                value={nameInput}
                                onChangeText={setNameInput}
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="Giá sản phẩm"
                                value={priceInput}
                                onChangeText={setPriceInput}
                                keyboardType="numeric"
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="URL ảnh sản phẩm"
                                value={imageInput}
                                onChangeText={setImageInput}
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="Category ID"
                                value={categoryInput}
                                onChangeText={setCategoryInput}
                                keyboardType="numeric"
                                style={styles.input}
                            />
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: editingProduct ? "#4ECDC4" : "#FF6B6B" }]}
                                onPress={editingProduct ? handleSaveEdit : handleAdd}
                            >
                                <Text style={styles.buttonText}>{editingProduct ? "Lưu thay đổi" : "Thêm sản phẩm"}</Text>
                            </TouchableOpacity>
                            {editingProduct && (
                                <TouchableOpacity style={styles.cancelBtn} onPress={clearForm}>
                                    <Text style={{ color: "#fff" }}>Hủy</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                </>
            }
        />
    );
};

export default ProductManagement;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 5, backgroundColor: "#f5f5f5" },
    centered: { flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 50 },
    title: { fontSize: 26, fontWeight: "bold", marginBottom: 16, textAlign: "center", color: "#333" },
    button: { paddingVertical: 16, borderRadius: 12, alignItems: "center", marginBottom: 10 },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
    form: { marginVertical: 12 },
    input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 10, backgroundColor: "#fff" },
    cancelBtn: { backgroundColor: "#555", paddingVertical: 14, borderRadius: 12, alignItems: "center", marginBottom: 10 },
    card: { width: CARD_WIDTH, margin: CARD_MARGIN, backgroundColor: "#fff", borderRadius: 12, padding: 12, elevation: 3, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4 },
    cardImage: { width: "100%", height: 100, borderRadius: 8, marginBottom: 6 },
    cardTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
    cardPrice: { fontSize: 14, color: "#FF6B6B", marginBottom: 4 },
    cardDesc: { fontSize: 12, color: "#777", marginBottom: 8 },
    cardButtons: { flexDirection: "row", justifyContent: "space-between" },
    editBtn: { backgroundColor: "#4ECDC4", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
    deleteBtn: { backgroundColor: "#FF6B6B", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
    btnText: { color: "#fff", fontWeight: "600" },
    columnWrapper: { justifyContent: "space-between", alignItems: "center", alignContent: "center" },
});
