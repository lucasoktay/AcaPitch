import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import React, { useRef } from 'react';
import { Text, View } from 'react-native';
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

    const route = useRoute();
    const { savedNotes } = route.params || {};
    let noteMessage = "ADD NOTES"

    if (savedNotes) {
        noteMessage = "EDIT NOTES"
    }

    const handlePlusButtonPress = () => {
        modalizeRef.current?.open();
    }

    const handleSaveButtonPress = ({ title, artist, tempo }) => {
        if (!savedNotes) {
            // tell user to add notes
        } else {
            songsCollection.add({
                title: title,
                artist: artist,
                tempo: tempo,
                notes: savedNotes
            })
        }
        modalizeRef.current?.close();
    }

    return (
        <View style={{ backgroundColor: '#FFFBF6', flexGrow: 1 }}>
            <View style={styles.fullscreen}>
                <View style={styles.topbar}>
                    <SearchBar />
                    <SettingsIcon />
                </View>
                <Text style={styles.yoursongs}>Your Songs</Text>
                <SongList />
                <View style={styles.bottomline}></View>
                <PlusButton onPlusButtonPress={handlePlusButtonPress} />
            </View>
            <NavBar />
            <Modalize ref={modalizeRef} modalHeight={650}>
                <NewSong onSaveButtonPress={handleSaveButtonPress} noteMessage={noteMessage} />
            </Modalize>
        </View>
    );
}

export default Home;