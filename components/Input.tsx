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
    const [hasTyped, setHasTyped] = useState<boolean>(false);
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

    const OnInputChange = (newText:string) => {
        if(!hasTyped){
        setHasTyped(true);
        }
        setText(newText)
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
                onChangeText={text => OnInputChange(text)}/>

                {
                //If input is focused and text length > 0 show text length(char count)
                hasTyped&&isFocused?
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