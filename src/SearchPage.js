import React, {useState} from 'react'
import {View, Text, ScrollView, TextInput, Button, Dimensions, ImageBackground} from 'react-native'
import axios from 'axios'
import {GOOGLE_KEY} from '@env'
import {styles} from "./styles";
import CurrentLocationWeather from "./CurrentLocationWeather";
import LocationHourlyForecastWeather from "./LocationHourlyForecastWeather";
import LocationDailyForecast from "./LocationDailyForecast";

const { width, height } = Dimensions.get('window');

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

export default function SearchPage() {
    const [query, setQuery] = useState(undefined)
    const [results, setResults] = useState(undefined)
    const [refresh, setRefresh] = useState(false)
    const [background, setBackground] = useState(undefined)

    if(query) {
        if(!results || results?.city !== query) {
            (async () => {
                const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_KEY}&address=${query}`)
                setRefresh(true)
                setResults({location: {
                    coords: {
                        latitude: response.data.results[0].geometry.location.lat,
                        longitude: response.data.results[0].geometry.location.lng,
                        city: query
                    }
                    }, city: query})
            })()
        }
    }

    if(!background && results) {
        (async () => {
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?units=metric&lang=en&lat=${results.coords.latitude}&lon=${results.coords.longitude}&appid=${API_KEY}`)
            setBackground(response.data.weather[0].icon)
        })()
    }

    return results ? (
        <View
            style={{flex: 1,
                paddingTop: '15px%',
                backgroundColor: '#555555',
                alignItems: 'center',
                justifyContent: 'flex-start'
            }}
        >
            <View style={{marginBottom: 27,borderWidth: 1, borderColor: 'black', borderRadius: 14, height: 35, width: width - 80, justifyContent: 'center', alignItems: 'flex-start'}}>
            <TextInput
            placeholder='Type here...'
            editable
            maxLength={40}
            textAlign='left'
            onSubmitEditing={(event) => {
                setQuery(event.nativeEvent.text)
            }}
            placeholderTextColor={'white'}
            style={{fontSize: 18, width: '100%', marginLeft: 10, color: 'white',}}
            />
            </View>
            <CurrentLocationWeather location={results.location}/>
            <LocationHourlyForecastWeather location={results.location}/>
            <LocationDailyForecast location={results.location}/>
        </View>
    ) : (
        <ScrollView
            style={{flex: 1}}
            contentContainerStyle={{
                flex: 1,
                marginTop: '15px%',
                backgroundColor: '#ffffff',
                alignItems: 'center',
                justifyContent: 'flex-start'
            }}
            horizontal={false}
        >
            <View style={{borderWidth: 1, borderColor: 'black', borderRadius: 14, height: 35, width: width - 80, justifyContent: 'center', alignItems: 'flex-start'}}>
                <TextInput
                    placeholder='Type here...'
                    editable
                    maxLength={40}
                    textAlign='left'
                    onSubmitEditing={(event) => {
                        setQuery(event.nativeEvent.text)
                    }}
                    style={{fontSize: 18, width: '100%', marginLeft: 10}}
                />
            </View>
            <Text style={{fontSize: 20, marginTop: width / 2 - 80}}>Please enter any city you want in the search field above</Text>
        </ScrollView>
    )

}