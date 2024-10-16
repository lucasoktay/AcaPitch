import React from 'react';
import { Image, Text, View } from 'react-native';
import styles from '../styles';

const LoadingScreen = () => {

    return (
        <View style={styles.loadingscreen}>
            <View style={styles.loadingcontainer}>
                <Image style={styles.loadingimage} source={require('../../assets/images/icon.png')} />
            </View>
            <Text style={styles.loadingwelcometext}>AcaPitch</Text>

        </View >
    );
}

export default LoadingScreen