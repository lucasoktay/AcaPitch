import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from "react-native";
import styles from "./styles";

const SettingsIcon = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() =>
            navigation.navigate('Settings')}
            style={styles.settingsicon}>
            <FontAwesomeIcon icon={faGear} size={24} />
        </TouchableOpacity>
    );
}

export default SettingsIcon;