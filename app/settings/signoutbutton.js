import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from "react-native";
import SignOut from '../userauth/signout';
import styles from "./styles";

const SignOutButton = () => {
    const navigation = useNavigation();

    handleSignOut = () => {
        SignOut()
        navigation.navigate('SignIn')
    }
    return (
        <Pressable onPress={() => handleSignOut()}
            style={styles.backbutton}>
            <FontAwesomeIcon icon={faArrowLeft} size={24} />
        </Pressable>
    )
}

export default SignOutButton