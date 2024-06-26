import Sound from 'react-native-sound';

const PlayLocalSoundFile = (note) => {
    Sound.setCategory('Playback', true);

    const nextLetter = { 'A': 'B', 'B': 'C', 'C': 'D', 'D': 'E', 'E': 'F', 'F': 'G', 'G': 'A' };

    const checkSharp = (note) => {
        if (note.length === 3 && note[1] === '#') {
            note = nextLetter[note[0]] + 'b' + note[2];
        }
        return note;
    }

    let fileName = checkSharp(note) + '.mp3';
    fileName = fileName.trim()

    var mySound = new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('Error loading sound: ' + error);
            return;
        } else {
            mySound.play((success) => {
                if (success) {
                    // console.log('Sound playing')
                } else {
                    console.log('Issue playing file');
                }
            })
        }
    });
    mySound.setVolume(0.9);
    mySound.release();
}

export default PlayLocalSoundFile;