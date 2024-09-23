import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import colors from '../colors.js';
import PlaySound from '../piano/newmakesound.js';
import styles from '../styles.js';
import BottomButtons from './bottombuttons.js';
import InputPiano from './inputpiano.js';

const AddNotes = () => {
    const navigation = useNavigation();

    const [isKeyPressed, setIsKeyPressed] = useState(false);

    const [areNotesAdded, setAreNotesAdded] = useState(false);

    const [pianoData, setPianoData] = useState()

    const [noteData, setNoteData] = useState([]);

    const [sound, setSound] = useState();

    const handlePlayNote = async (note) => {
        setIsKeyPressed(true);
        setAreNotesAdded(true);
        setNoteData([...noteData, note]);
        await PlaySound(note, setSound);
    };

    const handleClearNotes = () => {
        setNoteData([]);
        setAreNotesAdded(false);
    }

    const handleStopNote = () => {
        // console.log('pianoData: ' + pianoData)
        // Add any additional logic for stopping the note
    };


    const handleSaveButtonPress = () => {
        if (!areNotesAdded) {
            Alert.alert('Add notes or press cancel.');
        } else {
            navigation.navigate('Home', { savedNotes: noteData });
            setNoteData([]);
        }
    };

    return (
        <View style={{ backgroundColor: colors.greyred, height: "100%" }}>
            <View style={styles.newsongscreen}>
                <View style={{ width: "100%", alignItems: 'center' }}>
                    <InputPiano
                        onPlayNoteInput={handlePlayNote}
                        onStopNoteInput={handleStopNote}
                        addedNotes={noteData}
                    />
                    <BottomButtons
                        isKeyPressed={isKeyPressed}
                        areNotesAdded={areNotesAdded}
                        onClearButtonPress={handleClearNotes}
                        onSaveButtonPress={handleSaveButtonPress}
                    />
                    <Text style={styles.noteinfo}> Notes: {noteData.join(", ")} </Text>
                </View>
            </View>
        </View>
    );
}

export default AddNotes;