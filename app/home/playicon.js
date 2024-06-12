import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { View } from "react-native";
import styles from "./styles";

const PlayIcon = () => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <View style={styles.playicon}>
                <FontAwesomeIcon
                    icon={faPlay}
                    size={28}
                    style={{ marginLeft: 4 }}
                />
            </View>
        </View>
    )
}

export default PlayIcon;