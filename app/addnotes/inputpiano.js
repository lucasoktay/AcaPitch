import { ScrollView, View } from "react-native";
import { Piano } from '../react-native-piano/index.js';
// import { instrument } from 'react-native-soundfont';
import styles from "../styles.js";



const InputPiano = ({ addedNotes, onPlayNoteInput, onStopNoteInput }) => {

    const handleStopNote = () => {
        onStopNoteInput();
        // console.log(pianoData);
    }

    const handlePlayNote = (midiNumber) => {
        onPlayNoteInput(midiNumber);
        // console.log(pianoData);
    }
    return (
        <ScrollView
            horizontal={true}
            style={styles.pianoscrollview}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentOffset={{ x: 700, y: 0 }}
        >
            <View style={styles.pianowrapper}>
                <Piano
                    noteRange={{ first: 'c1', last: 'c7' }}
                    style={styles.piano}
                    onPlayNoteInput={midiNumber => handlePlayNote(midiNumber)}
                    onStopNoteInput={midiNumber => handleStopNote()}
                    addedNotes={addedNotes}
                />
            </View>
        </ScrollView>
    )
}

export default InputPiano