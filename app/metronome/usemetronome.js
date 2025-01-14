import { Audio } from 'expo-av';
import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { loadedSounds } from '../sounds/sounds';

const useMetronome = (bpm = 120) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const soundRef = useRef(null);
    const nextTickTimeRef = useRef(0);
    const scheduledTicksRef = useRef([]);
    const lookAheadInterval = 25.0; // How frequently to schedule new ticks (ms)
    const scheduleAheadTime = 0.1; // How far ahead to schedule audio (seconds)
    const timeoutIdRef = useRef(null);

    // Load sound on component mount
    useEffect(() => {
        setupAudio();
        return () => cleanup();
    }, []);

    // Handle app state changes
    useEffect(() => {
        const subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => {
            subscription.remove();
        };
    }, []);

    const setupAudio = async () => {
        try {
            await Audio.setAudioModeAsync({
                playsInSilentModeIOS: true,
                staysActiveInBackground: true,
            });
            const sound = loadedSounds['tick'];
            soundRef.current = sound;
        } catch (error) {
            console.error("Failed to setup audio:", error);
        }
    };

    const handleAppStateChange = (nextAppState) => {
        if (nextAppState === 'active') {
            // Resync when app comes to foreground
            if (isPlaying) {
                stopMetronome();
                startMetronome();
            }
        } else if (nextAppState === 'background') {
            // Clean up when app goes to background
            cleanup();
        }
    };

    const scheduleBufferTicks = () => {
        const now = performance.now() / 1000; // Convert to seconds
        const msPerBeat = (60 / bpm);

        while (nextTickTimeRef.current < now + scheduleAheadTime) {
            scheduleTick(nextTickTimeRef.current);
            nextTickTimeRef.current += msPerBeat;
        }
    };

    const scheduleTick = async (time) => {
        try {
            if (soundRef.current) {
                const scheduledTime = time * 1000 - performance.now();
                const timeoutId = setTimeout(async () => {
                    await soundRef.current.replayAsync();
                }, scheduledTime);

                scheduledTicksRef.current.push(timeoutId);
            }
        } catch (error) {
            console.error("Error scheduling tick:", error);
        }
    };

    const scheduler = () => {
        scheduleBufferTicks();
        timeoutIdRef.current = setTimeout(scheduler, lookAheadInterval);
    };

    const startMetronome = () => {
        if (isPlaying) return;

        setIsPlaying(true);
        nextTickTimeRef.current = performance.now() / 1000;
        scheduler();
    };

    const stopMetronome = () => {
        setIsPlaying(false);
        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
        }
        // Clear all scheduled ticks
        scheduledTicksRef.current.forEach(timeoutId => clearTimeout(timeoutId));
        scheduledTicksRef.current = [];
    };

    const cleanup = () => {
        stopMetronome();
        if (soundRef.current) {
            soundRef.current.unloadAsync();
        }
    };

    return {
        isPlaying,
        start: startMetronome,
        stop: stopMetronome
    };
};

export default useMetronome;