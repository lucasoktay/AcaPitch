import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity } from 'react-native';
import styles from '../styles';


const SwitchToSignUp = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.switchtext}>New to AcaPitch? Sign up.</Text>
        </TouchableOpacity>
    );
}

export default SwitchToSignUp