import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";
import styles from "../styles";

const SaveSongButton = ({ onSaveButtonPress }) => {
    const navigation = useNavigation();

    return (
        <Pressable onPress={onSaveButtonPress}>
            <View style={styles.addnotesbutton}>
                <View style={{ width: "100%", alignItems: 'center' }}>
                    <Text style={styles.savesong}>SAVE SONG</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default SaveSongButton