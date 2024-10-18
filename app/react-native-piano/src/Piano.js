import range from 'just-range';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Key from './Key';
import MidiNumbers from './MidiNumbers';

class Piano extends Component {
  state = {
    noteRange: {
      first: MidiNumbers.fromNote('c4'),
      last: MidiNumbers.fromNote('e5'),
    },
    activeKey: null,
  };

  static propTypes = {
    onPlayNoteInput: PropTypes.func.isRequired,
    onStopNoteInput: PropTypes.func.isRequired,
    noteRange: PropTypes.shape({
      first: PropTypes.string.isRequired,
      last: PropTypes.string.isRequired,
    }).isRequired,
    addedNotes: PropTypes.array,
  };

  componentDidMount() {
    const { noteRange } = this.props;

    this.setState({
      noteRange: {
        first: MidiNumbers.fromNote(noteRange.first),
        last: MidiNumbers.fromNote(noteRange.last),
      },
    });
  }

  setActiveKey = (midiNumber) => {
    this.setState({ activeKey: midiNumber });
    // if no other key is pressed for 0.5 seconds, set activeKey to null
    // setTimeout(() => {
    //   if (this.state.activeKey === midiNumber) {
    //     this.setState({ activeKey: null });
    //   }
    // }, 800);
  };

  getNaturalKeyCount() {
    return this.getMidiNumbers().filter((number) => {
      const { isAccidental } = MidiNumbers.getAttributes(number);
      return !isAccidental;
    }).length;
  }

  getNaturalKeys() {
    return this.getMidiNumbers().filter((number) => {
      const { isAccidental } = MidiNumbers.getAttributes(number);
      return !isAccidental;
    });
  }

  getAccidentalKeys() {
    return this.getMidiNumbers().filter((number) => {
      const { isAccidental } = MidiNumbers.getAttributes(number);
      return isAccidental;
    });
  }

  getMidiNumbers() {
    return range(this.state.noteRange.first, this.state.noteRange.last + 1);
  }

  getNaturalKeyWidth() {
    return 1 / this.getNaturalKeyCount();
  }

  render() {
    const naturalKeyWidth = this.getNaturalKeyWidth();
    const { activeKey } = this.state;

    return (
      <View style={styles.container}>
        {this.getMidiNumbers().map((midiNumber) => {
          const { isAccidental } = MidiNumbers.getAttributes(midiNumber);
          return (
            <Key
              key={midiNumber}
              naturalKeyWidth={naturalKeyWidth}
              midiNumber={midiNumber}
              noteRange={this.state.noteRange}
              accidental={isAccidental}
              onPlayNoteInput={this.props.onPlayNoteInput}
              onStopNoteInput={this.props.onStopNoteInput}
              useTouchEvents={true}
              isActive={activeKey === midiNumber}
              setActiveKey={this.setActiveKey}
              addedNotes={this.props.addedNotes}
            >
              <Text style={{ marginTop: 165, marginRight: 18 }}>{MidiNumbers.midiToNoteName(midiNumber)}</Text>
            </Key>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: 400,
  },
});

export default Piano;