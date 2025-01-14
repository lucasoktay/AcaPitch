import { Text, TouchableOpacity, View } from 'react-native';
import NavBar from '../navbar/navbar.js';
import useMetronome from './usemetronome';

const MetronomeComponent = () => {
    const { isPlaying, start, stop } = useMetronome(120); // 120 BPM

    return (
        <View style={{ height: "100%", justifyContent: "center", alignItems: "center" }}>
            <NavBar />
            <Text>Metronome</Text>
            <TouchableOpacity
                style={{ height: 50, width: 50, backgroundColor: "blue" }}
                onPress={() => isPlaying ? stop() : start()}
                title={isPlaying ? "Stop" : "Start"}
            />
        </View>
    );
};

export default MetronomeComponent;