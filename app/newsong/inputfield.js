import React from 'react';
import { TextInput } from 'react-native';
import styles from '../styles';

const InputField = React.forwardRef(({ name, onChangeText, fontSize }, ref) => {
    return (
        <TextInput
            ref={ref}
            style={[styles.inputfield, { fontSize: fontSize }]}
            placeholder={name}
            placeholderTextColor={'darkgray'}
            onChangeText={(text) => onChangeText(text)}
        />
    );
});

export default InputField;