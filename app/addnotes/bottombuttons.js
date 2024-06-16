import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from "react-native";
import styles from '../styles';

const BottomButtons = ({ areNotesAdded, isKeyPressed, onAddButtonPress, onSaveButtonPress }) => {

    const navigation = useNavigation();

    const [addButtonColor, setAddButtonColor] = useState('gray');
    const [saveButtonColor, setSaveButtonColor] = useState('gray');

    useEffect(() => {
        setAddButtonColor(isKeyPressed ? 'blue' : 'gray');
    }, [isKeyPressed]);

    useEffect(() => {
        setSaveButtonColor(areNotesAdded ? 'blue' : 'gray');
    }, [areNotesAdded]);

    return (
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 760 }}>

            <Pressable
                onPress={onAddButtonPress}
                style={[styles.bottombutton, { width: '100%', backgroundColor: addButtonColor }]}
            >
                <Text style={styles.buttontext}>
                    ADD NOTE
                </Text>
            </Pressable>

            <View style={styles.bottombuttons}>

                <Pressable
                    onPress={onSaveButtonPress}
                    style={[styles.bottombutton, { width: '60%', backgroundColor: saveButtonColor }]}>
                    <Text style={styles.buttontext}>
                        SAVE
                    </Text>
                </Pressable>
                <Pressable
                    onPress={() => navigation.navigate('Home')}
                    style={[styles.bottombutton, { width: '38%', backgroundColor: '#832E2E' }]}>
                    <Text style={styles.buttontextactive}>
                        CANCEL
                    </Text>
                </Pressable>

            </View>
        </View>
    )
}

export default BottomButtons