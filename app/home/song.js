import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useRef, useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { Swipeable } from 'react-native-gesture-handler';
import { stopSound } from "../piano/newmakesound.js";
import styles from "../styles";
import PlayIcon from "./playicon";
import StopIcon from "./stopicon.js";

const Song = ({ title, tempo, artist, notes, onDelete, handlePlaySound }) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState();
    const stopFlagRef = useRef(false); // Use a ref for the stop flag
    const soundsRef = useRef([]); // Use a ref to store the array of sounds
    const swipeableRef = useRef(null);

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

    // const makeSound = async (note) => {
    //     soundsRef.current.push(sound); // Add the sound to the array
    //     await PlaySound(note, setSound, loadedSounds);
    // };

    const makeSound = async (note) => {
        handlePlaySound(note);
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
            await makeSound(notes[i]);
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

export default Song;