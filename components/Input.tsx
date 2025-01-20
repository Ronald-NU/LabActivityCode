import React from 'react';
import { useState } from 'react';
import { TextInput, Modal, Text, Button, StyleSheet, View } from 'react-native';

interface InputProps {
    focusOnRender: boolean;
    handleInputData: (data: string) => void;
    isVisable: boolean;
}

const Input = ({focusOnRender, handleInputData, isVisable}: InputProps) => {
    const [text, setText] = useState<string>('');
    const [isFocused, setIsFocused] = useState<boolean>(focusOnRender);
    const [hasBlurred, setHasBlurred] = useState<boolean>(false);
    const [hasTyped, setHasTyped] = useState<boolean>(false);
    const [message,setMessage] = useState<string>('');

    //
    const handleConfirm = () => {
        handleInputData(text)
        console.log(text)
    }

    //Function to handle onBlur event
    const OnInputBlur = () => {
        setIsFocused(false);
        setHasTyped(false);
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
        <Modal animationType='slide' visible={isVisable}>
            <View style={styles.container}>
            <TextInput 
                placeholder='Enter Text' 
                style={{height:40}} 
                value={text}
                autoFocus={focusOnRender}
                onFocus={()=>setIsFocused(true)}
                onBlur={()=>{OnInputBlur()}}
                onChangeText={text => OnInputChange(text)}/>

                {
                //If the user has typed and isFocused show text length (char count)
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
                <Button title="Confirm" onPress={handleConfirm}/>
                </View>
            </Modal>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Input;