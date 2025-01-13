import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import PianoComponent from '../piano/piano.js';
import styles from '../styles.js';
import BottomButtons from './bottombuttons.js';
// import InputPiano from './inputpiano.js';

const AddNotes = ({ handlePlaySound }) => {
    const navigation = useNavigation();

    const [isKeyPressed, setIsKeyPressed] = useState(false);

    const [areNotesAdded, setAreNotesAdded] = useState(false);

    const [pianoData, setPianoData] = useState()

    const [noteData, setNoteData] = useState([]);

    const handlePlayNote = async (note) => {
        setIsKeyPressed(true);
        setAreNotesAdded(true);
        setNoteData([...noteData, note]);
        // handlePlaySound(note);
    };

    const handleClearNotes = () => {
        setNoteData([]);
        setAreNotesAdded(false);
    }

    const handleStopNote = () => {
    };


    const handleSaveButtonPress = () => {
        if (!areNotesAdded) {
            Alert.alert('Add notes or press cancel.');
        } else {
            navigation.navigate('Home', { savedNotes: noteData });
        }
    };

    return (
        <View style={{ backgroundColor: "white", height: "100%" }}>
            <View style={styles.newsongscreen}>
                <View style={{ width: "100%", alignItems: 'center' }}>
                    <View style={{ marginTop: -51, height: 270 }}>
                        <PianoComponent handlePlaySound={handlePlaySound} handlePlayNoteAddNote={handlePlayNote} />
                    </View>
                    <BottomButtons
                        isKeyPressed={isKeyPressed}
                        areNotesAdded={areNotesAdded}
                        onClearButtonPress={handleClearNotes}
                        onSaveButtonPress={handleSaveButtonPress}
                    />
                    <Text style={styles.noteinfo}> Notes: {noteData.join(", ")} </Text>
                </View>
            </View>
        </View >
    );
}

export default AddNotes;