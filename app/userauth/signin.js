import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SignInButton from './signinbutton';

const SignIn = () => {
    const [appIsReady, setAppIsReady] = useState(false);
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const navigation = useNavigation();

    // Handle user state changes
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
                // Tell the application to render
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

    if (user) {
        console.log('User is signed in');
        navigation.navigate('Home')
    } else {
        console.log('User is signed out');
    }

    if (!appIsReady) {
        return null;
    }

    if (initializing) return null;

    return (
        <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <View>
                <Text>Welcome</Text>
                <SignInButton email={"testemail@gmail.com"} password={"123456"} />
            </View>
        </GestureHandlerRootView>
    );
}

export default SignIn;