import auth from '@react-native-firebase/auth';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import { SplashScreen } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from '../styles';
import SignUpButton from './signupbutton';
import SwitchToSignIn from './switchtosignin';

const SignUp = ({ soundsLoaded }) => {
    const [appIsReady, setAppIsReady] = useState(false);
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const firstInputRef = useRef(null);

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
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
                console.log('Fonts loaded successfully');
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady && soundsLoaded) {
            await SplashScreen.hideAsync();
            console.log('Splash screen hidden');
        }
    }, [appIsReady, soundsLoaded]);

    useFocusEffect(
        useCallback(() => {
            if (appIsReady && soundsLoaded && firstInputRef.current) {
                firstInputRef.current.focus(); // Focus the input every time the screen is focused
            }
        }, [appIsReady, soundsLoaded])
    );

    useEffect(() => {
        if (appIsReady && soundsLoaded && !initializing) {
            if (user) {
                console.log('Navigating to Home');
                navigation.navigate('Home');
            }
        }
    }, [appIsReady, soundsLoaded, initializing, user, navigation]);

    if (!appIsReady || initializing || !soundsLoaded) {
        return null;
    }

    const clearFields = () => {
        setEmail('');
        setPassword('');
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <View style={styles.signupcontainer}>
                <View style={styles.signupinnercontainer}>
                    <Text style={styles.signuptext}>Sign Up</Text>
                    <Text style={{ color: "white", marginBottom: 20, fontSize: 18, fontFamily: 'RubikRegular' }}>Add your email and password.</Text>
                </View>
                <View style={styles.youremail}>
                    <Text style={{ color: "white", fontSize: 16, fontFamily: 'RubikRegular' }}>YOUR EMAIL</Text>
                    <TextInput
                        textContentType="emailAddress"
                        style={styles.signupinputs}
                        placeholder="Email"
                        color="white"
                        placeholderTextColor={"white"}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        ref={firstInputRef}
                    />
                </View>
                <View style={styles.youremail}>
                    <Text style={{ color: "white", fontSize: 16, fontFamily: 'RubikRegular' }}>YOUR PASSWORD</Text>
                    <TextInput
                        textContentType="password"
                        style={styles.signupinputs}
                        placeholder="Password"
                        color="white"
                        placeholderTextColor={"white"}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>
                <SignUpButton email={email} password={password} clearFields={clearFields} />
                <SwitchToSignIn />
            </View>
        </GestureHandlerRootView>
    );
}

export default SignUp;