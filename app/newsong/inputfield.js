import React from 'react';
import { TextInput } from 'react-native';
import styles from '../styles';




const InputField = React.forwardRef(({ name, onChangeText, fontSize, titleInputRef, artistInputRef, tempoInputRef }, ref) => {

    const nextField = () => {
        // if current field is title
        if (titleInputRef.current.isFocused()) {
            artistInputRef.current.focus();
        } else if (artistInputRef.current.isFocused()) {
            tempoInputRef.current.focus();
        }
    }

    return (
        <TextInput
            ref={ref}
            style={[styles.inputfield, { fontSize: fontSize }]}
            placeholder={name}
            placeholderTextColor={'darkgray'}
            onChangeText={(text) => onChangeText(text)}
            returnKeyType="next"
            onSubmitEditing={() => nextField()}
            blurOnSubmit={false}
        />
    );
});

export default InputField;