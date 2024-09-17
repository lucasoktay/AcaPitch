import { Audio } from 'expo-av';

export default async function PlaySound(note, setSound) {
    console.log('Loading Sound:', note);

    // Dynamically require the sound file based on the note passed as a string
    const soundFile = getSoundFile('A4');

    if (!soundFile) {
        console.error(`Sound file for note ${note} not found.`);
        return;
    }

    const { sound } = await Audio.Sound.createAsync(soundFile);
    setSound(sound);

    console.log('Playing Sound:', note);
    await sound.playAsync();

    return sound;
}

// Helper function to map note to the corresponding sound file
function getSoundFile(note) {
    // Use explicit strings as keys in the soundFiles dictionary
    const soundFiles = {
        'A4': require('../../assets/sounds/A4.mp3'),
        'B4': require('../../assets/sounds/B4.mp3'),
        'C4': require('../../assets/sounds/C4.mp3'),
        'D4': require('../../assets/sounds/D4.mp3'),
        // Add more notes as needed
    };

    return soundFiles[note]; // Return the correct sound file, or undefined if not found
}
