import { Text, View } from "react-native";
import BackButton from "../settings/backbutton";

const ThemesComponent = () => {
    return (
        <View>
            <BackButton />
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 60, height: 40 }}>
                <Text style={{ fontSize: 24 }}>Coming soon!</Text>
            </View>
        </View>
    )
}

export default ThemesComponent;