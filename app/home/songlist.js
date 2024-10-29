import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import styles from '../styles';
import Song from './song';

const SongList = ({ handlePlaySound }) => {
    const [songDetails, setSongDetails] = useState([]);
    const [unsubscribe, setUnsubscribe] = useState(null);
    const [topLineOpacity] = useState(new Animated.Value(0));
    const [bottomLineOpacity] = useState(new Animated.Value(0));
    const [contentHeight, setContentHeight] = useState(0);
    const scrollY = useRef(new Animated.Value(0)).current;

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
                    if (songData === undefined) {
                        console.log(doc.id)
                    }
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

    const renderItem = ({ item, drag, isActive }) => {
        return (
            <Song
                key={item.id}
                title={item.title}
                tempo={item.tempo}
                artist={item.artist}
                notes={item.notes}
                onDelete={deleteSong}
                handlePlaySound={handlePlaySound}
                onLongPress={drag}
                isActive={isActive}
            />
        );
    };

    return (
        <View style={styles.songlist}>
            <Animated.View style={[styles.topline, { opacity: topLineOpacity }]} />
            {songDetails.length === 0 ? (
                <View style={{ rowGap: 8 }}>
                    <Text style={styles.nosongs}>Add songs to get started!</Text>
                    <Text style={styles.nosongssub}>Artist and Tempo fields optional.</Text>
                    <Text style={styles.nosongssub}>Swipe left on a song to delete (edit coming soon).</Text>
                </View>
            ) : null}
            <DraggableFlatList
                data={songDetails}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                onDragEnd={({ data }) => setSongDetails(data)}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingBottom: 20 }}
                onContentSizeChange={(width, height) => setContentHeight(height)}
            />
            <Animated.View style={[styles.bottomline, { opacity: bottomLineOpacity }]} />
        </View>
    )
}

export default SongList;