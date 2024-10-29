import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import Haptics from 'expo-haptics';
import { TouchableOpacity, View } from "react-native";
import styles from "../styles";

const SaveSongButton = ({ onSaveButtonPress, areNotes, isTitle }) => {

    const handlePress = () => {
        // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onSaveButtonPress();
    }

    if (areNotes && isTitle) {
        return (
            <TouchableOpacity onPress={handlePress}>
                <View style={styles.savesongbuttonactive} >
                    <FontAwesomeIcon icon={faArrowUp} size={20} color={"white"} />
                </View>
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity onPress={handlePress}>
                <View style={styles.savesongbutton} >
                    <FontAwesomeIcon icon={faArrowUp} size={20} color={"lightgrey"} />
                </View>
            </TouchableOpacity>
        )
    }
}

export default SaveSongButton