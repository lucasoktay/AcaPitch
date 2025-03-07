import { NativeEventEmitter } from 'react-native';
export interface MetronomeInterface {
    start(bpm: number): void;
    stop(): void;
}
export declare const metronomeEmitter: NativeEventEmitter;
declare const _default: MetronomeInterface;
export default _default;
