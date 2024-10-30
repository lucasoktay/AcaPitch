import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import styles from '../styles';
import Song from './song';

const SongList = ({ handlePlaySound }) => {
    const [songDetails, setSongDetails] = useState([]);
    const [songOrder, setSongOrder] = useState([]);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [unsubscribe, setUnsubscribe] = useState(null);
    const [topLineOpacity] = useState(new Animated.Value(0));
    const [bottomLineOpacity] = useState(new Animated.Value(0));
    const [contentHeight, setContentHeight] = useState(0);
    const scrollY = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribeAuth = auth().onAuthStateChanged(user => {
            setIsSignedIn(!!user);
            if (user) {
                fetchSongs(user.uid);
            } else {
                setSongDetails([]);
                setSongOrder([]);
            }
        });

        return () => unsubscribeAuth();
    }, []);

    const fetchSongs = async (uid) => {
        const userDocRef = firestore()
            .collection('users')
            .where('uid', '==', uid);

        const unsubscribeListener = userDocRef.onSnapshot(async (querySnapshot) => {
            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const userSongList = userDoc.data().songs;
                const userSongOrder = userDoc.data().songOrder || [];

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

                // Update song order if there are new songs
                const songIds = songsList.map(song => song.id);
                const newSongOrder = userSongOrder.filter(id => songIds.includes(id));
                const newSongs = songIds.filter(id => !newSongOrder.includes(id));
                const updatedSongOrder = [...newSongOrder, ...newSongs];
                setSongOrder(updatedSongOrder);

                // Update Firestore with the new song order
                if (newSongs.length > 0) {
                    await userDoc.ref.update({ songOrder: updatedSongOrder });
                }
            } else {
                setSongDetails([]);
            }
        }, (error) => {
            console.error("Error fetching user document: ", error);
        });

        setUnsubscribe(() => unsubscribeListener);
    };

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
            if (!songDoc) {
                console.error('Song not found');
                return;
            }

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
                const updatedSongOrder = songOrder.filter(id => id !== songDoc.id);

                await userDoc.ref.update({
                    songs: updatedSongs,
                    songOrder: updatedSongOrder
                });

                // Update local state
                setSongOrder(updatedSongOrder);
                setSongDetails(songDetails.filter(song => song.id !== songDoc.id));

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

    const orderedSongs = songOrder.map(id => {
        const song = songDetails.find(song => song.id === id);
        if (!song) {
            console.error(`Song with id ${id} not found in songDetails`);
        }
        return song;
    }).filter(song => song !== undefined);

    return (
        <View style={styles.songlist}>
            <Animated.View style={[styles.topline, { opacity: topLineOpacity }]} />
            {songDetails.length === 0 ? (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.nosongs}>
                        {isSignedIn ? "Add songs to get started!" : (
                            <>
                                <Pressable onPress={() => navigation.navigate('SignIn')}>
                                    <Text style={styles.signintoaddsongs}>Sign in</Text>
                                </Pressable>
                                <View style={{ textAlignVertical: 'center' }}>
                                    <Text style={styles.toaddsongs}> to add songs! </Text>
                                </View>
                            </>
                        )}
                    </Text>
                    <Text style={styles.nosongssub}>{isSignedIn ? "Swipe left on a song to delete (edit coming soon)." : ""}</Text>
                </View>
            ) : null}
            <DraggableFlatList
                data={orderedSongs}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                onDragEnd={async ({ data }) => {
                    const newOrder = data.map(song => song.id);
                    setSongOrder(newOrder);

                    // Update Firestore with the new song order
                    const currentUser = auth().currentUser;
                    if (currentUser) {
                        const userDocRef = firestore()
                            .collection('users')
                            .where('uid', '==', currentUser.uid);

                        const userQuerySnapshot = await userDocRef.get();
                        if (!userQuerySnapshot.empty) {
                            const userDoc = userQuerySnapshot.docs[0];
                            await userDoc.ref.update({ songOrder: newOrder });
                        }
                    }
                }}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingBottom: 20 }}
                onContentSizeChange={(width, height) => setContentHeight(height)}
            />
            <Animated.View style={[styles.bottomline, { opacity: bottomLineOpacity }]} />
        </View>
    )
}

export default SongList;