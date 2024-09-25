import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import NavBar from '../navbar/navbar.js';
import NewSong from '../newsong/newsong.js';
import PlaySound from '../piano/newmakesound.js';
import styles from '../styles.js';
import PlusButton from './plusbutton.js';
// import SearchBar from './searchbar.js';
import { useNavigation } from '@react-navigation/native';
import SettingsIcon from './settingsicon.js';
import SongList from './songlist.js';

const Home = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [noteMessage, setNoteMessage] = useState("Notes");
    const [sound, setSound] = useState();
    const userCollection = firestore().collection('users');
    const songsCollection = firestore().collection('songs');
    const modalizeRef = useRef(null);
    const route = useRoute();
    const { savedNotes } = route.params || {};
    const navigation = useNavigation();

    useEffect(() => {
        if (savedNotes) {
            setNoteMessage("Notes");
        }
    }, [savedNotes]);

    const handlePlusButtonPress = () => {
        setNoteMessage("Notes");
        modalizeRef.current?.open();
    }

    const handlePlaySound = async (note) => {
        await PlaySound(note, setSound);
    }

    const handleAddNotesButtonPress = () => {
        navigation.navigate('Add Notes');
    }

    const handleSaveButtonPress = async ({ title, artist, tempo }) => {
        if (!savedNotes || !title) {
            if (title) {
                Alert.alert("Add some notes first!");
            } else if (savedNotes) {
                Alert.alert("Please enter a title.");
            } else {
                Alert.alert("Please enter a title and add notes, or swipe down to cancel.");
            }
            return;
        }

        try {
            const currentUser = auth().currentUser;
            if (!currentUser) {
                Alert.alert("Error", "No user is currently signed in.");
                return;
            }

            // Add the new song to the songs collection
            const newSongRef = await songsCollection.add({
                title: title,
                artist: artist,
                tempo: tempo,
                notes: savedNotes
            });

            console.log('New song added with ID:', newSongRef.id);

            // Update the user's document to include the new song ID
            const userQuerySnapshot = await userCollection
                .where('uid', '==', currentUser.uid)
                .get();

            if (!userQuerySnapshot.empty) {
                const userDoc = userQuerySnapshot.docs[0];
                await userDoc.ref.update({
                    songs: firestore.FieldValue.arrayUnion(newSongRef.id)
                });
                console.log('Song ID added to user\'s songs list');
            } else {
                console.error('User document not found');
                Alert.alert("Error", "Failed to update user's song list.");
            }

            modalizeRef.current?.close();

        } catch (error) {
            console.error('Error saving song:', error);
            Alert.alert("Error", "Failed to save the song. Please try again.");
        }
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ backgroundColor: "white", flexGrow: 1 }}>
                <View style={styles.fullscreen}>
                    <View style={styles.topbar}>
                        {/* <SearchBar /> */}
                        <SettingsIcon />
                    </View>

                    <Text style={[styles.yoursongs]}>Your Songs</Text>

                    <View style={{ height: 600 }}>
                        <SongList />
                    </View>

                    <PlusButton onPlusButtonPress={handlePlusButtonPress} />

                </View>
                <NavBar />
                <Modalize
                    ref={modalizeRef}
                    modalStyle={{ borderRadius: 20, overflow: 'hidden' }}
                    adjustToContentHeight={true}
                >
                    <NewSong onSaveButtonPress={handleSaveButtonPress} onAddNotesButtonPress={handleAddNotesButtonPress} noteMessage={noteMessage} noteList={savedNotes} />
                </Modalize>
            </View>
        </GestureHandlerRootView>
    );
}

export default Home;
