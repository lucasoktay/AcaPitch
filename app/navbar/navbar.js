import { useNavigation } from '@react-navigation/native';
import { View } from "react-native";
import colors from '../colors.js';
import styles from "../styles.js";
import HomeIcon from "./homeicon";
import PianoIcon from "./pianoicon";


const NavBar = () => {
    const navigation = useNavigation();
    const idx = navigation.getState().index;
    console.log(idx);
    const pianoColor = idx === 2 ? colors.lightred : colors.darkgrey;
    const homeColor = idx === 1 ? colors.lightred : colors.darkgrey;


    return (
        <View style={styles.navbar}>
            <HomeIcon homeColor={homeColor} />
            <PianoIcon pianoColor={pianoColor} />
        </View>
    )
}

export default NavBar;