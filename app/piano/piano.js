import { useRef, useState } from 'react';
import { ScrollView, View } from "react-native";
import { GestureHandlerRootView, PanGestureHandler, State, TapGestureHandler } from 'react-native-gesture-handler';
// import NavBar from "../navbar/navbar";
import { Piano } from '../react-native-piano/index.js';
import styles from "../styles.js";
import NoteLabel from './notelabel.js'; // Import the NoteLabel component

const PianoComponent = ({ handlePlaySound }) => {
    const [pianoData, setPianoData] = useState([]);
    const [currentNote, setCurrentNote] = useState(null);
    const scrollViewRef = useRef(null);
    const panRef = useRef(null);
    const tapRef = useRef(null);

    const handlePlayNote = async (note) => {
        setPianoData(pianoData => [...pianoData, note]);
        handlePlaySound(note);
    };

    handleTouchStart = (midiNumber) => {
        console.log('Touch start');
        setCurrentNote(midiNumber);
    }

    const handleStopNote = () => {
        // console.log(pianoData);
    };

    const handleTapGestureEvent = async (event) => {
        if (event.nativeEvent.state === State.END) {
            if (currentNote !== null) {
                await handlePlaySound(currentNote);
            }
        }
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ backgroundColor: '#F9F5F1', flexGrow: 1 }}>
                <View style={styles.fullscreenpiano}>
                    <PanGestureHandler
                        onGestureEvent={() => { }}
                        onHandlerStateChange={() => { }}
                        waitFor={tapRef}
                        ref={panRef}
                    >
                        <ScrollView
                            horizontal={true}
                            style={styles.pianoscrollview}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            contentOffset={{ x: 700, y: 0 }} // Set the initial scroll position
                            ref={scrollViewRef}
                        >
                            <TapGestureHandler
                                onHandlerStateChange={handleTapGestureEvent}
                                ref={tapRef}
                            >
                                <View style={styles.pianowrapper}>
                                    <Piano
                                        noteRange={{ first: 'c1', last: 'c7' }}
                                        style={styles.piano}
                                        onPlayNoteInput={midiNumber => handleTouchStart(midiNumber)}
                                        onStopNoteInput={midiNumber => handleStopNote()}
                                        children={midiNumber => <NoteLabel midiNumber={midiNumber} />}
                                    />
                                </View>
                            </TapGestureHandler>
                        </ScrollView>
                    </PanGestureHandler>
                </View>
                {/* <NavBar /> */}
            </View>
        </GestureHandlerRootView>
    );
};

export default PianoComponent;