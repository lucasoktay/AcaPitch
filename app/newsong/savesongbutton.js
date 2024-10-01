import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import styles from "../styles";

const SaveSongButton = ({ onSaveButtonPress, areNotes, isTitle }) => {
    const navigation = useNavigation();

    if (areNotes && isTitle) {
        return (
            <TouchableOpacity onPress={onSaveButtonPress}>
                <View style={styles.savesongbuttonactive} >
                    <FontAwesomeIcon icon={faArrowUp} size={20} color={"white"} />
                </View>
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity onPress={onSaveButtonPress}>
                <View style={styles.savesongbutton} >
                    <FontAwesomeIcon icon={faArrowUp} size={20} color={"lightgrey"} />
                </View>
            </TouchableOpacity>
        )
    }
}

export default SaveSongButton