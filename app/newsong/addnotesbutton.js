import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../styles";

const AddNotesButton = ({ noteMessage, noteList, onAddNotesButtonPress }) => {
    const navigation = useNavigation();

    const truncatedNoteList = noteList && Array.isArray(noteList) && noteList.length > 6
        ? noteList.slice(0, 6).concat('...')
        : noteList;

    return (
        <TouchableOpacity onPress={onAddNotesButtonPress}>
            <View style={styles.addnotesbutton}>
                <FontAwesomeIcon icon={faMusic} size={20} color='darkgrey' />
                <Text style={styles.addnotes}>
                    {noteMessage}: {noteList && Array.isArray(noteList) && noteList.length > 0 ? truncatedNoteList.join(', ') : 'None'}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default AddNotesButton