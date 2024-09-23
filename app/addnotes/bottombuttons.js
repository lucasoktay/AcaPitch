import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from "react-native";
import colors from '../colors';
import styles from '../styles';

const BottomButtons = ({ areNotesAdded, onSaveButtonPress, onClearButtonPress }) => {

    const navigation = useNavigation();
    const [saveButtonText, setSaveButtonText] = useState(colors.lightgrey);

    useEffect(() => {
        setSaveButtonText(areNotesAdded ? colors.orange : colors.grey);
    }, [areNotesAdded]);

    return (
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 760 }}>

            <Pressable
                onPress={onClearButtonPress}
                style={[styles.bottombutton, { width: '100%' }]}>
                <Text style={[styles.buttontext, { color: colors.orange }]}>
                    CLEAR
                </Text>
            </Pressable>

            <View style={styles.bottombuttons}>
                <Pressable
                    onPress={onSaveButtonPress}
                    style={[styles.bottombutton, { width: '49%' }]}>
                    <Text style={[styles.buttontext, { color: saveButtonText }]}>
                        SAVE
                    </Text>
                </Pressable>
                <Pressable
                    onPress={() => navigation.navigate('Home')}
                    style={[styles.bottombutton, { width: '49%' }]}>
                    <Text style={[styles.buttontextactive, { color: colors.lightred }]}>
                        CANCEL
                    </Text>
                </Pressable>

            </View>
        </View>
    )
}

export default BottomButtons