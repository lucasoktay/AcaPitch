import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from "@react-navigation/native";
// import * as Haptics from 'expo-haptics';
import { Pressable } from "react-native";
import styles from "../styles.js";


const PianoIcon = ({ pianoColor }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        navigation.navigate('Piano');
    };

    return (
        <Pressable onPress={handlePress}
            style={styles.bottomicons}>
            <FontAwesomeIcon
                icon={faMusic}
                size={30}
                color={pianoColor}
            />
        </Pressable>
    )
}

export default PianoIcon