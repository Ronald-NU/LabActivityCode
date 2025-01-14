import React from 'react';
import { useState } from 'react';
import { TextInput, View, Text } from 'react-native';

interface InputProps {
    focusOnRender: boolean;
}

const Input = ({focusOnRender}: InputProps) => {
    const [text, setText] = useState<string>('');
    const [isFocused, setIsFocused] = useState<boolean>(focusOnRender);
    const [hasBlurred, setHasBlurred] = useState<boolean>(false);
    const [message,setMessage] = useState<string>('');

    //Function to handle onBlur event
    const OnInputBlur = () => {
        setIsFocused(false);
        setHasBlurred(true);
        if(text.length<3){
            setMessage("Please type more than 3 characters");
        }else{
            setMessage("Thank You");
        }
    }

    return(
        <View>
            <TextInput 
                placeholder='Enter Text' 
                style={{height:40}} 
                value={text}
                autoFocus={focusOnRender}
                onFocus={()=>setIsFocused(true)}
                onBlur={()=>{OnInputBlur()}}
                onChangeText={text => setText(text)}/>
                {
                //If input is focused and length text has been typed show text length
                text.length>0&&isFocused?
                <Text>
                {text.length}
                </Text>:null
                }
               {hasBlurred?
                <Text>     
                {message}
                </Text>:null
                }
            </View>
    )
}

export default Input;