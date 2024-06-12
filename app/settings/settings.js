import { Text, View } from "react-native";
import BackButton from "./backbutton";
import styles from "./styles";

const Settings = () => {

    return (
        <View style={styles.fullscreen}>
            <BackButton />
            <Text>Settings</Text>
        </View>
    )
}

export default Settings