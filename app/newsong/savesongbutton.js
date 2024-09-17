import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from "@react-navigation/native";
import { Pressable, View } from "react-native";
import styles from "../styles";

const SaveSongButton = ({ onSaveButtonPress }) => {
    const navigation = useNavigation();

    return (
        <Pressable onPress={onSaveButtonPress}>
            <View style={styles.savesongbutton} >
                <FontAwesomeIcon icon={faArrowUp} size={20} color={"white"} />
            </View>
        </Pressable>
    )
}

export default SaveSongButton