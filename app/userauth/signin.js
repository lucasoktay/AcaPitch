import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from '../styles';
import SignInButton from './signinbutton';
import SwitchToSignUp from './switchtosignup';

const SignIn = () => {
    const [user, setUser] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    // function onAuthStateChanged(user) {
    //     setUser(user);
    //     if (initializing) setInitializing(false);
    // }

    // useEffect(() => {
    //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //     return subscriber; // unsubscribe on unmount
    // }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.signupcontainer}>
                <Text style={styles.welcometext}>AcaPitch</Text>
                <TextInput
                    style={styles.signupinputs}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.signupinputs}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <SignInButton email={email} password={password} />
                <SwitchToSignUp />
            </View>
        </GestureHandlerRootView>
    );
}

export default SignIn;