import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";
import styles from "../styles";

const AddNotesButton = ({ noteMessage, noteList, onAddNotesButtonPress }) => {
    const navigation = useNavigation();

    console.log(noteList);

    return (
        <Pressable onPress={onAddNotesButtonPress}>
            <View style={styles.addnotesbutton}>
                <FontAwesomeIcon icon={faMusic} size={20} color='darkgrey' />
                <Text style={styles.addnotes}>
                    {noteMessage}: {noteList && Array.isArray(noteList) && noteList.length > 0 ? noteList.join(', ') : 'None'}
                </Text>
            </View>
        </Pressable>
    )
}

export default AddNotesButton