import { useState } from 'react';
import { ScrollView } from 'react-native';
import Song from './song.js';
import styles from './styles.js';

const SongList = () => {
    const [songlist, setsonglist] = useState([
        { title: "Colors", tempo: "120", artist: "Black Pumas", notes: "F#, A, C"},
        { title: "Feel Like Myself", tempo: "130", artist: "Jonny West", notes: "Db, F, Ab"},
        { title: "Parking Lot", tempo: "140", artist: "Genevieve Stokes", notes: "G, C"},
        { title: "Let Me Go", tempo: "150", artist: "Ogi", notes: "Db, E, A"},
        { title: "Echo", tempo: "160", artist: "Olivia Dean", notes: "Bb, Bb"},
        { title: "Sunday", tempo: "170", artist: "Office Hours", notes: "G, A, D, F#, G, A, D, F#"},
        { title: "song7", tempo: "180", artist: "Lucas OK", notes: "F#, A, C"},
        { title: "song8", tempo: "190", artist: "Lucas OK", notes: "F#, A, C"},
        { title: "song9", tempo: "200", artist: "Lucas OK", notes: "F#, A, C"},
    ]);
    const containerstyle = {
        justifyContent:'space-between',
        rowGap: 8
    }

    const AddSong = (title) => {
        setsonglist([songlist, title]);
    }

    return (
        <ScrollView style={styles.songlist} contentContainerStyle={containerstyle}>
            {songlist.map(({title, tempo, artist, notes}, index) => (
                <Song key={index} title={title} tempo={tempo} artist={artist} notes={notes}/>
            ))}
        </ScrollView>
    )
}

export default SongList;