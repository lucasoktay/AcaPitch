import { Audio } from 'expo-av';

export default async function PlaySound(note, setSound, loadedSounds) {
    const nextLetter = { 'A': 'B', 'B': 'C', 'C': 'D', 'D': 'E', 'E': 'F', 'F': 'G', 'G': 'A' };

    const checkSharp = (note) => {
        if (note.length === 3 && note[1] === '#') {
            note = nextLetter[note[0]] + 'b' + note[2];
        }
        return note;
    }

    const sound = loadedSounds[checkSharp(note)];
    if (!sound) {
        console.error(`Sound for note ${note} not found.`);
        return;
    }

    try {
        await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
            staysActiveInBackground: true,
            shouldDuckAndroid: true,
        });

        setSound(sound);

        console.log('Playing Sound:', note);
        console.log('Sound object:', sound);
        await sound.replayAsync();
        const status = await sound.getStatusAsync();
        console.log('Sound status:', status);

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