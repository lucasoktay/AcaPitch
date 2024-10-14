import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Pressable, Text } from 'react-native';
import styles from '../styles';

const SignInButton = ({ email, password, clearFields }) => {
    const userCollection = firestore().collection('users');

    handleSignIn = () => {
        clearFields();

        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
            })
            .catch(error => {
                if (error.code === 'auth/wrong-password') {
                    Alert.alert('That password is incorrect!')
                }

                if (error.code === 'auth/user-not-found') {
                    Alert.alert('That email address is not found!')
                }

                if (error.code === 'auth/invalid-email') {
                    Alert.alert('That email address is invalid!');
                }

                console.error(error);
            }
            );
    }

    if (email && password) {
        return (
            <Pressable style={styles.signupbutton} onPress={() => handleSignIn()}>
                <Text style={{ fontSize: 22, color: "white", fontFamily: 'RubikRegular' }}>SIGN IN</Text>
            </Pressable>
        )
    } else {
        return (
            <Pressable style={styles.signupbuttoninactive} onPress={() => handleSignIn()}>
                <Text style={{ fontSize: 22, color: "white", fontFamily: 'RubikRegular' }}>SIGN IN</Text>
            </Pressable>
        )
    }

}

export default SignInButton