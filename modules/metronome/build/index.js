"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metronomeEmitter = void 0;
const react_native_1 = require("react-native");
const { RNMetronome } = react_native_1.NativeModules;
exports.metronomeEmitter = new react_native_1.NativeEventEmitter(RNMetronome);
exports.default = RNMetronome;
