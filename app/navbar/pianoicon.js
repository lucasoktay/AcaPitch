import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import styles from "../home/styles";

const PianoIcon = () => {
    const navigation = useNavigation();
    return (
        <Pressable onPress={() =>
            navigation.navigate('Piano')}
            style={styles.bottomicons}>
            <FontAwesomeIcon icon={faMusic} size={24} />
        </Pressable>
    )
}

export default PianoIcon