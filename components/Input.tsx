import { useState } from 'react';
import { TextInput, View } from 'react-native';

const Input = () => {
    const [text, setText] = useState<string>('');

    return(
        <View>
            <TextInput 
                placeholder='Enter Text' 
                style={{height:40}} 
                value={text} 
                onChangeText={text => setText(text)}/>
        </View>
    )
}

export default Input;