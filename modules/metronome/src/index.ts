import { NativeEventEmitter, NativeModules } from 'react-native';

const RNMetronome = NativeModules.RNMetronome;

export interface MetronomeInterface {
  start(bpm: number): void;
  stop(): void;
}

export const metronomeEmitter = new NativeEventEmitter(RNMetronome);

export default RNMetronome as MetronomeInterface;