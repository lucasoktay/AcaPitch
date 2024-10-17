import { Audio } from 'expo-av';

export default async function PlaySound(note, setSound, loadedSounds) {

    const sound = loadedSounds[note];
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
        await sound.setVolumeAsync(1.0); // Set volume to maximum (1.0)
        await sound.replayAsync();
        const status = await sound.getStatusAsync();

        return sound;
    } catch (error) {
        console.error('Error playing sound:', error);
    }
}

export async function stopSound(sound) {
    if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
    }
}