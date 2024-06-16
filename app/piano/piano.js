import { useState } from 'react';
import { ScrollView, View } from "react-native";
import { Piano } from 'react-native-piano';
// import { instrument } from 'react-native-soundfont';
import NavBar from "../navbar/navbar";
import styles from "../styles.js";
import PlayLocalSoundFile from './makesound.js';
import NoteLabel from './notelabel.js'; // Import the NoteLabel component



const PianoComponent = () => {

    const [pianoData, setPianoData] = useState([])

    const makeSound = (note) => {
        PlayLocalSoundFile(note);
    };

    const handlePlayNote = (note) => {
        setPianoData(pianoData => [...pianoData, note]);
        makeSound(note);
    }

    const handleStopNote = () => {
        // console.log(pianoData);
    }

    return (
        <View style={{ backgroundColor: '#f9f5ef', flexGrow: 1 }}>
            <View style={styles.fullscreenpiano}>
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
                            children={midiNumber => <NoteLabel midiNumber={midiNumber} />}
                        />
                    </View>
                </ScrollView>
            </View>
            <NavBar />
        </View>
    )
}

export default PianoComponent