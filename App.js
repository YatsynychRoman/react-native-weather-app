import React, {useState, useEffect} from 'react';
import {Text, ScrollView, View, Dimensions} from 'react-native';
import * as Location from "expo-location";
import LocationPage from "./src/LocationPage";
import SearchPage from "./src/SearchPage";

const {width, height} = Dimensions.get('window');

export default function App() {
    const [status, setStatus] = useState(false)
    useEffect(() => {
        (async () => {
            const {status} = await Location.requestPermissionsAsync()
            if (status === 'granted') {
                setStatus(true)
                return;
            }
        })()
    }, [])

    return <ScrollView horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false}>
        <View style={{width: width, height: height}}>{
            status ?
                <LocationPage/>
                :
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>Location permission denied, please grant permission or look up via search</Text>
                </View>
        }
        </View>
        <View style={{width: width, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <SearchPage/>
        </View>
    </ScrollView>
}

