import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {API_KEY} from '@env';
import axios from "axios";
import {styles} from "./styles";

export default function CurrentLocationWeather({location}) {
    const [message, setMessage] = useState(undefined)

    useEffect(() => {
        (async () => {
            if (location) {
                const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?units=metric&lang=en&lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${API_KEY}`)
                if (message !== weatherResponse.data) {
                    const obj = weatherResponse.data
                    obj.name = location.coords.city ? location.coords.city : obj.name
                    setMessage(obj)
                }
            }
        })()
    }, [location])

    return (
                <View style={styles.innerContainer}>
                    {message ? <>
                        <Text style={styles.city}>{message.name}</Text>
                        <Text style={styles.description}>{message.weather[0].description}</Text>
                        <Text style={styles.currentTemp}>{Math.ceil(Number(message.main?.temp))}°</Text>
                        <Text style={styles.feelsLike}>Feels like {Math.ceil(Number(message.main?.feels_like))}</Text>
                    </> : <></>}
                </View>
    )
}