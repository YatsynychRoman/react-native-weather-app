import React, {useEffect, useState} from 'react'
import * as Location from "expo-location";
import {styles} from "./styles";
import CurrentLocationWeather from "./CurrentLocationWeather";
import LocationHourlyForecastWeather from "./LocationHourlyForecastWeather";
import {Text, View, ScrollView, RefreshControl, StyleSheet, Dimensions, ImageBackground} from "react-native";
import LocationDailyForecast from "./LocationDailyForecast";
import {API_KEY} from '@env'
import axios from "axios";

const {height, width} = Dimensions.get('window')

const images = {
    "01d": require('./static/01dB.png'),
    "01n": require('./static/01nB.jpg'),
    "02d": require('./static/02dB.jpg'),
    "02n": require('./static/02nB.jpg'),
    "03d": require('./static/03dB.jpg'),
    "03n": require('./static/03nB.jpg'),
    "04d": require('./static/04dB.jpg'),
    "04n": require('./static/04nB.jpg'),
    "09d": require('./static/09dB.jpg'),
    "09n": require('./static/09nB.jpeg'),
    "10d": require('./static/10dB.jpg'),
    "10n": require('./static/10nB.jpeg'),
    "11d": require('./static/11dB.jpg'),
    "11n": require('./static/11nB.jpg'),
    "13d": require('./static/13dB.jpg'),
    "13n": require('./static/13nB.jpg'),
    "50d": require('./static/50dB.jpg'),
    "50n": require('./static/50nB.jpg'),
}

export default function LocationPage() {
    const [location, setLocation] = useState(undefined)
    const [refresh, setRefresh] = useState(false)
    const [background, setBackground] = useState(undefined)

    useEffect(() => {
        (async () => {
            if(!location) {
                setLocation(await Location.getCurrentPositionAsync({}))
            }
        })()
    }, [])

    const _onRefresh = () => {
        const tempLocation = location
        setRefresh(true)
        setLocation(undefined)
        setTimeout(() => {
            setLocation(tempLocation)
            setRefresh(false)
        }, 100)
    }

    if(!background && location) {
        (async () => {
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?units=metric&lang=en&lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${API_KEY}`)
            setBackground(response.data.weather[0].icon)
        })()
    }

    return location ? (
        <ScrollView
            style={{flex: 1}}
            contentContainerStyle={styles.appContainer}
            refreshControl={
                <RefreshControl
                    refreshing={refresh}
                    onRefresh={_onRefresh}
                />
            }
        >
            <ImageBackground
                source={images[background]}
                style={{
                    paddingTop: 21,
                    width: width,
                    height: height + 500,
                    flex: 1,
                    resizeMode: 'stretch',
                    justifyContent: 'center',
                }}
            >
                <CurrentLocationWeather location={location}/>
                <LocationHourlyForecastWeather location={location}/>
                <LocationDailyForecast location={location}/>
            </ImageBackground>
        </ScrollView>
    ) : (
        <View style={styles.appContainer}><Text>Loading...</Text></View>
    )
}