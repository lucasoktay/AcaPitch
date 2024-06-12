import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { View } from "react-native";
import styles from "./styles";

const PlusButton = () => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <View style={styles.plusbutton}>
                <FontAwesomeIcon icon={faPlus} size={24} />
            </View>
        </View>
    )
}

export default PlusButton