import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";
import styles from "../styles";

const AddNotesButton = ({ noteMessage }) => {
    const navigation = useNavigation();

    return (
        <Pressable onPress={() => navigation.navigate('Add Notes')}>
            <View style={styles.addnotesbutton}>
                <FontAwesomeIcon icon={faMusic} size={20} color='darkgrey' />
                <Text style={styles.addnotes}>Notes</Text>
            </View>
        </Pressable>
    )
}

export default AddNotesButton