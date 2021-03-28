import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        backgroundColor: '#555555',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    innerContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: 'white'
    },

    currentTemp: {
        marginLeft: '5%',
        fontSize: 93,
        fontWeight: "200",
        color: 'white'
    },

    city: {
        color: 'white',
        fontSize: 45,
        fontWeight: "400"
    },

    description: {
        fontSize: 15,
        fontWeight: "300",
        color: 'white'
    },

    feelsLike: {
        fontSize: 15,
        fontWeight: "300",
        color: 'white'
    }
})