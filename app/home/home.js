import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
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

SplashScreen.preventAutoHideAsync();

const Home = () => {
    const [appIsReady, setAppIsReady] = useState(false);
    const [noteMessage, setNoteMessage] = useState("EDIT NOTES");
    const [sound, setSound] = useState();

    const songsCollection = firestore().collection('songs');
    const modalizeRef = useRef(null);
    const route = useRoute();
    const { savedNotes } = route.params || {};

    useEffect(() => {
        async function prepare() {
            try {
                await Font.loadAsync({
                    'MontserratRegular': require('../../assets/fonts/MontserratRegular.ttf'),
                    'MontserratSemiBold': require('../../assets/fonts/MontserratSemiBold.ttf'),
                    'MontserratMedium': require('../../assets/fonts/MontserratMedium.ttf'),
                    'RubikRegular': require('../../assets/fonts/RubikRegular.ttf'),
                });
                // Artificially delay for two seconds to simulate a slow loading
                // experience. Please remove this if you copy and paste the code!
                // await new Promise(resolve => setTimeout(resolve, 2));
            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    useEffect(() => {
        if (savedNotes) {
            setNoteMessage("Notes");
        }
    }, [savedNotes]);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

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
                    // modalHeight={560}
                    modalStyle={{ borderRadius: 20, overflow: 'hidden' }}
                    keyboardAvoidingBehavior="padding"
                    keyboardShouldPersistTaps="always"
                    adjustToContentHeight={true}
                >
                    <NewSong onSaveButtonPress={handleSaveButtonPress} noteMessage={noteMessage} />
                </Modalize>
            </View>
        </GestureHandlerRootView>
    );
}

export default Home;
