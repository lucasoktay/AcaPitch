import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert, Pressable, Text } from 'react-native';
import styles from '../styles';

const SignUpButton = ({ email, password, clearFields }) => {
    const userCollection = firestore().collection('users');

    handleSignUp = () => {
        clearFields();

        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {

                userCollection.add({
                    email: email,
                    password: password,
                    uid: auth().currentUser.uid
                })
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    Alert.alert('That email address is invalid!');
                }

                if (error.code == 'auth/weak-password') {
                    Alert.alert('Password must have at least 6 characters.');
                }

                console.error(error);
            });
    }

    if (email && password) {
        return (
            <Pressable style={styles.signupbutton} onPress={() => handleSignUp()}>
                <Text style={{ fontSize: 22, color: "white", fontFamily: 'RubikRegular' }}>SIGN UP</Text>
            </Pressable>
        )
    } else {
        return (
            <Pressable style={styles.signupbuttoninactive} onPress={() => handleSignUp()}>
                <Text style={{ fontSize: 22, color: "white", fontFamily: 'RubikRegular' }}>SIGN UP</Text>
            </Pressable>
        )
    }

}

export default SignUpButton