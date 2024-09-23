import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, View } from 'react-native';
import styles from '../styles';
import Song from './song';

const SongList = () => {
    const [songDetails, setSongDetails] = useState([]);
    const [unsubscribe, setUnsubscribe] = useState(null);
    const [topLineOpacity] = useState(new Animated.Value(0));
    const [bottomLineOpacity] = useState(new Animated.Value(0));
    const [contentHeight, setContentHeight] = useState(0);
    const scrollY = useRef(new Animated.Value(0)).current;

    // get songlist from backend and listen for real-time updates
    useEffect(() => {
        const currentUser = auth().currentUser;
        if (!currentUser) {
            console.error('No user is currently signed in');
            return;
        }

        const userDocRef = firestore()
            .collection('users')
            .where('uid', '==', currentUser.uid);

        const unsubscribeListener = userDocRef.onSnapshot(async (querySnapshot) => {
            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const userSongList = userDoc.data().songs;

                const songsCollection = firestore().collection('songs');
                const songPromises = userSongList.map(id => songsCollection.doc(id).get());
                const songDocs = await Promise.all(songPromises);

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
                setSongDetails([]);
            }
        }, (error) => {
            console.error("Error fetching user document: ", error);
        });

        setUnsubscribe(() => unsubscribeListener);

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    useEffect(() => {
        if (contentHeight > 0) {
            const showTopLine = scrollY.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: [0, 0, 1],
            });

            var showBottomLine = scrollY.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: [1, 1, 1]
            })

            console.log("height: ", contentHeight)
            if (contentHeight < 581) {
                showBottomLine = scrollY.interpolate({
                    inputRange: [contentHeight - 600, 0, 1],
                    outputRange: [1, 0, 0],
                });
            }



            Animated.timing(topLineOpacity, {
                toValue: showTopLine,
                duration: 1,
                useNativeDriver: true,
            }).start();

            Animated.timing(bottomLineOpacity, {
                toValue: showBottomLine,
                duration: 1,
                useNativeDriver: true,
            }).start();
        }
    }, [scrollY, contentHeight]);

    const deleteSong = async (title) => {
        try {
            const currentUser = auth().currentUser;

            const songDoc = songDetails.find(song => song.title === title);

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

        } catch (error) {
            console.error('Error deleting song:', error);
        }
    }

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
    );

    return (
        <View style={styles.songlist}>
            <Animated.View style={[styles.topline, { opacity: topLineOpacity }]} />

            <ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingBottom: 20 }}
                onContentSizeChange={(width, height) => setContentHeight(height)}
            >
                {songDetails.map(({ title, tempo, artist, notes }, index) => (
                    <Song key={index} title={title} tempo={tempo} artist={artist} notes={notes} onDelete={deleteSong} />
                ))}
            </ScrollView>

            <Animated.View style={[styles.bottomline, { opacity: bottomLineOpacity }]} />
        </View>
    )
}

export default SongList;