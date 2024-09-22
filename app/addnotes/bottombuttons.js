import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from "react-native";
import colors from '../colors';
import styles from '../styles';

const BottomButtons = ({ areNotesAdded, isKeyPressed, onAddButtonPress, onSaveButtonPress }) => {

    const navigation = useNavigation();
    const [addButtonText, setAddButtonText] = useState(colors.lightgrey);
    const [saveButtonText, setSaveButtonText] = useState(colors.lightgrey);

    useEffect(() => {
        setAddButtonText(isKeyPressed ? colors.orange : colors.grey);
    }, [isKeyPressed]);

    useEffect(() => {
        setSaveButtonText(areNotesAdded ? colors.orange : colors.grey);
    }, [areNotesAdded]);

    return (
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 760 }}>

            <Pressable
                onPress={onAddButtonPress}
                style={[styles.bottombutton, { width: '100%' }]}
            >
                <Text style={[styles.buttontext, { color: addButtonText }]}>
                    ADD NOTE
                </Text>
            </Pressable>

            <View style={styles.bottombuttons}>

                <Pressable
                    onPress={onSaveButtonPress}
                    style={[styles.bottombutton, { width: '60%' }]}>
                    <Text style={[styles.buttontext, { color: saveButtonText }]}>
                        SAVE
                    </Text>
                </Pressable>
                <Pressable
                    onPress={() => navigation.navigate('Home')}
                    style={[styles.bottombutton, { width: '38%' }]}>
                    <Text style={[styles.buttontextactive, { color: colors.lightred }]}>
                        CANCEL
                    </Text>
                </Pressable>

            </View>
        </View>
    )
}

export default BottomButtons