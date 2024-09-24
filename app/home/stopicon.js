import { faStop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { View } from "react-native";
import styles from "../styles";

const StopIcon = () => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <View style={styles.playicon}>
                <FontAwesomeIcon
                    icon={faStop}
                    size={22}
                // color={colors.lightred}
                />
            </View>
        </View>
    )
}

export default StopIcon;