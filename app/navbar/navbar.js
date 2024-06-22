import { useNavigation } from '@react-navigation/native';
import { View } from "react-native";
import styles from "../styles.js";
import HomeIcon from "./homeicon";
import PianoIcon from "./pianoicon";


const NavBar = () => {
    const navigation = useNavigation();
    const idx = navigation.getState().index;
    const pianoColor = idx === 1 ? '#DF7B43' : '#444444';
    const homeColor = idx === 0 ? '#DF7B43' : '#444444';


    return (
        <View style={styles.navbar}>
            <HomeIcon homeColor={homeColor} />
            <PianoIcon pianoColor={pianoColor} />
        </View>
    )
}

export default NavBar;