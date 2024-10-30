import { useNavigation } from '@react-navigation/native';
import { Pressable, Text } from "react-native";
import styles from "../styles";

const SignInFromSettings = () => {
    const navigation = useNavigation();

    const handleSignIn = () => {
        navigation.navigate('SignIn');
    };

    return (
        <Pressable style={styles.signoutbutton} onPress={handleSignIn}>
            <Text style={{ color: "white", fontSize: 20, fontFamily: 'RubikRegular' }}>Sign In</Text>
        </Pressable>
    );
};

export default SignInFromSettings;