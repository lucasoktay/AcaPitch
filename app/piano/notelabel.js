// NoteLabel.js
import React from 'react';
import { StyleSheet, Text } from 'react-native';

const NoteLabel = ({ midiNumber }) => {
    const noteName = 'ya'

    midiNumber

    return <Text style={styles.noteLabel}>{noteName}</Text>;
};

const styles = StyleSheet.create({
    noteLabel: {
        color: 'black',
        fontSize: 12,
        textAlign: 'center',
    },
});

export default NoteLabel;