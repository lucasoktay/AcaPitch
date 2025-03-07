import React, { useEffect } from 'react';
import { Button, View } from 'react-native';
import RNMetronome, { metronomeEmitter } from '../../modules/metronome';

const Metronome = () => {
    useEffect(() => {
        const subscription = metronomeEmitter.addListener('onTick', () => {
            console.log('Tick!');
        });
        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <View>
            <Button
                title="Start"
                onPress={() => RNMetronome.start(120)}
            />
            <Button
                title="Stop"
                onPress={() => RNMetronome.stop()}
            />
        </View>
    );
};

export default Metronome;
