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
        <View style={{
            backgroundColor: '#F9F5F1'
        }}>
            <View style={styles.addsonginputs}>
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

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%", height: 60, alignItems: 'center', marginBottom: -20 }}>
                    <AddNotesButton noteMessage={noteMessage} />
                    <SaveSongButton onSaveButtonPress={handleSaveButtonPress} />
                </View>
            </View>
        </View >
    );
}

export default NewSong;