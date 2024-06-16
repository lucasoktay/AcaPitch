import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../app/home/home.js';
import PianoComponent from '../app/piano/piano.js';
import Settings from '../app/settings/settings.js';
import AddNotes from './addnotes/addnotes.js';
import NewSong from './newsong/newsong.js';

const Stack = createNativeStackNavigator();
const MyStack = () => {
    return (
        <NavigationContainer independent="true">
            <Stack.Navigator screenOptions={{
                animation: 'none',
                headerShown: false,
                orientation: 'portrait',
            }}>
                <Stack.Screen
                    name="Home"
                    component={Home}
                />
                <Stack.Screen
                    name="Piano"
                    component={PianoComponent}
                    options={{
                        orientation: 'landscape',
                    }}
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
                <Stack.Screen
                    name="New Song"
                    component={NewSong}
                    options={{
                        animation: "slide_from_bottom",
                        orientation: 'portrait'
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MyStack;