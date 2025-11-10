import { Image, StyleSheet, Text, View } from "react-native"

const Banner = () => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={{color: "white", fontWeight: "bold"}}>ƯU ĐÃI GIÁNG SINH</Text>
                <Text style={{color: "#fd7f44ff", fontWeight: "bold", fontSize: 22}}>GIẢM 50%</Text>
                <Text style={{color: "white", fontWeight: "bold"}}>CHO ĐƠN HÀNG TRÊN 500K</Text>
            </View>
            <Image source={require('../assest/banner.jpg')} style={styles.image} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 30
    },
    content: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 1,
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
        
        
    }
})

export default Banner;