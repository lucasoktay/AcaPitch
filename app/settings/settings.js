import auth from '@react-native-firebase/auth';
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import styles from "../styles";
import BackButton from "./backbutton";
import ContactButton from "./contactoption";
import SignInFromSettings from "./signinfromsettings";
import SignOutButton from "./signoutbutton";
// import SupportButton from "./supportoption";
import ThemesButton from "./themesoption";

const Settings = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(user => {
            setIsSignedIn(!!user);
        });

        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.fullscreensettings}>
            <BackButton />
            <View style={styles.topbarsettings}>
                <View style={styles.settingstextwrapper}>
                    <Text style={{ fontSize: 20, fontFamily: 'RubikRegular' }}>Settings</Text>
                </View>
            </View>
            <View style={{ width: "100%", backgroundColor: "white", borderRadius: 10 }}>
                <ThemesButton />
                <View style={styles.divider}></View>
                <ContactButton />
                {/* <View style={styles.divider}></View>
                <SupportButton /> */}
            </View>
            {isSignedIn ? <SignOutButton /> : <SignInFromSettings />}
        </View >
    )
}

export default Settings;