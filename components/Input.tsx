import { useState } from 'react';
import { TextInput, View } from 'react-native';

const Input:React.FC = () => {
    const [text, setText] = useState('');

    return(
        <View>
            <TextInput placeholder='Enter Text' style={{height:40}} value={text} onChangeText={text => setText(text)}/>
        </View>
    )
}

export default Input;