import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import NavBar from '../navbar/navbar.js';
import NewSong from '../newsong/newsong.js';
import PlaySound from '../piano/newmakesound.js';
import styles from '../styles.js';
import PlusButton from './plusbutton.js';
import SearchBar from './searchbar.js';
import SettingsIcon from './settingsicon.js';
import SongList from './songlist.js';

const Home = () => {
    const [noteMessage, setNoteMessage] = useState("Notes");
    const [sound, setSound] = useState();

    const songsCollection = firestore().collection('songs');
    const modalizeRef = useRef(null);
    const route = useRoute();
    const { savedNotes } = route.params || {};

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

    const handleSaveButtonPress = ({ title, artist, tempo }) => {
        if (!savedNotes || !title) {
            if (title) {
                Alert.alert("Add some notes first!")
            } else if (savedNotes) {
                Alert.alert("Please enter a title.")
            } else {
                Alert.alert("Please enter a title and add notes, or swipe down to cancel.")
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

    return (
        <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <View style={{ backgroundColor: '#F9F5F1', flexGrow: 1 }}>
                <View style={styles.fullscreen}>
                    <View style={styles.topbar}>
                        <SearchBar />
                        <SettingsIcon />
                    </View>

                    <Text style={[styles.yoursongs]}>Your Songs</Text>
                    <View style={styles.topline} />

                    <SongList />

                    <View style={styles.bottomline} />
                    <PlusButton onPlusButtonPress={handlePlusButtonPress} />

                </View>
                <NavBar />
                <Modalize
                    ref={modalizeRef}
                    modalStyle={{ borderRadius: 20, overflow: 'hidden' }}
                    adjustToContentHeight={true}
                >
                    <NewSong onSaveButtonPress={handleSaveButtonPress} noteMessage={noteMessage} noteList={savedNotes} />
                </Modalize>
            </View>
        </GestureHandlerRootView>
    );
}

export default Home;
