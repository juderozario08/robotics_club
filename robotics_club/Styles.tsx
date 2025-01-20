import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

export const STYLES = StyleSheet.create({
    BACKGROUND: {
        backgroundColor: 'black'
    },
    FOREGROUND_TEXT: {
        color: 'white'
    },
    CONTAINER: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    TITLE: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    INPUTBOX: {
    },
})

export const hideHeader: NativeStackNavigationOptions = {
    headerShown: false
}
