import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { useNavigation } from "@react-navigation/native";
// import Haptics from 'expo-haptics';
import { Pressable, Text, View } from "react-native";
import colors from '../colors';
import styles from "../styles";

const PlusButton = ({ onPlusButtonPress }) => {

    const handlePress = () => {
        // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onPlusButtonPress();
    };

    return (
        <Pressable onPress={handlePress} style={styles.plusbutton}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesomeIcon icon={faPlus} size={32} style={{ marginRight: 16, color: colors.lightred }} />
                <Text style={styles.song} numberOfLines={1}>Add Song</Text>
            </View>
        </Pressable>
    )
}

export default PlusButton