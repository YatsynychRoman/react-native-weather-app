import React, {useState, useEffect} from 'react'
import {Text, View, Image, Dimensions} from 'react-native'
import {API_KEY} from '@env'
import {useNetInfo} from '@react-native-community/netinfo'
import axios from "axios"
import moment from 'moment'
//import {MMKV} from "react-native-mmkv";

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

const { width, height } = Dimensions.get('window');

export default function LocationDailyForecast({location}) {
    const [forecast, setForecast] = useState(undefined)

    useEffect(() => {
        (async () => {
            if(useNetInfo.isConnected) {
               setForecast(JSON.parse(localStorage.getItem('currentWeatherByLocation')))
            }

            if (location) {
                const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/onecall?exclude=current,minutely,hourly,alerts&units=metric&lang=en&lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${API_KEY}`)
                if (forecast !== weatherResponse.data) {
                    weatherResponse.data.daily.shift()
                    setForecast(weatherResponse.data)
                    localStorage.setItem('dailyForecastByLocation', JSON.stringify(weatherResponse.data))
                }
            }
        })()
    }, [location]);

    return forecast ? (
        <View style={{height: height/3 - 25,width: width, flexDirection: 'column', alignItems: 'flex-start', paddingLeft: 20, marginTop: 45}}>
            {
                forecast.daily.map(item => {
                return (
                    <View style={{flex: 1, width: width-45, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}} key={forecast.daily.indexOf(item)}>
                        <Text style={{width: 165, fontSize: 20, color: 'white'}}>{moment(item.dt * 1000).format('dddd')}</Text>
                        <View style={{flex: 1, flexDirection: 'row', marginRight: 75, alignItems: 'center', justifyContent: 'center'}}>
                            <Image source={images[item.weather[0].icon]} style={{width: 40, height: 40}}/>
                            <Text style={{fontSize: 14, color: '#03a5fc'}}>{Math.round(item.pop * 100)}%</Text>
                        </View>
                        <View style={{width: 150,flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontSize: 18, width: 40, color: 'white'}}>{Math.floor(item.temp.max)}°</Text>
                            <Text style={{fontSize: 18, textAlign: 'right', color: '#6d6d6d'}}>{Math.floor(item.temp.min)}°</Text>
                        </View>
                    </View>
                )
            })}
        </View>
    ) : <></>
}