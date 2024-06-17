import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";
import styles from "../styles";

const AddNotesButton = ({ noteMessage }) => {
    const navigation = useNavigation();

    return (
        <Pressable onPress={() => navigation.navigate('Add Notes')}>
            <View style={styles.addnotesbutton}>
                <FontAwesomeIcon icon={faPlus} size={20} color={'white'} style={{ marginRight: 16 }} />
                <View style={{ width: "100%", alignItems: 'center' }}>
                    <Text style={styles.addnotes}>{noteMessage} (REQUIRED)</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default AddNotesButton