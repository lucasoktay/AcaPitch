import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import styles from '../styles';
import Song from './song';

const SongList = () => {
    const [songDetails, setSongDetails] = useState([]);

    // get songlist from backend
    useEffect(() => {
        const songsCollection = firestore().collection('songs');
        songsCollection.get()
            .then((querySnapshot) => {
                const songsList = [];
                querySnapshot.forEach((doc) => {
                    const songData = doc.data();
                    songsList.push({
                        id: doc.id, // Store the document ID
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
    }, []);

    const deleteSong = async (title) => {
        try {
            // Find the song document by title
            const songDoc = songDetails.find(song => song.title === title);
            if (songDoc) {
                // Delete the document from Firestore
                await firestore().collection('songs').doc(songDoc.id).delete();
                // Update the local state to remove the deleted song
                setSongDetails(songDetails.filter(song => song.title !== title));
            } else {
                console.error('Song not found');
            }
        } catch (error) {
            console.error('Error deleting song:', error);
        }
    }

    return (
        <ScrollView
            style={styles.songlist}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        >
            {songDetails.map(({ title, tempo, artist, notes }, index) => (
                <Song key={index} title={title} tempo={tempo} artist={artist} notes={notes} onDelete={deleteSong} />
            ))}
        </ScrollView>
    )
}

export default SongList;