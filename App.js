import React, {useState, useEffect} from 'react';
import {Text, ScrollView, View} from 'react-native';
import * as Location from "expo-location";
import LocationPage from "./src/LocationPage";

export default function App() {
    const [status, setStatus] = useState(false)
    useEffect(() => {(async () => {
        const {status} = await Location.requestPermissionsAsync()
        if (status === 'granted') {
            setStatus(true)
            return;
        }
    })()}, [])

    return status ? (
        <LocationPage/>
    ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Location permission denied, please grant permission or look up via search</Text>
        </View>
    )
}

