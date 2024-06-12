import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from "react-native";
import styles from "../home/styles";

const HomeIcon = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() =>
            navigation.navigate('Home')}
            style={styles.bottomicons}>
            <FontAwesomeIcon icon={faHouse} size={24} />
        </TouchableOpacity>
    )
}

export default HomeIcon;