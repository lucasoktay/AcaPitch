import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from "react-native";
import styles from "./styles";

const BackButton = () => {
    const navigation = useNavigation();

    return (
        <Pressable onPress={() =>
            navigation.navigate('Home')}
            style={styles.backbutton}>
            <FontAwesomeIcon icon={faArrowLeft} size={24} />
        </Pressable>
    )
}

export default BackButton