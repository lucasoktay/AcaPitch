import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity } from 'react-native';
import styles from '../styles';

const ContinueAsGuest = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.switchtext}>Continue as a guest</Text>
        </TouchableOpacity>
    );
}

export default ContinueAsGuest