import { Audio } from 'expo-av';

export default async function PlaySound(note, setSound, soundFiles) {
    const nextLetter = { 'A': 'B', 'B': 'C', 'C': 'D', 'D': 'E', 'E': 'F', 'F': 'G', 'G': 'A' };

    const checkSharp = (note) => {
        if (note.length === 3 && note[1] === '#') {
            note = nextLetter[note[0]] + 'b' + note[2];
        }
        return note;
    }

    const soundFile = soundFiles[checkSharp(note)]

    if (!soundFile) {
        console.error(`Sound file for note ${note} not found.`);
        return;
    }

    try {
        await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
            staysActiveInBackground: true,
            shouldDuckAndroid: true,
        });

        const { sound } = await Audio.Sound.createAsync(
            soundFile,
            { shouldPlay: false, volume: 1.0 }
        );
        setSound(sound);

        console.log('Playing Sound:', note);
        await sound.playAsync();

        return sound;
    } catch (error) {
        console.error('Error playing sound:', error);
    }
}

export async function stopSound(sound) {
    if (sound) {
        console.log('Stopping Sound');
        await sound.stopAsync();
        await sound.unloadAsync();
    }
}


function getSoundFile(note) {
    return;
}
