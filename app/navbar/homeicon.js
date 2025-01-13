// import { faHouse } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from "@react-navigation/native";
import { Home } from "react-native-feather";
// import * as Haptics from 'expo-haptics';
import { Pressable } from "react-native";
import styles from "../styles.js";

const HomeIcon = ({ homeColor }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        navigation.navigate('Home');
    };

    return (
        <Pressable onPress={handlePress} style={styles.bottomicons}>
            <Home stroke={homeColor} width={36} height={36} />
        </Pressable>
    )
}

export default HomeIcon;
