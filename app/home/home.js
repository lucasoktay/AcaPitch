import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import NavBar from '../navbar/navbar.js';
import NewSong from '../newsong/newsong.js';
import styles from '../styles.js';
import PlusButton from './plusbutton.js';
import SettingsIcon from './settingsicon.js';
import SongList from './songlist.js';

const Home = ({ handlePlaySound }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [noteMessage, setNoteMessage] = useState("Notes");
    const [sound, setSound] = useState();
    const [savedNotesState, setSavedNotesState] = useState(null);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const userCollection = firestore().collection('users');
    const songsCollection = firestore().collection('songs');
    const modalizeRef = useRef(null);
    const route = useRoute();
    const { savedNotes } = route.params || {};
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(user => {
            setIsSignedIn(!!user);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (savedNotes) {
            setNoteMessage("Notes");
            setSavedNotesState(savedNotes);
        }
    }, [savedNotes]);

    const handlePlusButtonPress = () => {
        if (!isSignedIn) {
            Alert.alert("Sign in to add songs!");
            return;
        }
        setNoteMessage("Notes");
        modalizeRef.current?.open();
    }

    const handleAddNotesButtonPress = () => {
        navigation.navigate('Add Notes');
    }

    const handleSaveButtonPress = async ({ title, artist, tempo }) => {
        if (!savedNotesState || !title) {
            if (title) {
                Alert.alert("Add some notes first!");
            } else if (savedNotesState) {
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
                notes: savedNotesState
            });

            // Update the user's document to include the new song ID
            const userQuerySnapshot = await userCollection
                .where('uid', '==', currentUser.uid)
                .get();

            if (!userQuerySnapshot.empty) {
                const userDoc = userQuerySnapshot.docs[0];
                await userDoc.ref.update({
                    songs: firestore.FieldValue.arrayUnion(newSongRef.id)
                });
            } else {
                console.error('User document not found');
                Alert.alert("Error", "Failed to update user's song list.");
            }

            // set the saved notes to null
            setSavedNotesState(null);

            modalizeRef.current?.close();

        } catch (error) {
            console.error('Error saving song:', error);
            Alert.alert("Error", "Failed to save the song. Please try again.");
        }
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }} >
            <View style={{ backgroundColor: "white", flexGrow: 1 }}>
                <View style={styles.fullscreen}>
                    <View style={styles.topbar}>
                        {/* <SearchBar /> */}
                        <SettingsIcon />
                    </View>

                    <Text style={[styles.yoursongs]}>Your Songs</Text>

                    <View style={{ height: "70%" }}>
                        <SongList handlePlaySound={handlePlaySound} />
                    </View>

                    <PlusButton onPlusButtonPress={handlePlusButtonPress} />

                </View>
                <NavBar />
                <Modalize
                    ref={modalizeRef}
                    modalStyle={{ borderRadius: 20, overflow: 'hidden' }}
                    adjustToContentHeight={true}
                >
                    <NewSong onSaveButtonPress={handleSaveButtonPress} onAddNotesButtonPress={handleAddNotesButtonPress} noteMessage={noteMessage} noteList={savedNotesState} />
                </Modalize>

            </View>
        </GestureHandlerRootView >
    );
}

export default Home;