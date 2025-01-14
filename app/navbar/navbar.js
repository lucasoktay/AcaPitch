import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { View } from "react-native";
import colors from '../colors.js';
import styles from '../styles.js';
import HomeIcon from "./homeicon";
import MetronomeIcon from './metronomeicon';
import PianoIcon from "./pianoicon";

const NavBar = () => {
    const navigation = useNavigation();
    const [currentRoute, setCurrentRoute] = useState(navigation.getState().routes[navigation.getState().index].name);

    useFocusEffect(
        useCallback(() => {
            const state = navigation.getState();
            const routeName = state.routes[state.index].name;
            setCurrentRoute(routeName);
            // console.log(routeName);
        }, [navigation])
    );

    const pianoColor = currentRoute === 'Piano' ? colors.lightred : colors.darkgrey;
    const homeColor = currentRoute === 'Home' ? colors.lightred : colors.darkgrey;
    const metronomeActive = currentRoute === 'Metronome' ? true : false;

    return (
        <View style={styles.navbar}>
            <HomeIcon homeColor={homeColor} />
            <PianoIcon pianoColor={pianoColor} />
            <MetronomeIcon metronomeActive={metronomeActive} />
        </View>
    )
}

export default React.memo(NavBar);