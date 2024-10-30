import React, { useRef, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import colors from '../colors';
import styles from '../styles';
import ContinueAsGuest from './continueasguest';
import SignInButton from './signinbutton';
import SwitchToSignUp from './switchtosignup';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const firstInputRef = useRef(null);

    const clearFields = () => {
        setEmail('');
        setPassword('');
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.signincontainer}>
                {/* <View style={styles.logocontainer}>
                    <FontAwesomeIcon icon={faMicrophoneLines} size={60} color={colors.orange} />
                </View>
                <Text style={styles.welcometext}>Welcome back!</Text> */}
                <View style={styles.signupinnercontainer}>
                    <Text style={styles.signuptext}>Sign In</Text>
                    <Text style={{ color: "white", marginBottom: 20, fontSize: 18, fontFamily: 'RubikRegular' }}>Add your email and password.</Text>
                </View>
                <View style={styles.youremail}>
                    <Text style={{ color: "white", fontSize: 16, fontFamily: 'RubikRegular' }}>YOUR EMAIL</Text>
                    <TextInput
                        textContentType="emailAddress"
                        style={styles.signininputs}
                        ref={firstInputRef}
                        placeholder="Email"
                        color="white"
                        placeholderTextColor={"white"}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.youremail}>
                    <Text style={{ color: "white", fontSize: 16 }}>YOUR PASSWORD</Text>
                    <TextInput
                        textContentType="password"
                        style={styles.signininputs}
                        placeholder="Password"
                        color="white"
                        placeholderTextColor={"white"}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>
                <SignInButton email={email} password={password} clearFields={clearFields} />
                <SwitchToSignUp />
                <Text style={{ marginTop: 15, color: colors.lightorange, fontSize: 20, fontFamily: 'RubikRegular' }}>OR</Text>
                <ContinueAsGuest />
            </View>
        </GestureHandlerRootView>
    );
}

export default SignIn;