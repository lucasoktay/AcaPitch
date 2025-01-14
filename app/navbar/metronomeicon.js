import { useNavigation } from "@react-navigation/native";
// import * as Haptics from 'expo-haptics';
import { Image, Pressable } from "react-native";
import styles from "../styles.js";

const MetronomeIcon = ({ metronomeActive }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        navigation.navigate('Metronome');
    };

    // if metronomeActive, ../../assets/images/metronomered.png, otherwise ../../assets/images/metronomegrey.png

    return (
        <Pressable onPress={handlePress} style={styles.bottomicons}>
            <Image source={metronomeActive ? require('../../assets/images/metronomered.png') : require('../../assets/images/metronomegrey.png')} style={{ width: 36, height: 36 }} />
        </Pressable>
    )
}

export default MetronomeIcon;
