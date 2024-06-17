import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import NavBar from '../navbar/navbar.js';
import NewSong from '../newsong/newsong.js';
import styles from '../styles.js';
import PlusButton from './plusbutton.js';
import SearchBar from './searchbar.js';
import SettingsIcon from './settingsicon.js';
import SongList from './songlist.js';


const Home = () => {
    const songsCollection = firestore().collection('songs');

    const modalizeRef = useRef(null);

    const [noteMessage, setNoteMessage] = useState("EDIT NOTES");

    const route = useRoute();
    const { savedNotes } = route.params || {};

    useEffect(() => {
        if (savedNotes) {
            setNoteMessage("EDIT NOTES");
        }
    }, [savedNotes]);

    const handlePlusButtonPress = () => {
        setNoteMessage("ADD NOTES");
        modalizeRef.current?.open();
    }

    const handleSaveButtonPress = ({ title, artist, tempo }) => {
        if (!savedNotes || !title) {
            if (title) {
                alert("Add some notes first!")
            } else if (savedNotes) {
                alert("Please enter a title.")
            } else {
                alert("Please enter a title and add notes, or swipe down to cancel.")
            }
        } else {
            songsCollection.add({
                title: title,
                artist: artist,
                tempo: tempo,
                notes: savedNotes
            })

            modalizeRef.current?.close();
        }

    }

    const [numSongs, setNumSongs] = useState(0);

    const SongSubList = () => {

        if (numSongs < 7) {
            return (
                <ScrollView style={styles.lesssongslist}>
                    <SongList numSongs={numSongs} setNum={setNumSongs} />
                    <PlusButton onPlusButtonPress={handlePlusButtonPress} />
                </ScrollView>
            )
        } else {
            return (
                <View>
                    <SongList numSongs={numSongs} setNum={setNumSongs} />
                    <View style={styles.bottomline}></View>
                    <PlusButton onPlusButtonPress={handlePlusButtonPress} />
                </View>
            )
        }
    }


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ backgroundColor: '#FFFBF6', flexGrow: 1 }}>
                <View style={styles.fullscreen}>
                    <View style={styles.topbar}>
                        <SearchBar />
                        <SettingsIcon />
                    </View>
                    <Text style={styles.yoursongs}>Your Songs</Text>
                    <View style={styles.bottomline} />
                    <SongSubList />
                </View>
                <NavBar />
                <Modalize ref={modalizeRef} modalHeight={650}>
                    <NewSong onSaveButtonPress={handleSaveButtonPress} noteMessage={noteMessage} />
                </Modalize>
            </View>
        </GestureHandlerRootView>
    );
}

export default Home;