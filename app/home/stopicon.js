// import { faStop } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { View } from "react-native";
import { StopCircle } from 'react-native-feather';
import colors from "../colors";
import styles from "../styles";

const StopIcon = () => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <View style={styles.playicon}>
                <StopCircle strokeWidth={1} stroke={colors.lightred} width={46} height={46} />
            </View>
        </View>
    )
}

export default StopIcon;