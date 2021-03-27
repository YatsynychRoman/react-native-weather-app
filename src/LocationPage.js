import React, {useEffect, useState} from 'react'
import * as Location from "expo-location";
import {styles} from "./styles";
import CurrentLocationWeather from "./CurrentLocationWeather";
import LocationHourlyForecastWeather from "./LocationHourlyForecastWeather";
import {Text, View, ScrollView} from "react-native";
import LocationDailyForecast from "./LocationDailyForecast";

export default function LocationPage() {
    const [location, setLocation] = useState(undefined)

    useEffect(() => {
        (async () => {
            if(!location) setLocation(await Location.getCurrentPositionAsync({}))
        })()
    }, [])

    return location ? (
        <ScrollView style={{flex: 1}} contentContainerStyle={styles.appContainer}>
            <CurrentLocationWeather location={location}/>
            <LocationHourlyForecastWeather location={location}/>
            <LocationDailyForecast location={location}/>
        </ScrollView>
    ) : (
        <View style={styles.appContainer}><Text>Loading...</Text></View>
    )
}