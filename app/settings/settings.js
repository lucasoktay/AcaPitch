import { Text, View } from "react-native";
import styles from "../styles";
import BackButton from "./backbutton";
import SignOutButton from "./signoutbutton";
import ThemesButton from "./themesoption";
// import ThemesButton from "./themesbutton";

const Settings = () => {

    return (
        <View style={styles.fullscreensettings}>
            <BackButton />
            <View style={styles.topbarsettings}>
                <View style={styles.settingstextwrapper}>
                    <Text style={{ fontSize: 20, fontFamily: 'RubikRegular' }}>Settings</Text>
                </View>
            </View>
            <ThemesButton />
            <SignOutButton />
        </View>
    )
}

export default Settings;