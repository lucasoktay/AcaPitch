import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../styles";

const AddNotesButton = ({ noteMessage, noteList, onAddNotesButtonPress }) => {
    const navigation = useNavigation();

    // turn the note list into a comma separated string
    noteString = '';
    if (noteList && noteList.length > 0) {
        noteString = noteList.join(', ');
    }

    // if the note string is longer than x characters (including spaces), truncate it
    if (noteString.length > 21) {
        noteString = noteString.substring(0, 21)
        // if the notestring ends in a space, remove it
        if (noteString.charAt(noteString.length - 1) == ' ') {
            noteString = noteString.substring(0, noteString.length - 1)
        }
        // if the note string ends in a comma, remove it
        if (noteString.charAt(noteString.length - 1) == ',') {
            noteString = noteString.substring(0, noteString.length - 1)
        }

        noteString = noteString + '...'
    }

    return (
        <TouchableOpacity onPress={onAddNotesButtonPress}>
            <View style={styles.addnotesbutton}>
                <FontAwesomeIcon icon={faMusic} size={20} color='darkgrey' />
                <Text style={styles.addnotes}>
                    {noteMessage}: {noteString}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default AddNotesButton