import React, {useEffect, useState} from 'react'
import {Text, View, Dimensions} from 'react-native';
import {API_KEY} from '@env';
import axios from "axios";
import moment from 'moment'

const { width } = Dimensions.get('window');

const images = {
    "01d": require('./static/01d.png'),
    "01n": require('./static/01n.png'),
    "02d": require('./static/02d.png'),
    "02n": require('./static/02n.png'),
    "03d": require('./static/03d.png'),
    "03n": require('./static/03n.png'),
    "04d": require('./static/04d.png'),
    "04n": require('./static/04n.png'),
    "09d": require('./static/09d.png'),
    "09n": require('./static/09n.png'),
    "10d": require('./static/10d.png'),
    "10n": require('./static/10n.png'),
    "11d": require('./static/11d.png'),
    "11n": require('./static/11n.png'),
    "13d": require('./static/13d.png'),
    "13n": require('./static/13n.png'),
    "50d": require('./static/50d.png'),
    "50n": require('./static/50n.png'),
}

export default function LocationHourlyForecastWeather({location}) {
    const [forecast, setForecast] = useState(undefined)

    useEffect(() => {
        (async () => {
            if (location) {
                const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/onecall?exclude=current,minutely,daily,alerts&units=metric&lang=en&lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${API_KEY}`)
                if (forecast !== weatherResponse.data) setForecast(weatherResponse.data)
            }
        })()
    }, [])


    return forecast ? (
        <View style={styles.innerContainer}>
            <ScrollView contentContainerStyle={{marginTop: '15px%', marginLeft: 25}} horizontal={true} showsHorizontalScrollIndicator={false}>
                {forecast.hourly.map( item => {
                        return (<View key={forecast.hourly.indexOf(item)} style={{width: width - 350, flex: 1, alignItems: 'center', justifyContent: 'flex-start',}}>
                            <Text style={{fontSize: 20}}>{Math.floor(item.temp)}°</Text>
                            <Image style={{width: 45, height: 45}} source={images[item.weather[0].icon]}/>
                            <Text style={{fontSize: 15}}>{moment(item.dt * 1000).format('HH:mm')}</Text>
                        </View>)
                    }
                )}
            </ScrollView>
        </View>
    ) : (<></>)
}
import {styles} from './styles';

import {Image, ScrollView} from "react-native";
