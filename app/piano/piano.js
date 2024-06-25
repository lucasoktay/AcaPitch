import { useRef, useState } from 'react';
import { ScrollView, View } from "react-native";
import NavBar from "../navbar/navbar";
import { Piano } from '../react-native-piano/index.js';
import styles from "../styles.js";
import PlayLocalSoundFile from './makesound.js';
import NoteLabel from './notelabel.js'; // Import the NoteLabel component

const PianoComponent = () => {
    const [pianoData, setPianoData] = useState([]);
    const [isScrolling, setIsScrolling] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);
    const scrollViewRef = useRef(null);

    const makeSound = (note) => {
        PlayLocalSoundFile(note);
    };

    const handlePlayNote = (note) => {
        setPianoData(pianoData => [...pianoData, note]);
        makeSound(note);
    };

    const handleStopNote = () => {
        // console.log(pianoData);
    };

    const handleTouchStart = (midiNumber) => {
        setIsScrolling(false);
        setCurrentNote(midiNumber);
    };

    const handleTouchMove = () => {
        setIsScrolling(true);
    };

    const handleTouchEnd = () => {
        if (!isScrolling && currentNote !== null) {
            handlePlayNote(currentNote);
        }
        setCurrentNote(null);
    };

    return (
        <View style={{ backgroundColor: '#F9F5F1', flexGrow: 1 }}>
            <View style={styles.fullscreenpiano}>
                <ScrollView
                    // ref={scrollViewRef}
                    horizontal={true}
                    style={styles.pianoscrollview}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentOffset={{ x: 700, y: 0 }} // Set the initial scroll position
                    onTouchMove={handleTouchMove}
                >
                    <View style={styles.pianowrapper}>
                        <Piano
                            noteRange={{ first: 'c1', last: 'c7' }}
                            style={styles.piano}
                            onPlayNoteInput={midiNumber => handleTouchStart(midiNumber)}
                            onStopNoteInput={midiNumber => handleTouchEnd()}
                            children={midiNumber => <NoteLabel midiNumber={midiNumber} />}
                        />
                    </View>
                </ScrollView>
            </View>
            <NavBar />
        </View>
    );
};

export default PianoComponent;