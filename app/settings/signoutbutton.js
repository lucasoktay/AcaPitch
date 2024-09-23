import { useNavigation } from '@react-navigation/native';
import { Pressable, Text } from "react-native";
import styles from "../styles";
import SignOut from '../userauth/signout';

const SignOutButton = () => {
    const navigation = useNavigation();

    handleSignOut = () => {
        SignOut()
        navigation.navigate('SignIn')
    }
    return (
        <Pressable style={styles.signoutbutton} onPress={() => handleSignOut()}>
            <Text style={{ color: "white", fontSize: 20, fontFamily: 'RubikRegular' }}>Sign Out</Text>
        </Pressable>
    )
}

export default SignOutButton