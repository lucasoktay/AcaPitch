import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Pressable, Text } from 'react-native';
import styles from '../styles';

const SignUpButton = ({ email, password }) => {
    const userCollection = firestore().collection('users');

    handleSignUp = () => {

        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });

        userCollection.add({
            email: email,
            password: password
        })
    }

    return (
        <Pressable style={styles.signupbutton} onPress={() => handleSignUp()}>
            <Text style={{ fontSize: 20, color: "white" }}>SIGN UP</Text>
        </Pressable>
    )

}

export default SignUpButton