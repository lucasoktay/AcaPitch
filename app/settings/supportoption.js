import { faLink, faMugHot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Linking, Pressable, Text } from "react-native";
import colors from '../colors';
import styles from "../styles";

const SupportButton = () => {
    return (
        <Pressable style={styles.themesbutton} onPress={() => Linking.openURL('https://buymeacoffee.com/lucasoktay')}>
            <FontAwesomeIcon style={styles.themesicon} icon={faMugHot} size={20} color={colors.lightred} />
            <Text style={{ fontSize: 20, fontFamily: 'RubikRegular' }}>Support Me</Text>
            <FontAwesomeIcon style={{ position: 'absolute', right: 20 }} icon={faLink} color={colors.darkgrey} size={16} />
        </Pressable>
    )
}

export default SupportButton