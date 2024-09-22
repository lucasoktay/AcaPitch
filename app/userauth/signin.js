import { faMicrophoneLines } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import colors from '../colors';
import styles from '../styles';
import SignInButton from './signinbutton';
import SwitchToSignUp from './switchtosignup';

const SignIn = () => {
    const [user, setUser] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const firstInputRef = useRef(null);

    useFocusEffect(
        useCallback(() => {
            firstInputRef.current.focus(); // Focus the input every time the screen is focused
        }, [])
    );

    const clearFields = () => {
        setEmail('');
        setPassword('');
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.signincontainer}>
                <View style={styles.logocontainer}>
                    <FontAwesomeIcon icon={faMicrophoneLines} size={70} color={colors.orange} />
                </View>
                <Text style={styles.welcometext}>Welcome back!</Text>
                <View style={styles.signupinnercontainer}>
                    <Text style={styles.signuptext}>Sign In</Text>
                    <Text style={{ color: "white", marginBottom: 20, fontSize: 18 }}>Add your email and password.</Text>
                </View>
                <View style={styles.youremail}>
                    <Text style={{ color: "white", fontSize: 16 }}>YOUR EMAIL</Text>
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
            </View>
        </GestureHandlerRootView>
    );
}

export default SignIn;