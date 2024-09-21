import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Pressable, Text } from 'react-native';
import styles from '../styles';

const SignInButton = ({ email, password }) => {
    const userCollection = firestore().collection('users');

    handleSignIn = () => {

        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('Returning user signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/wrong-password') {
                    console.log('That password is incorrect!');
                }

                if (error.code === 'auth/user-not-found') {
                    console.log('That email address is not found!');
                }

                console.error(error);
            }
            );
    }

    return (
        <Pressable style={styles.signupbutton} onPress={() => handleSignIn()}>
            <Text style={{ fontSize: 20, color: "white" }}>SIGN IN</Text>
        </Pressable>
    )

}

export default SignInButton