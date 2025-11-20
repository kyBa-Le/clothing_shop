import { Text, View } from "react-native"
import NavigationBar from "../component/NavigationBar"
import React from "react";

const UserLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <View style={{flex: 1}}>
            <NavigationBar/>
            <View style={{height: 40, justifyContent: 'center', alignItems: "flex-end", backgroundColor: 'transparent'}}>
                <Text style={{marginHorizontal: 20, fontWeight: 'bold'}}>Home</Text>
            </View>
            {children}
        </View>
    )
}

export default UserLayout;