import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useRef, useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { Swipeable } from 'react-native-gesture-handler';
import PlaySound, { stopSound } from "../piano/newmakesound.js";
import styles from "../styles";
import PlayIcon from "./playicon";
import StopIcon from "./stopicon.js";

const Song = ({ title, tempo, artist, notes, onDelete }) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const stopFlagRef = useRef(false); // Use a ref for the stop flag
    const soundsRef = useRef([]); // Use a ref to store the array of sounds
    const swipeableRef = useRef(null);

    const soundFiles = {
        'A0': require('../../assets/sounds/A0.mp3'),
        'Bb0': require('../../assets/sounds/Bb0.mp3'),
        'B0': require('../../assets/sounds/B0.mp3'),
        'C1': require('../../assets/sounds/C1.mp3'),
        'Db1': require('../../assets/sounds/Db1.mp3'),
        'D1': require('../../assets/sounds/D1.mp3'),
        'Eb1': require('../../assets/sounds/Eb1.mp3'),
        'E1': require('../../assets/sounds/E1.mp3'),
        'F1': require('../../assets/sounds/F1.mp3'),
        'Gb1': require('../../assets/sounds/Gb1.mp3'),
        'G1': require('../../assets/sounds/G1.mp3'),
        'Ab1': require('../../assets/sounds/Ab1.mp3'),
        'A1': require('../../assets/sounds/A1.mp3'),
        'Bb1': require('../../assets/sounds/Bb1.mp3'),
        'B1': require('../../assets/sounds/B1.mp3'),
        'C2': require('../../assets/sounds/C2.mp3'),
        'Db2': require('../../assets/sounds/Db2.mp3'),
        'D2': require('../../assets/sounds/D2.mp3'),
        'Eb2': require('../../assets/sounds/Eb2.mp3'),
        'E2': require('../../assets/sounds/E2.mp3'),
        'F2': require('../../assets/sounds/F2.mp3'),
        'Gb2': require('../../assets/sounds/Gb2.mp3'),
        'G2': require('../../assets/sounds/G2.mp3'),
        'Ab2': require('../../assets/sounds/Ab2.mp3'),
        'A2': require('../../assets/sounds/A2.mp3'),
        'Bb2': require('../../assets/sounds/Bb2.mp3'),
        'B2': require('../../assets/sounds/B2.mp3'),
        'C3': require('../../assets/sounds/C3.mp3'),
        'Db3': require('../../assets/sounds/Db3.mp3'),
        'D3': require('../../assets/sounds/D3.mp3'),
        'Eb3': require('../../assets/sounds/Eb3.mp3'),
        'E3': require('../../assets/sounds/E3.mp3'),
        'F3': require('../../assets/sounds/F3.mp3'),
        'Gb3': require('../../assets/sounds/Gb3.mp3'),
        'G3': require('../../assets/sounds/G3.mp3'),
        'Ab3': require('../../assets/sounds/Ab3.mp3'),
        'A3': require('../../assets/sounds/A3.mp3'),
        'Bb3': require('../../assets/sounds/Bb3.mp3'),
        'B3': require('../../assets/sounds/B3.mp3'),
        'C4': require('../../assets/sounds/C4.mp3'),
        'Db4': require('../../assets/sounds/Db4.mp3'),
        'D4': require('../../assets/sounds/D4.mp3'),
        'Eb4': require('../../assets/sounds/Eb4.mp3'),
        'E4': require('../../assets/sounds/E4.mp3'),
        'F4': require('../../assets/sounds/F4.mp3'),
        'Gb4': require('../../assets/sounds/Gb4.mp3'),
        'G4': require('../../assets/sounds/G4.mp3'),
        'Ab4': require('../../assets/sounds/Ab4.mp3'),
        'A4': require('../../assets/sounds/A4.mp3'),
        'Bb4': require('../../assets/sounds/Bb4.mp3'),
        'B4': require('../../assets/sounds/B4.mp3'),
        'C5': require('../../assets/sounds/C5.mp3'),
        'Db5': require('../../assets/sounds/Db5.mp3'),
        'D5': require('../../assets/sounds/D5.mp3'),
        'Eb5': require('../../assets/sounds/Eb5.mp3'),
        'E5': require('../../assets/sounds/E5.mp3'),
        'F5': require('../../assets/sounds/F5.mp3'),
        'Gb5': require('../../assets/sounds/Gb5.mp3'),
        'G5': require('../../assets/sounds/G5.mp3'),
        'Ab5': require('../../assets/sounds/Ab5.mp3'),
        'A5': require('../../assets/sounds/A5.mp3'),
        'Bb5': require('../../assets/sounds/Bb5.mp3'),
        'B5': require('../../assets/sounds/B5.mp3'),
        'C6': require('../../assets/sounds/C6.mp3'),
        'Db6': require('../../assets/sounds/Db6.mp3'),
        'D6': require('../../assets/sounds/D6.mp3'),
        'Eb6': require('../../assets/sounds/Eb6.mp3'),
        'E6': require('../../assets/sounds/E6.mp3'),
        'F6': require('../../assets/sounds/F6.mp3'),
        'Gb6': require('../../assets/sounds/Gb6.mp3'),
        'G6': require('../../assets/sounds/G6.mp3'),
        'Ab6': require('../../assets/sounds/Ab6.mp3'),
        'A6': require('../../assets/sounds/A6.mp3'),
        'Bb6': require('../../assets/sounds/Bb6.mp3'),
        'B6': require('../../assets/sounds/B6.mp3'),
        'C7': require('../../assets/sounds/C7.mp3'),
        'Db7': require('../../assets/sounds/Db7.mp3'),
        'D7': require('../../assets/sounds/D7.mp3'),
        'Eb7': require('../../assets/sounds/Eb7.mp3'),
        'E7': require('../../assets/sounds/E7.mp3'),
        'F7': require('../../assets/sounds/F7.mp3'),
        'Gb7': require('../../assets/sounds/Gb7.mp3'),
        'G7': require('../../assets/sounds/G7.mp3'),
    };

    const renderRightActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 400],
            outputRange: [0, -400],
            extrapolate: 'clamp',
        });

        return (
            <View style={{ justifyContent: 'center', height: "100%", marginRight: 20 }} >
                <Animated.View style={{ transform: [{ translateX: trans }] }}>
                    <Pressable
                        onPress={() => {
                            swipeableRef.current.close();
                            onDelete(title)
                        }}
                        style={styles.deletesongbutton}
                    >
                        <FontAwesomeIcon icon={faTrash} size={24} />
                    </Pressable>
                </Animated.View>
            </View >
        );
    };

    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

    const makeSound = (note) => {
        PlaySound(note, (sound) => {
            soundsRef.current.push(sound); // Add the sound to the array
        }, soundFiles);
    };

    const playNotes = async () => {
        if (isPlaying) {
            stopFlagRef.current = true; // Set the stop flag to true
            soundsRef.current.forEach(sound => stopSound(sound)); // Stop all sounds
            soundsRef.current = []; // Clear the array of sounds
            setIsPlaying(false);
            return;
        }

        setIsPlaying(true);
        stopFlagRef.current = false; // Reset the stop flag
        for (let i = 0; i < notes.length; i++) {
            if (stopFlagRef.current) break;
            makeSound(notes[i]);
            await sleep(550);
        }
        setIsPlaying(false);
        soundsRef.current = []; // Clear the array of sounds after playing
    }

    const formatnotes = notes.join(", ");

    if (tempo != "") {
        tempo = tempo + " BPM";
    }

    if (artist != "") {
        return (
            <Swipeable ref={swipeableRef} renderRightActions={renderRightActions}>
                <View style={styles.songwrapper}>
                    <View style={styles.songwrapperleft}>
                        <Pressable onPress={playNotes}>
                            {isPlaying ? <StopIcon /> : <PlayIcon />}
                        </Pressable>
                        <View >
                            <Text style={styles.song} numberOfLines={1}>{title}</Text>
                            <Text numberOfLines={1}>{artist}</Text>
                        </View>
                    </View>
                    <View style={styles.songinfo}>
                        <Text numberOfLines={1}>{tempo}</Text>
                        <Text numberOfLines={1} >{formatnotes}</Text>
                    </View>
                </View>
            </Swipeable>
        )
    } else {
        return (
            <Swipeable ref={swipeableRef} renderRightActions={renderRightActions}>
                <View style={styles.songwrapper}>
                    <View style={styles.songwrapperleft}>
                        <Pressable onPress={playNotes}>
                            {isPlaying ? <StopIcon /> : <PlayIcon />}
                        </Pressable>
                        <View >
                            <Text style={styles.song} numberOfLines={1}>{title}</Text>
                        </View>
                    </View>
                    <View style={styles.songinfo}>
                        <Text numberOfLines={1} style={{ color: "#444444" }}>{tempo}</Text>
                        <Text numberOfLines={1} style={{ color: "#444444" }}>{formatnotes}</Text>
                    </View>
                </View>
            </Swipeable>
        )
    }
}

export default Song