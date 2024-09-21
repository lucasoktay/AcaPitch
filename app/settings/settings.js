import { Text, View } from "react-native";
import BackButton from "./backbutton";
import SignOutButton from "./signoutbutton";
import styles from "./styles";

const Settings = () => {

    return (
        <View style={styles.fullscreen}>
            <BackButton />
            <Text>Settings</Text>
            <SignOutButton />
        </View>
    )
}

export default Settings