import {
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
} from "react-native";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import { useCallback, useEffect, useState } from "react";
import { CategoryType } from "../type/CategoryType";
import { getCategories } from "../service/CategoryService";

const CategoryItem = ({ id, name }: CategoryType) => {
    return (
        <View style={styles.card}>
            <Text style={styles.label}>ID Danh mục:</Text>
            <Text style={styles.value}>{id}</Text>

            <Text style={styles.label}>Tên danh mục:</Text>
            <TextInput value={name} editable={false} style={styles.input} />

            <TouchableOpacity style={styles.editBtn}>
                <FontAwesome6Icon name="pencil" size={20} color="#50E3C2" />
            </TouchableOpacity>
        </View>
    );
};

const CategroyManagement = () => {
    const [categories, setCategories] = useState<CategoryType[]>([]);

    const fetchCategories = useCallback(async () => {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={() => (
                    <View style={styles.header}>
                        <View style={styles.iconCircle}>
                            <FontAwesome6Icon name="tag" size={30} color="#fff" />
                        </View>
                        <Text style={styles.headerTitle}>Quản lý danh mục</Text>
                    </View>
                )}
                data={categories}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <CategoryItem {...item} />}
                contentContainerStyle={{ paddingBottom: 30 }}
            />
        </View>
    );
};

export default CategroyManagement;

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
        borderLeftColor: "#50C878", // colorful left accent stripe
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
    editBtn: {
        position: "absolute",
        top: 14,
        right: 14,
        padding: 6,
    },
});
