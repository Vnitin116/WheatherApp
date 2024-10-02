import { Image, StyleSheet, Text, View, TextInput, Touchable, TouchableOpacity } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useState } from 'react';
import { weatherApi } from '../Constants/Wheather';
import axios from 'react-native-axios';
import Button from '../Constants/Button';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation()
    const [currentLocation, setCurrentLocation] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [searchData, setSearchData] = useState('')
    console.log(searchData)

    useEffect(() => {
        getCurrentLocation();
    }, []);


    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(info => {
            setCurrentLocation(info);
            if (info.coords) {
                getCurrentWeather(info.coords.latitude, info.coords.longitude, weatherApi);
            }
        });
    };


    const getCurrentWeather = async (latitude, longitude, apiKey) => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
            console.log(response.data)
            setWeatherData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getCurrentWeatherUsingName = async () => {
        console.log('function Triggered')
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchData}&&appid=${weatherApi}`);
            setWeatherData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.mainView}>
            <View style={{ width: "100%", flexDirection: 'row', backgroundColor: "white", elevation: 1, borderRadius: 10, marginTop: 10 }}>
                <TextInput
                    placeholder='Search'
                    value={searchData}
                    onChangeText={(txt) => setSearchData(txt)}
                    style={{ width: "85%" }}
                />
                <TouchableOpacity style={{ backgroundColor: "blue", width: "15%", borderRadius: 5 , justifyContent: "center", alignItems: 'center',}} onPress={() => getCurrentWeatherUsingName()}>
                    <Image source={require('../Assests/searchIcon.png')} style={{ tintColor: "white",height: 25, width: 25 }} />
                </TouchableOpacity>
            </View>

            <Text style={styles.header}>
                {weatherData ? weatherData.name : 'Loading...'}
            </Text>
            <View style={{ alignItems: 'center' }}>
                <Text>
                    {weatherData?.weather[0]?.description?.toUpperCase()}
                </Text>
                <Image
                    source={{ uri: `http://openweathermap.org/img/w/${weatherData?.weather[0]?.icon}.png` }} style={{ height: 80, width: 80 }} />

            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={styles.divWithInfo}>
                    <Text>Current Temp</Text>
                    <Text>{weatherData ? `${Math.round(weatherData.main.temp) - 273} °C` : 'Loading...'}</Text>
                </View>

                <View style={styles.divWithInfo}>
                    <Text>Pressure</Text>
                    <Text>{weatherData ? `${weatherData.main.pressure}` : 'Loading...'}</Text>
                </View>

            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={styles.divWithInfo}>
                    <Text>Humidity</Text>
                    <Text>{weatherData ? `${weatherData.main.humidity} %` : 'Loading...'}</Text>
                </View>


                <View style={styles.divWithInfo}>
                    <Text>Wind Speed</Text>
                    <Text>{weatherData ? `${weatherData?.wind.speed} m/s` : 'Loading...'}</Text>
                </View>

            </View>
            <View style={{ height: 100, width: "100%", position: "absolute", bottom: 10, alignSelf: "center", alignItems: "center" }}>
                <Button name={'See Forecast'} onClick={() => navigation.navigate('ForeCastScreen', { currentLocation })} />
            </View>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 30,
        fontWeight: "bold",
        color: "black",
        textAlign: 'center',
        marginTop: 20,
    },
    divWithInfo: {
        backgroundColor: "white",
        elevation: 5,
        width: "45%",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        borderRadius: 10,
        marginTop: 10
    }

});
