import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity } from 'react-native';
import styles from '../styles';

const SwitchToSignIn = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.switchtext}>Already have an account? Sign in</Text>
        </TouchableOpacity>
    );
}

export default SwitchToSignIn