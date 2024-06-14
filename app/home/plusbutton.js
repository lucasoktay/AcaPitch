import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Text, View } from "react-native";
import styles from "../styles";

const PlusButton = () => {
    return (
        <View >
            <View style={styles.plusbutton}>
                <FontAwesomeIcon icon={faPlus} size={32} style={{ marginRight: 16 }} />
                <Text style={styles.song} numberOfLines={1}>Add Song</Text>
            </View>
        </View>
    )
}

export default PlusButton