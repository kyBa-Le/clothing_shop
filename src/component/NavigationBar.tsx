import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native"
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { RootStackParamList } from "../../App";


const NavigationBar = () => {

    const [show, setShow] = useState(false);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleToggle = () => {
        setShow(!show);
    }

    return (
        <View style={styles.container}>
            {!show ? 
                <TouchableOpacity onPress={handleToggle}>
                    <FontAwesome6 name="bars" size={18} color="rgba(0, 0, 0, 1)" />
                </TouchableOpacity> 
                :
                <View >
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Home');
                        handleToggle();
                    }} >
                        <Text style={styles.navigationItem}>Trang chủ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Category');
                        handleToggle();
                    }}>
                        <Text style={styles.navigationItem}>Danh mục sản phẩm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleToggle}>
                        <Text style={styles.navigationItem}>Đóng</Text>
                    </TouchableOpacity>
                </View>
            }
            

            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 5,
        left: 10,
        zIndex: 999,
        paddingHorizontal: 10,
        paddingVertical: 3,
        backgroundColor: '#ffe4e4ff',
        borderRadius: 2,
    },
    navigationItem: {
        color: "rgba(0, 0, 0, 1)",
        fontWeight: "bold",
        fontSize: 14,
        paddingVertical: 10,
    }

})

export default NavigationBar;