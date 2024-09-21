import auth from '@react-native-firebase/auth';

export default function SignOut() {
    auth()
        .signOut()
        .then(() => console.log('User signed out!'));
}