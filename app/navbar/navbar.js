import { useNavigation } from '@react-navigation/native';
import { View } from "react-native";
import colors from '../colors.js';
import styles from "../styles.js";
import HomeIcon from "./homeicon";
import PianoIcon from "./pianoicon";


const NavBar = () => {
    const navigation = useNavigation();
    const currentRoute = navigation.getState().routes[navigation.getState().index].name;
    console.log(currentRoute);
    const pianoColor = currentRoute === 'Piano' ? colors.lightred : colors.darkgrey;
    const homeColor = currentRoute === 'Home' ? colors.lightred : colors.darkgrey;

    return (
        <View style={styles.navbar}>
            <HomeIcon homeColor={homeColor} />
            <PianoIcon pianoColor={pianoColor} />
        </View>
    )
}

export default NavBar;