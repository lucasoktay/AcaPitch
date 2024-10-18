import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../../colors.js';
import MidiNumbers from './MidiNumbers';

class Key extends Component {
  static propTypes = {
    midiNumber: PropTypes.number.isRequired,
    naturalKeyWidth: PropTypes.number.isRequired,
    useTouchEvents: PropTypes.bool.isRequired,
    accidental: PropTypes.bool.isRequired,
    onPlayNoteInput: PropTypes.func.isRequired,
    onStopNoteInput: PropTypes.func.isRequired,
    accidentalWidthRatio: PropTypes.number.isRequired,
    pitchPositions: PropTypes.object.isRequired,
    children: PropTypes.node,
    isActive: PropTypes.bool.isRequired,
    setActiveKey: PropTypes.func.isRequired,
    addedNotes: PropTypes.array,
  };

  static defaultProps = {
    accidentalWidthRatio: 0.65,
    pitchPositions: {
      C: 0,
      Db: 0.55,
      D: 1,
      Eb: 1.8,
      E: 2,
      F: 3,
      Gb: 3.5,
      G: 4,
      Ab: 4.7,
      A: 5,
      Bb: 5.85,
      B: 6,
    },
  };

  onPlayNoteInput = () => {
    this.props.setActiveKey(this.props.midiNumber);
    this.props.onPlayNoteInput(MidiNumbers.midiToNoteName(this.props.midiNumber), this.props.midiNumber);
  };

  onStopNoteInput = () => {
    this.props.onStopNoteInput(MidiNumbers.midiToNoteName(this.props.midiNumber), this.props.midiNumber);
  };

  getAbsoluteKeyPosition(midiNumber) {
    const OCTAVE_WIDTH = 7;
    const { octave, pitchName } = MidiNumbers.getAttributes(midiNumber);
    const pitchPosition = this.props.pitchPositions[pitchName];
    const octavePosition = OCTAVE_WIDTH * octave;
    return pitchPosition + octavePosition;
  }

  getRelativeKeyPosition(midiNumber) {
    return (
      this.getAbsoluteKeyPosition(midiNumber) -
      this.getAbsoluteKeyPosition(this.props.noteRange.first)
    );
  }

  render() {
    const {
      naturalKeyWidth,
      accidentalWidthRatio,
      midiNumber,
      useTouchEvents,
      accidental,
      children,
      isActive,
      addedNotes,
    } = this.props;

    const noteName = MidiNumbers.midiToNoteName(midiNumber);
    const isAddedNote = addedNotes && addedNotes.includes(noteName);

    const keyStyle = [
      styles.ReactPiano__Key,
      accidental ? styles.ReactPiano__Key__accidental : styles.ReactPiano__Key__natural,
      {
        left: ratioToPercentage(this.getRelativeKeyPosition(midiNumber) * naturalKeyWidth),
        width: ratioToPercentage(
          accidental ? accidentalWidthRatio * naturalKeyWidth : naturalKeyWidth,
        ),
        backgroundColor: isAddedNote ? 'grey' : (accidental ? '#555' : '#f6f5f3'), // Apply grey background for added notes
      },
    ];

    return (
      <View
        style={keyStyle}
        onTouchStart={useTouchEvents ? this.onPlayNoteInput : null}
        onTouchCancel={useTouchEvents ? this.onStopNoteInput : null}
        onTouchEnd={useTouchEvents ? this.onStopNoteInput : null}
      >
        {isActive ? (
          <LinearGradient
            colors={[colors.orange, colors.lightred]}
            style={StyleSheet.absoluteFill}
          />
        ) : null}
        <View style={styles.ReactPiano__NoteLabelContainer}>{children}</View>
      </View>
    );
  }
}

function ratioToPercentage(ratio) {
  return `${ratio * 100}%`;
}

const styles = StyleSheet.create({
  ReactPiano__Key: {
    position: 'absolute',
    height: 200,
  },
  ReactPiano__Key__natural: {
    backgroundColor: '#f6f5f3',
    borderColor: '#888',
    borderWidth: 1,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  ReactPiano__Key__accidental: {
    height: 120,
    backgroundColor: '#555',
    borderColor: 'transparent',
    borderWidth: 1,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 1,
  },
  ReactPiano__NoteLabelContainer: {
    flex: 1,
    alignSelf: 'flex-end',
  },
});

export default Key;