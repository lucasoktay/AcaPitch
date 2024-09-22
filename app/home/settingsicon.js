import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from "react-native";
import colors from '../colors';
import styles from "../styles";

const SettingsIcon = () => {
    const navigation = useNavigation();

    return (
        <Pressable onPress={() =>
            navigation.navigate('Settings')}
            style={styles.settingsicon}>
            <FontAwesomeIcon icon={faGear} size={32} color={colors.lightred} />
        </Pressable>
    );
}

export default SettingsIcon;