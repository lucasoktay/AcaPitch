import { Text, View } from "react-native";
import NavBar from "../navbar/navbar";
import styles from "../styles.js";

const Piano = () => {

    return (
        <View style={{ backgroundColor: '#f9f5ef', flexGrow: 1 }}>
            <View style={styles.fullscreen}>
                <Text>Piano</Text>
            </View>
            <NavBar />
        </View>
    )
}

export default Piano