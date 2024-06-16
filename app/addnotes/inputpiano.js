import { ScrollView, View } from "react-native";
import { Piano } from 'react-native-piano';
// import { instrument } from 'react-native-soundfont';
import styles from "../styles.js";



const InputPiano = ({ onPlayNoteInput, onStopNoteInput }) => {

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
        >
            <View style={styles.pianowrapper}>
                <Piano
                    noteRange={{ first: 'c1', last: 'c7' }}
                    style={styles.piano}
                    onPlayNoteInput={midiNumber => handlePlayNote(midiNumber)}
                    onStopNoteInput={midiNumber => handleStopNote()}
                />
            </View>
        </ScrollView>
    )
}

export default InputPiano