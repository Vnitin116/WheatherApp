import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
export const Button = ({ name, onClick }) => {
    return (
        <TouchableOpacity style={styles.buttonStyle} onPress={onClick}>
            <Text style={styles.buttonTextStyle}>{name}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: "#00308F",
        height: 50,
        marginTop: 25,
        justifyContent: "center",
        alignItems: "center",
        width: "45%",
        borderRadius: 10,
    },
    buttonTextStyle: {
        color: "white", fontSize: 16,
        fontWeight: "500"
    }
})