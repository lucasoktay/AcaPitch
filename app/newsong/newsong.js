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

    const titleInputRef = useRef(null);
    const artistInputRef = useRef(null);
    const tempoInputRef = useRef(null);

    useEffect(() => {
        titleInputRef.current.focus();
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

        >
            <View style={styles.addsonginputs}>

                <InputField
                    name={'Title (required)'}
                    ref={titleInputRef}
                    onChangeText={(text) => setTitle(text)}
                    fontSize={24}
                    artistInputRef={artistInputRef}
                    titleInputRef={titleInputRef}
                    tempoInputRef={tempoInputRef}
                />
                <InputField
                    name={'Artist'}
                    ref={artistInputRef}
                    onChangeText={(text) => setArtist(text)}
                    fontSize={16}
                    titleInputRef={titleInputRef}
                    artistInputRef={artistInputRef}
                    tempoInputRef={tempoInputRef}
                />
                <InputField
                    name={'Tempo'}
                    ref={tempoInputRef}
                    onChangeText={(text) => setTempo(text)}
                    fontSize={16}
                    titleInputRef={titleInputRef}
                    artistInputRef={artistInputRef}
                    tempoInputRef={tempoInputRef}
                />


                <View style={styles.newsongline} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%", height: 60, alignItems: 'center', marginBottom: -20 }}>
                    <AddNotesButton noteMessage={noteMessage} onAddNotesButtonPress={onAddNotesButtonPress} noteList={noteList} />
                    <SaveSongButton onSaveButtonPress={handleSaveButtonPress} areNotes={areNotes} isTitle={isTitle} />
                </View>

            </View>

        </KeyboardAvoidingView>
    );
}

export default NewSong;