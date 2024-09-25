import React, { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import styles from '../styles.js';
import AddNotesButton from './addnotesbutton.js';
import InputField from './inputfield.js';
import SaveSongButton from './savesongbutton.js';

const NewSong = ({ onSaveButtonPress, onAddNotesButtonPress, noteMessage, noteList }) => {
    const [areNotes, setAreNotes] = useState(false);
    const [isTitle, setIsTitle] = useState(false);
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [tempo, setTempo] = useState('');
    const firstInputRef = useRef(null);

    useEffect(() => {
        firstInputRef.current.focus();
    }, []);

    useEffect(() => {
        if (noteList && Array.isArray(noteList) && noteList.length > 0) {
            setAreNotes(true);
        } else {
            setAreNotes(false);
        }
    }, [noteList]);

    useEffect(() => {
        if (title) {
            setIsTitle(true);
        } else {
            setIsTitle(false);
        }
    }, [title]);

    handleSaveButtonPress = () => {
        onSaveButtonPress({ title, artist, tempo });
    }

    return (

        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardShouldPersistTaps="always"
        >
            <View style={styles.addsonginputs} keyboardShouldPersistTaps="always">
                <InputField
                    name={'Title'}
                    ref={firstInputRef}
                    onChangeText={(text) => setTitle(text)}
                    fontSize={24}
                />
                <InputField
                    name={'Artist'}
                    onChangeText={(text) => setArtist(text)}
                    fontSize={16}
                />
                <InputField
                    name={'Tempo'}
                    onChangeText={(text) => setTempo(text)}
                    fontSize={16}
                />

                <View style={styles.newsongline} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%", height: 60, alignItems: 'center', marginBottom: -20 }} keyboardShouldPersistTaps="always">
                    <AddNotesButton noteMessage={noteMessage} onAddNotesButtonPress={onAddNotesButtonPress} noteList={noteList} keyboardShouldPersistTaps="always" />
                    <SaveSongButton onSaveButtonPress={handleSaveButtonPress} areNotes={areNotes} isTitle={isTitle} keyboardShouldPersistTaps="always" />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

export default NewSong;