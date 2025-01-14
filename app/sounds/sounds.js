import { Audio } from 'expo-av';

const soundFiles = {
    'C1': require('../../assets/sounds/C1.wav'),
    'C#1': require('../../assets/sounds/C-1.wav'),
    'D1': require('../../assets/sounds/D1.wav'),
    'D#1': require('../../assets/sounds/D-1.wav'),
    'E1': require('../../assets/sounds/E1.wav'),
    'F1': require('../../assets/sounds/F1.wav'),
    'F#1': require('../../assets/sounds/F-1.wav'),
    'G1': require('../../assets/sounds/G1.wav'),
    'G#1': require('../../assets/sounds/G-1.wav'),
    'A1': require('../../assets/sounds/A1.wav'),
    'A#1': require('../../assets/sounds/A-1.wav'),
    'B1': require('../../assets/sounds/B1.wav'),
    'C2': require('../../assets/sounds/C2.wav'),
    'C#2': require('../../assets/sounds/C-2.wav'),
    'D2': require('../../assets/sounds/D2.wav'),
    'D#2': require('../../assets/sounds/D-2.wav'),
    'E2': require('../../assets/sounds/E2.wav'),
    'F2': require('../../assets/sounds/F2.wav'),
    'F#2': require('../../assets/sounds/F-2.wav'),
    'G2': require('../../assets/sounds/G2.wav'),
    'G#2': require('../../assets/sounds/G-2.wav'),
    'A2': require('../../assets/sounds/A2.wav'),
    'A#2': require('../../assets/sounds/A-2.wav'),
    'B2': require('../../assets/sounds/B2.wav'),
    'C3': require('../../assets/sounds/C3.wav'),
    'C#3': require('../../assets/sounds/C-3.wav'),
    'D3': require('../../assets/sounds/D3.wav'),
    'D#3': require('../../assets/sounds/D-3.wav'),
    'E3': require('../../assets/sounds/E3.wav'),
    'F3': require('../../assets/sounds/F3.wav'),
    'F#3': require('../../assets/sounds/F-3.wav'),
    'G3': require('../../assets/sounds/G3.wav'),
    'G#3': require('../../assets/sounds/G-3.wav'),
    'A3': require('../../assets/sounds/A3.wav'),
    'A#3': require('../../assets/sounds/A-3.wav'),
    'B3': require('../../assets/sounds/B3.wav'),
    'C4': require('../../assets/sounds/C4.wav'),
    'C#4': require('../../assets/sounds/C-4.wav'),
    'D4': require('../../assets/sounds/D4.wav'),
    'D#4': require('../../assets/sounds/D-4.wav'),
    'E4': require('../../assets/sounds/E4.wav'),
    'F4': require('../../assets/sounds/F4.wav'),
    'F#4': require('../../assets/sounds/F-4.wav'),
    'G4': require('../../assets/sounds/G4.wav'),
    'G#4': require('../../assets/sounds/G-4.wav'),
    'A4': require('../../assets/sounds/A4.wav'),
    'A#4': require('../../assets/sounds/A-4.wav'),
    'B4': require('../../assets/sounds/B4.wav'),
    'C5': require('../../assets/sounds/C5.wav'),
    'C#5': require('../../assets/sounds/C-5.wav'),
    'D5': require('../../assets/sounds/D5.wav'),
    'D#5': require('../../assets/sounds/D-5.wav'),
    'E5': require('../../assets/sounds/E5.wav'),
    'F5': require('../../assets/sounds/F5.wav'),
    'F#5': require('../../assets/sounds/F-5.wav'),
    'G5': require('../../assets/sounds/G5.wav'),
    'G#5': require('../../assets/sounds/G-5.wav'),
    'A5': require('../../assets/sounds/A5.wav'),
    'A#5': require('../../assets/sounds/A-5.wav'),
    'B5': require('../../assets/sounds/B5.wav'),
    'C6': require('../../assets/sounds/C6.wav'),
    'C#6': require('../../assets/sounds/C-6.wav'),
    'D6': require('../../assets/sounds/D6.wav'),
    'D#6': require('../../assets/sounds/D-6.wav'),
    'E6': require('../../assets/sounds/E6.wav'),
    'F6': require('../../assets/sounds/F6.wav'),
    'F#6': require('../../assets/sounds/F-6.wav'),
    'G6': require('../../assets/sounds/G6.wav'),
    'G#6': require('../../assets/sounds/G-6.wav'),
    'A6': require('../../assets/sounds/A6.wav'),
    'A#6': require('../../assets/sounds/A-6.wav'),
    'B6': require('../../assets/sounds/B6.wav'),
    'C7': require('../../assets/sounds/C7.wav'),
    'tick': require('../../assets/sounds/tick.mp3'),
};

const loadedSounds = {};
const BATCH_SIZE = 10; // Number of sounds to load in each batch
const TIMEOUT_DURATION = 500; // half a second

async function loadSounds() {
    const soundEntries = Object.entries(soundFiles);

    for (let i = 0; i < soundEntries.length; i += BATCH_SIZE) {
        const batch = soundEntries.slice(i, i + BATCH_SIZE);
        let success = false;

        while (!success) {
            try {
                // console.log("new batch:");
                await Promise.race([
                    loadBatch(batch),
                    timeout(TIMEOUT_DURATION)
                ]);
                success = true;
            } catch (error) {
                console.error('Batch loading timed out, retrying...', error);
            }
        }
    }
}

async function loadBatch(batch) {
    const loadPromises = batch.map(async ([note, soundFile]) => {
        if (!loadedSounds[note]) {
            // console.log('loading note:', note);
            const { sound } = await Audio.Sound.createAsync(
                soundFile,
                { shouldPlay: false, volume: 1.0 }
            );
            // console.log('loaded note:', note);
            loadedSounds[note] = sound;
        }
    });

    await Promise.all(loadPromises);
}

function timeout(ms) {
    return new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout')), ms);
    });
}

export { loadedSounds, loadSounds };
