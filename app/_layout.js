import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import AddNotes from './addnotes/addnotes.js';
import Home from './home/home.js';
import LoadingScreen from './loading/loadingscreen.js';
import MetronomeComponent from './metronome/metronome.js';
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

    useEffect(() => {
        const loadAllSounds = async () => {
            try {
                await loadSounds();
                setSoundsLoaded(true);
                console.log('Sounds loaded successfully');
            } catch (error) {
                console.error('Failed to load sounds:', error);
            }
        };

        loadAllSounds();
    }, []);

    // return <Temp />;

    if (!soundsLoaded) {
        return <LoadingScreen />;
    }

    const handlePlaySound = async (note) => {
        await PlaySound(note, setSound, loadedSounds);
    }

    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer independent="true">
            <Stack.Navigator screenOptions={{
                animation: 'none',
                headerShown: false,
                orientation: 'portrait',
            }}>
                <Stack.Screen name="SignUp">
                    {props => <SignUp {...props} soundsLoaded={soundsLoaded} />}
                </Stack.Screen>
                <Stack.Screen name="Home" options={{ gestureEnabled: false }}>
                    {props => <Home {...props} handlePlaySound={handlePlaySound} />}
                </Stack.Screen>
                <Stack.Screen name="Piano" options={{ orientation: 'landscape' }}>
                    {props => <PianoComponent {...props} handlePlaySound={handlePlaySound} />}
                </Stack.Screen>
                <Stack.Screen
                    name="Settings"
                    component={Settings}
                    options={{ animation: "slide_from_right" }}
                />
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
                    name="Add Notes"
                    options={{
                        animation: "none",
                        orientation: 'landscape'
                    }}
                >
                    {props => <AddNotes {...props} handlePlaySound={handlePlaySound} />}
                </Stack.Screen>
                <Stack.Screen name="NewSong" component={NewSong} />
                <Stack.Screen name="Metronome" component={MetronomeComponent} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MyStack;