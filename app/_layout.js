import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from 'expo-router';
import React, { useEffect, useState } from 'react';
import AddNotes from './addnotes/addnotes.js';
import Home from './home/home.js';
import NewSong from './newsong/newsong.js';
import PlaySound from './piano/newmakesound.js';
import PianoComponent from './piano/piano.js';
import Settings from './settings/settings.js';
import { loadSounds, loadedSounds } from './sounds/sounds.js';
import ThemesComponent from './themes/themes.js';
import SignIn from './userauth/signin.js';
import SignUp from './userauth/signup.js';

const MyStack = () => {
    const [soundsLoaded, setSoundsLoaded] = useState(false);
    const [sound, setSound] = useState();

    SplashScreen.preventAutoHideAsync();

    useEffect(() => {
        const loadAllSounds = async () => {
            const maxRetries = 3;
            let attempts = 0;
            let success = false;

            while (attempts < maxRetries && !success) {
                try {
                    await loadSounds();
                    success = true;
                } catch (error) {
                    attempts += 1;
                    console.error(`Attempt ${attempts} to load sounds failed:`, error);
                }
            }

            if (success) {
                setSoundsLoaded(true);
                console.log('Sounds loaded successfully');
            } else {
                console.error('Failed to load all sounds after maximum retries.');
                // Optionally, you can show an error message to the user here
            }
        };

        loadAllSounds();
    }, []);

    useEffect(() => {
        if (soundsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [soundsLoaded]);

    const handlePlaySound = async (note) => {
        await PlaySound(note, setSound, loadedSounds);
    }

    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer independent="true" keyboardShouldPersistTaps="handled">
            <Stack.Navigator screenOptions={{
                animation: 'none',
                headerShown: false,
                orientation: 'portrait',
            }} keyboardShouldPersistTaps="handled">
                <Stack.Screen name="SignUp">
                    {props => <SignUp {...props} soundsLoaded={soundsLoaded} />}
                </Stack.Screen>
                <Stack.Screen name="Home">
                    {props => <Home {...props} handlePlaySound={handlePlaySound} />}
                </Stack.Screen>
                <Stack.Screen name="Piano" options={{ orientation: 'landscape' }}>
                    {props => <PianoComponent {...props} handlePlaySound={handlePlaySound} />}
                </Stack.Screen>
                <Stack.Screen
                    name="SignIn"
                    component={SignIn}
                    options={{ animation: "slide_from_right" }}
                />
                <Stack.Screen
                    name="Themes"
                    component={ThemesComponent}
                    options={{ animation: "slide_from_right" }}
                />
                <Stack.Screen
                    name="Settings"
                    component={Settings}
                    options={{ animation: "slide_from_right" }}
                />
                <Stack.Screen
                    name="Add Notes"
                    component={AddNotes}
                    options={{
                        animation: "none",
                        orientation: 'landscape'
                    }}
                />
                <Stack.Screen name="NewSong" component={NewSong} keyboardShouldPersistTaps="handled" />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MyStack;