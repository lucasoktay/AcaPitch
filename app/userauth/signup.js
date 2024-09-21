import { faMicrophoneLines } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import { SplashScreen } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import colors from '../colors';
import styles from '../styles';
import SignUpButton from './signupbutton';
import SwitchToSignIn from './switchtosignin';

const SignUp = () => {
    const [appIsReady, setAppIsReady] = useState(false);
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    useEffect(() => {
        async function prepare() {
            try {
                await Font.loadAsync({
                    'MontserratRegular': require('../../assets/fonts/MontserratRegular.ttf'),
                    'MontserratSemiBold': require('../../assets/fonts/MontserratSemiBold.ttf'),
                    'MontserratMedium': require('../../assets/fonts/MontserratMedium.ttf'),
                    'RubikRegular': require('../../assets/fonts/RubikRegular.ttf'),
                });
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady || initializing) {
        return null;
    }

    if (user) {
        console.log('User is signed in');
        navigation.navigate('Home')
    } else {
        console.log('User is signed out');
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <View style={styles.signupcontainer}>
                <View style={styles.logocontainer}>
                    <FontAwesomeIcon icon={faMicrophoneLines} size={70} color={colors.orange} />
                </View>
                <Text style={styles.welcometext}>AcaPitch</Text>
                <View style={styles.signupinnercontainer}>
                    <Text style={styles.signuptext}>Sign Up</Text>
                    <Text style={{ color: "white", marginBottom: 20, fontSize: 18 }}>Add your email and password.</Text>
                </View>
                <View style={styles.youremail}>
                    <Text style={{ color: "white", fontSize: 16 }}>YOUR EMAIL</Text>
                    <TextInput
                        style={styles.signupinputs}
                        placeholder="Email"
                        color="white"
                        placeholderTextColor={"white"}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.youremail}>
                    <Text style={{ color: "white", fontSize: 16 }}>YOUR PASSWORD</Text>
                    <TextInput
                        style={styles.signupinputs}
                        placeholder="Password"
                        color="white"
                        placeholderTextColor={"white"}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>
                <SignUpButton email={email} password={password} />
                <SwitchToSignIn />
            </View>
        </GestureHandlerRootView>
    );
}

export default SignUp;