import auth from '@react-native-firebase/auth';
import { Pressable, Text } from 'react-native';
import styles from '../styles';

const SignInButton = ({ email, password }) => {

    handleSignIn = () => {

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
    }

    return (
        <Pressable style={styles.signinbutton} onPress={() => handleSignIn()}>
            <Text>Sign In</Text>
        </Pressable>
    )

}

export default SignInButton