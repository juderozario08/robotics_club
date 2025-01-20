import { View, Text } from "react-native";
import { STYLES } from "../Styles";

export default function HomeScreen() {
    return (
        <View style={[STYLES.CONTAINER, STYLES.BACKGROUND]}>
            <Text style={[STYLES.TITLE, STYLES.FOREGROUND_TEXT]}>Dashboard</Text>
        </View>
    );
}

