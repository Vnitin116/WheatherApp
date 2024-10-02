import { FlatList, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { weatherApi } from '../Constants/Wheather'
import axios from 'react-native-axios';
const ForecastScreen = (props) => {
    useEffect(() => {
        getWeatherForecast()
    }, [])
    const { currentLocation } = props.route.params
    const { latitude, longitude } = currentLocation.coords
    const [weatherData, setWeatherData] = useState('')
    console.log(weatherData)
    const [loading, setLoading] = useState(false)
    const getWeatherForecast = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${weatherApi}`); 4
            setWeatherData(response.data.list);
            setLoading(true)
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <View style={styles.mainView}>
            {
                loading ?
                    <Text style={styles.mainHeader}>Weekly Weather forecast</Text> :
                    <ActivityIndicator style={{ alignSelf: "center", position: "absolute", top: "50%" }} size={'large'} color={'#00308F'} />

            }
            <FlatList
                data={weatherData}
                renderItem={(item) => {
                    return (
                        <View style={{ justifyContent: "center", elevation: 5, justifyContent: "center", backgroundColor: "white", marginBottom: 10, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "95%", alignSelf: "center" }}>
                            <View>
                                <Text style={{ fontSize: 15 }}>
                                    Temp :{Math.round(item.item.main.feels_like) - 273} °C
                                </Text>
                                <Text style={{ fontSize: 15 }}>
                                    Wind :{(item.item.wind.speed)} m/s
                                </Text>
                            </View>
                            <View>
                                <Image source={{ uri: `http://openweathermap.org/img/w/${item.item.weather[0]?.icon}.png` }} style={{ height: 40, width: 40, }} />
                                <Text>
                                    {item.item.weather[0].main.toUpperCase()}
                                </Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 15 }}>
                                    {item.item.dt_txt.slice(10, 16)}
                                </Text>
                                <Text style={{ fontSize: 15 }}>
                                    {item.item.dt_txt.slice(0, 10)}
                                </Text>
                            </View>
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default ForecastScreen

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    mainHeader: {
        fontSize: 30,
        fontWeight: "bold",
        color: "black",
        textAlign: 'center',
        marginTop: 10,
    },

})