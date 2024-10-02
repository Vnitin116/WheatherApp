import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Button from '../Constants/Button'
import { useNavigation } from '@react-navigation/native'

const Splash = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.mainDiv}>
            <Image source={require('../Assests/SplashLogo.png')} style={styles.mainLogo} />
            <Button name={'Continue'} onClick={()=>navigation.replace('Home')} />
        </View>
    )
}

export default Splash
const styles = StyleSheet.create({
    mainDiv: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    mainLogo: {
        width: 150,
        height: 150
    }
})