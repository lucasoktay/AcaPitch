import { Text, View } from "react-native";
import styles from "../styles";
import PlayIcon from "./playicon";

const Song = ({ title, tempo, artist, notes }) => {

    const formatnotes = notes.join(", ");

    return (
        <View style={styles.songwrapper}>
            <View style={styles.songwrapperleft}>
                <PlayIcon />
                <View >
                    <Text style={styles.song} numberOfLines={1}>{title}</Text>
                    <Text numberOfLines={1}>{artist}</Text>
                </View>
            </View>
            <View style={styles.songinfo}>
                <Text numberOfLines={1}>{tempo} BPM</Text>
                <Text numberOfLines={1}>{formatnotes}</Text>
            </View>
        </View>
    )
}

export default Song