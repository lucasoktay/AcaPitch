import { Text, View } from "react-native";
import NavBar from "../navbar/navbar";
import styles from "./styles";

const Piano = () => {

    return (
        <View style={styles.fullscreen}>
            <Text>Piano</Text>
            <NavBar />
        </View>
    )
}

export default Piano