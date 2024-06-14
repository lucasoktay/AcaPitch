import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import styles from '../styles';
import Song from './song';

const SongList = () => {

    const [songDetails, setSongDetails] = useState([]);

    useEffect(() => {
        const songsCollection = firestore().collection('songs');
        songsCollection.get()
            .then((querySnapshot) => {
                const songsList = [];
                querySnapshot.forEach((doc) => {
                    const songData = doc.data();
                    songsList.push({
                        title: songData.title,
                        tempo: songData.tempo,
                        artist: songData.artist,
                        notes: songData.notes
                    });
                });
                setSongDetails(songsList);
            })
            .catch((error) => {
                console.error('Error fetching songs:', error);
            });
    })

    const AddSong = (title) => {
        setsonglist([songlist, title]);
    }

    return (
        <ScrollView
            style={styles.songlist}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        >
            {songDetails.map(({ title, tempo, artist, notes }, index) => (
                <Song key={index} title={title} tempo={tempo} artist={artist} notes={notes} />
            ))}
        </ScrollView>
    )
}

export default SongList;