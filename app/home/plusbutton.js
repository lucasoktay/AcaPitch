import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";
import colors from '../colors';
import styles from "../styles";

const PlusButton = ({ onPlusButtonPress }) => {
    // const navigation = useNavigation();

    return (
        <View>
            <Pressable onPress={onPlusButtonPress}>
                <View style={styles.plusbutton}>
                    <FontAwesomeIcon icon={faPlus} size={32} style={{ marginRight: 16, color: colors.lightred }} />
                    <Text style={styles.song} numberOfLines={1}>Add Song</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default PlusButton