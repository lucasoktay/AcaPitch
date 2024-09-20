import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import { SplashScreen } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import SignIn from './userauth/signin.js';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const MyStack = () => {
    const [appIsReady, setAppIsReady] = useState(false);
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

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
                    'MontserratRegular': require('../assets/fonts/MontserratRegular.ttf'),
                    'MontserratSemiBold': require('../assets/fonts/MontserratSemiBold.ttf'),
                    'MontserratMedium': require('../assets/fonts/MontserratMedium.ttf'),
                    'RubikRegular': require('../assets/fonts/RubikRegular.ttf'),
                });
                // Artificially delay for two seconds to simulate a slow loading
                // experience. Please remove this if you copy and paste the code!
                // await new Promise(resolve => setTimeout(resolve, 2));
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

    if (!appIsReady) {
        return null;
    }

    if (initializing) return null;

    // if (!user) {
    //     return (
    //         <View>
    //             <Text>Login</Text>
    //         </View>
    //     );
    // }

    // return (
    //     <View>
    //         <Text>Welcome {user.email}</Text>
    //     </View>
    // );

    if (user) {
        console.log('User is signed in');
    } else {
        console.log('User is signed out');
    }

    return (
        <NavigationContainer independent="true">
            <Stack.Navigator screenOptions={{
                animation: 'none',
                headerShown: false,
                orientation: 'portrait',
            }}>
                <Stack.Screen name="Signin" component={SignIn} />
            </Stack.Navigator>
        </NavigationContainer>
    )

    // return (
    //     <NavigationContainer independent="true">
    //         <Stack.Navigator screenOptions={{
    //             animation: 'none',
    //             headerShown: false,
    //             orientation: 'portrait',
    //         }}>
    //             {user ? (
    //                 <>
    //                     <Stack.Screen name="Home" component={Home} />
    //                     <Stack.Screen
    //                         name="Piano"
    //                         component={PianoComponent}
    //                         options={{
    //                             orientation: 'landscape',
    //                         }}
    //                     />
    //                     <Stack.Screen
    //                         name="Settings"
    //                         component={Settings}
    //                         options={{ animation: "slide_from_right" }}
    //                     />
    //                     <Stack.Screen
    //                         name="Add Notes"
    //                         component={AddNotes}
    //                         options={{
    //                             animation: "none",
    //                             orientation: 'landscape'
    //                         }}
    //                     />
    //                     <Stack.Screen
    //                         name="New Song"
    //                         component={NewSong}
    //                         options={{
    //                             animation: "slide_from_bottom",
    //                             orientation: 'portrait'
    //                         }}
    //                     />
    //                 </>
    //             ) : (
    //                 <Stack.Screen name="Signin" component={SignIn} />
    //             )}
    //         </Stack.Navigator>
    //     </NavigationContainer>
    // );
};

export default MyStack;