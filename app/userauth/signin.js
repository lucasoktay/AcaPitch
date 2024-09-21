import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import { SplashScreen } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from '../styles';
import SignUpButton from './signinbutton';

const SignIn = () => {
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
            <View style={styles.signincontainer}>
                <Text style={styles.welcometext}>AcaPitch</Text>
                <TextInput
                    style={styles.inputfield}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.inputfield}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <SignUpButton email={email} password={password} />
            </View>
        </GestureHandlerRootView>
    );
}

export default SignIn;