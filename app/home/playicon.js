// import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { PlayCircle } from 'react-native-feather';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { View } from "react-native";
import styles from '../styles';

const PlayIcon = () => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <View style={styles.playicon}>
                <PlayCircle strokeWidth={1} stroke={"black"} width={46} height={46} />
            </View>
        </View>
    )
}

export default PlayIcon;