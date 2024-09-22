import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useRef, useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { Swipeable } from 'react-native-gesture-handler';
import PlaySound from "../piano/newmakesound.js";
import styles from "../styles";
import PlayIcon from "./playicon";

const Song = ({ title, tempo, artist, notes, onDelete }) => {

    const [sound, setSound] = useState();
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

    const makeSound = (note) => {
        PlaySound(note, setSound);
    };

    const playNotes = async () => {
        // for loop
        for (let i = 0; i < notes.length; i++) {
            makeSound(notes[i]);
            await sleep(550);
        }
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
                            <PlayIcon />
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
                            <PlayIcon />
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