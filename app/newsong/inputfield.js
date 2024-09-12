import React from 'react';
import { TextInput } from 'react-native';
import styles from '../styles';

const InputField = React.forwardRef(({ name, onChangeText }, ref) => {
    return (
        <TextInput
            ref={ref}
            style={styles.inputfield}
            placeholder={name}
            placeholderTextColor={'darkgray'}
            onChangeText={(text) => onChangeText(text)}
        />
    );
});

export default InputField;