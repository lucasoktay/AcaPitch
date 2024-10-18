import { useEffect, useState } from 'react';
import { ScrollView, View } from "react-native";
import { Piano } from '../react-native-piano/index.js';
import styles from "../styles.js";

const InputPiano = ({ addedNotes, onPlayNoteInput, onStopNoteInput, activeKey, resetActiveKey }) => {
    const [isScrolling, setIsScrolling] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);

    useEffect(() => {
        if (activeKey === null) {
            setCurrentNote(null);
        }
    }, [activeKey]);

    const handleTouchStart = (midiNumber) => {
        setIsScrolling(false);
        setCurrentNote(midiNumber);
    };

    const handleTouchMove = () => {
        setIsScrolling(true);
    };

    const handleTouchEnd = async () => {
        if (!isScrolling && currentNote !== null) {
            onPlayNoteInput(currentNote);
        }
        // setCurrentNote(null);
    };

    return (
        <ScrollView
            horizontal={true}
            style={styles.pianoscrollview}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentOffset={{ x: 700, y: 0 }}
            onTouchMove={handleTouchMove}
        >
            <View style={styles.pianowrapper}>
                <Piano
                    noteRange={{ first: 'c1', last: 'c7' }}
                    style={styles.piano}
                    onPlayNoteInput={midiNumber => handleTouchStart(midiNumber)}
                    onStopNoteInput={midiNumber => handleTouchEnd()}
                    addedNotes={addedNotes}
                />
            </View>
        </ScrollView>
    )
}

export default InputPiano;