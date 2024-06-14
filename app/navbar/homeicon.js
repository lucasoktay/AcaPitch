import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import styles from "../styles.js";

const HomeIcon = ({ homeColor }) => {
    const navigation = useNavigation();

    return (
        <Pressable onPress={() =>
            navigation.navigate('Home')}
            style={styles.bottomicons}>
            <FontAwesomeIcon
                icon={faHouse}
                size={30}
                color={homeColor}
            />
        </Pressable>
    )
}

export default HomeIcon;