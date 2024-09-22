import { Text, View } from "react-native";
import styles from "../styles";
import BackButton from "./backbutton";
import SignOutButton from "./signoutbutton";

const Settings = () => {

    return (
        <View style={styles.fullscreensettings}>
            <BackButton />
            <View style={styles.topbarsettings}>
                <View style={styles.settingstextwrapper}>
                    <Text style={{ fontSize: 20 }}>Settings</Text>
                </View>
            </View>
            <SignOutButton />
        </View>
    )
}

export default Settings