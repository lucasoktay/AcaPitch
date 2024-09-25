import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from 'expo-router';
import React from 'react';
import AddNotes from './addnotes/addnotes.js';
import Home from './home/home.js';
import NewSong from './newsong/newsong.js';
import PianoComponent from './piano/piano.js';
import Settings from './settings/settings.js';
import ThemesComponent from './themes/themes.js';
import SignIn from './userauth/signin.js';
import SignUp from './userauth/signup.js';


SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const MyStack = () => {
    return (
        <NavigationContainer independent="true" keyboardShouldPersistTaps="always">
            <Stack.Navigator screenOptions={{
                animation: 'none',
                headerShown: false,
                orientation: 'portrait',
            }} keyboardShouldPersistTaps="always">
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    keyboardShouldPersistTaps="always" />
                <Stack.Screen
                    name="Piano"
                    component={PianoComponent}
                    options={{
                        orientation: 'landscape',
                    }}
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
                <Stack.Screen name="NewSong" component={NewSong} keyboardShouldPersistTaps="always" />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MyStack;