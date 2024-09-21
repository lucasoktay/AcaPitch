import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import styles from '../styles';
import Song from './song';

const SongList = () => {
    const [songDetails, setSongDetails] = useState([]);
    const [unsubscribe, setUnsubscribe] = useState(null);


    const deleteSong = async (title) => {
        try {
            const currentUser = auth().currentUser;
            if (!currentUser) {
                console.error('No user is currently signed in');
                return;
            }

            // Find the song document by title
            const songDoc = songDetails.find(song => song.title === title);
            if (!songDoc) {
                console.error('Song not found');
                return;
            }

            // Delete the document from the songs collection
            await firestore().collection('songs').doc(songDoc.id).delete();

            // Update the user's document to remove the song ID
            const userQuerySnapshot = await firestore()
                .collection('users')
                .where('uid', '==', currentUser.uid)
                .get();

            if (!userQuerySnapshot.empty) {
                const userDoc = userQuerySnapshot.docs[0];
                const userData = userDoc.data();
                const updatedSongs = userData.songs.filter(id => id !== songDoc.id);

                await userDoc.ref.update({
                    songs: updatedSongs
                });

                console.log('Song removed from user\'s list');
            } else {
                console.error('User document not found');
            }

            // Update the local state to remove the deleted song
            setSongDetails(songDetails.filter(song => song.title !== title));

        } catch (error) {
            console.error('Error deleting song:', error);
        }
    }

    // get songlist from backend and listen for real-time updates
    useEffect(() => {
        const currentUser = auth().currentUser;
        const songsCollection = firestore().collection('songs');
        const userSongsRef = firestore()
            .collection('users')
            .where('uid', '==', currentUser.uid)
            .get()
            .then(async querySnapshot => {
                if (!querySnapshot.empty) {
                    // Assuming the query returns a single document:
                    const userDoc = querySnapshot.docs[0]; // Get the first document
                    const userSongList = userDoc.data().songs;
                    console.log("User document found:", userSongList);

                    // get song list from doc id list (userSongList)
                    const songPromises = userSongList.map(id => songsCollection.doc(id).get());
                    const songDocs = await Promise.all(songPromises);

                    // set song details
                    const songsList = songDocs.map(doc => {
                        const songData = doc.data();
                        return {
                            id: doc.id,
                            title: songData.title,
                            tempo: songData.tempo,
                            artist: songData.artist,
                            notes: songData.notes
                        };
                    });

                    setSongDetails(songsList);
                } else {
                    console.log("No matching user document found.");
                }
            })
            .catch(error => {
                console.error("Error fetching user document: ", error);
            });
    }, []);

    console.log("songlist: ", songDetails);

    return (
        <View style={styles.songlist}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                {songDetails.map(({ title, tempo, artist, notes }, index) => (
                    <Song key={index} title={title} tempo={tempo} artist={artist} notes={notes} onDelete={deleteSong} />
                ))}
            </ScrollView>
        </View>
    )
}

export default SongList;