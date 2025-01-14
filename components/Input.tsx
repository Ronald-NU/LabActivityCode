import { useEffect, useRef, useState } from 'react';
import { TextInput, View, Text } from 'react-native';

interface InputProps {
    focusOnRender: boolean;
}
const Input = ({focusOnRender}: InputProps) => {
    const [text, setText] = useState<string>('');
    const [isFocused, setIsFocused] = useState<boolean>(focusOnRender);

    return(
        <View>
            <TextInput 
                placeholder='Enter Text' 
                style={{height:40}} 
                value={text}
                autoFocus={focusOnRender} // Ensure this is applied
                onFocus={()=>setIsFocused(true)}
                onBlur={()=>setIsFocused(false)}
                onChangeText={text => setText(text)}/>
            </View>
    )
}

export default Input;