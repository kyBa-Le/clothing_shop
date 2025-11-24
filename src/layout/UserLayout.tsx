import { Text, TextInput, Touchable, TouchableOpacity, View } from "react-native"
import NavigationBar from "../component/NavigationBar"
import React, { useState } from "react";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";

const UserLayout = ({children}: {children: React.ReactNode}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleSearch = () => {
        navigation.navigate({name: 'Search', params: { searchQuery }});
    }

    return (
        <View style={{flex: 1}}>
            <NavigationBar/>
            <View style={{height: 40, justifyContent: 'center', alignItems: "flex-end", backgroundColor: 'transparent'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#f89898ff', borderRadius: 20, paddingHorizontal: 10, width: '50%', height: 30, backgroundColor: 'white'}}>
                    <TextInput style={{height: 40,paddingLeft: 8, width: '90%'}} value={searchQuery} onChangeText={setSearchQuery} placeholder="Nhập tên sản phẩm" />
                    <TouchableOpacity onPress={handleSearch}>
                        <FontAwesome6Icon name="magnifying-glass" size={20} color="#f89898ff" />
                    </TouchableOpacity>
                </View>
            </View>
            {children}
        </View>
    )
}

export default UserLayout;