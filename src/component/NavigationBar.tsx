import React, { useContext, useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import { RootStackParamList } from '../../App';
import { logout } from '../service/AuthService';
import type { NavigationProp } from '@react-navigation/native';
import { AuthContext } from './AuthContext';

const NavigationBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, setUser } = useContext(AuthContext);
    console.log("NavigationBar user:", user);

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    const navigateAndClose = (screen: Exclude<keyof RootStackParamList, 'Search' | 'Detail' | 'Checkout'>) => {
        navigation.navigate(screen);
        setIsMenuOpen(false);
    };

    const handleLogout = async () => {
        await logout({ setUser });
        toggleMenu();
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' as never }],
        });
    };

    return (
        <View style={styles.container}>
            {!isMenuOpen ? (
                <TouchableOpacity
                    onPress={toggleMenu}
                    accessibilityLabel="Mở menu điều hướng"
                    accessibilityRole="button">
                    <FontAwesome6 name="bars" size={22} color="white" />
                </TouchableOpacity>
            ) : (
                <View style={styles.menu}>
                    <MenuItem onPress={() => navigation.navigate('Main')}>
                        Trang chủ
                    </MenuItem>
                    {user != null ? (
                        <MenuItem onPress={handleLogout}>Đăng xuất</MenuItem>
                    ) : (
                        <MenuItem onPress={() => navigateAndClose('Login')}>
                            Đăng nhập
                        </MenuItem>
                    )}

                    <MenuItem onPress={toggleMenu}>
                        Đóng
                    </MenuItem>
                </View>
            )}
        </View>
    );
};

const MenuItem: React.FC<{
    onPress: () => void;
    children: string;
    style?: object;
}> = ({ onPress, children, style }) => (
    <TouchableOpacity
        onPress={onPress}
        style={[styles.menuItem, style]}
        accessibilityRole="button"
        accessibilityLabel={children}>
        <Text style={[styles.menuText, style]}>{children}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 5,
        left: 12,
        zIndex: 999,
        backgroundColor: '#f89898ff',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    menu: {
        minWidth: 180,
    },
    menuItem: {
        paddingVertical: 10,
        paddingHorizontal: 4,
    },
    menuText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '600',
    },
});

export default NavigationBar;