import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        marginTop: '30px%',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    innerContainer: {
        width: '100%',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    currentTemp: {
        marginLeft: '5%',
        fontSize: 93,
        fontWeight: "200",
    },

    city: {
        fontSize: 45,
        fontWeight: "400"
    },

    description: {
        fontSize: 15,
        fontWeight: "300"
    },

    feelsLike: {
        fontSize: 15,
        fontWeight: "300"
    }
})