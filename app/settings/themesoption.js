import { faChevronRight, faPalette } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { Pressable, Text } from "react-native";
import colors from '../colors';
import styles from "../styles";

const ThemesButton = () => {
    const navigation = useNavigation();

    return (
        <Pressable style={styles.themesbutton} onPress={() => navigation.navigate('Themes')}>
            <FontAwesomeIcon style={styles.themesicon} icon={faPalette} size={20} color={colors.lightred} />
            <Text style={{ fontSize: 20, fontFamily: 'RubikRegular' }}>Theme</Text>
            <FontAwesomeIcon style={{ position: 'absolute', right: 20 }} icon={faChevronRight} color={colors.darkgrey} size={16} />
        </Pressable>
    )
}

export default ThemesButton