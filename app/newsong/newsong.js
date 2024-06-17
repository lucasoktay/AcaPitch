import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import styles from '../styles.js';
import AddNotesButton from './addnotesbutton.js';
import InputField from './inputfield.js';
import SaveSongButton from './savesongbutton.js';

const NewSong = ({ onSaveButtonPress, noteMessage }) => {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [tempo, setTempo] = useState('');
    const firstInputRef = useRef(null);

    useEffect(() => {
        firstInputRef.current.focus();
    }, []);

    handleSaveButtonPress = () => {
        onSaveButtonPress({ title, artist, tempo });
    }

    return (
        <View style={{ backgroundColor: '#B79992', height: 400 }}>
            <View style={styles.addsonginputs}>
                <InputField name={'Title (required)'} ref={firstInputRef} onChangeText={(text) => setTitle(text)} />
                <InputField name={'Artist'} onChangeText={(text) => setArtist(text)} />
                <InputField name={'Tempo'} onChangeText={(text) => setTempo(text)} />
                <AddNotesButton noteMessage={noteMessage} />
                <SaveSongButton onSaveButtonPress={handleSaveButtonPress} />
            </View>
        </View>
    );
}

export default NewSong;