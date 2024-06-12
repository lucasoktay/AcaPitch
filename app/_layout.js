import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './home/home.js';
import Piano from './piano/piano.js';
import Settings from './settings/settings.js';

const Stack = createNativeStackNavigator();
const MyStack = () => {
    return (
        <NavigationContainer independent="true">
            <Stack.Navigator screenOptions={{
                headerShown: false,
                orientation: 'portrait',
            }}>
                <Stack.Screen
                    name="Home"
                    component={Home}
                />
                <Stack.Screen
                    name="Piano"
                    component={Piano}
                    options={{
                        orientation: 'landscape',
                    }}
                />
                <Stack.Screen
                    name="Settings"
                    component={Settings}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MyStack;