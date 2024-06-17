import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View } from 'react-native';
import PlayLocalSoundFile from '../piano/makesound.js';
import styles from '../styles.js';
import BottomButtons from './bottombuttons.js';
import InputPiano from './inputpiano.js';

const AddNotes = () => {
    const navigation = useNavigation();

    const [isKeyPressed, setIsKeyPressed] = useState(false);

    const [areNotesAdded, setAreNotesAdded] = useState(false);

    const [pianoData, setPianoData] = useState()

    const [noteData, setNoteData] = useState([]);

    const makeSound = (note) => {
        PlayLocalSoundFile(note);
    };

    const handlePlayNote = (note) => {
        setIsKeyPressed(true);
        setPianoData(note);
        makeSound(note);
    };

    const handleStopNote = () => {
        // console.log('pianoData: ' + pianoData)
        // Add any additional logic for stopping the note
    };

    const handleAddButtonPress = () => {
        if (!isKeyPressed) {
            return;
        }

        setIsKeyPressed(false);
        setNoteData([...noteData, pianoData]);
        setAreNotesAdded(true);
        // console.log('noteData: ' + noteData);
    };

    const handleSaveButtonPress = () => {
        if (!areNotesAdded) {
            alert('Add notes or press cancel.');
        } else {
            navigation.navigate('Home', { savedNotes: noteData });
        }
    };

    return (
        <View style={{ backgroundColor: '#B79992', height: "100%" }}>
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
                        onAddButtonPress={handleAddButtonPress}
                        onSaveButtonPress={handleSaveButtonPress}
                    />
                </View>
            </View>
        </View>
    );
}

export default AddNotes;