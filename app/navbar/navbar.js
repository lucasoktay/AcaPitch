import { View } from "react-native";
import styles from "../home/styles";
import HomeIcon from "./homeicon";
import PianoIcon from "./pianoicon";

const NavBar = () => {
    return (
        <View style={styles.navbar}>
            <HomeIcon />
            <PianoIcon />
        </View>
    )
}

export default NavBar;