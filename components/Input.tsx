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

    //Function to handle confirm button press
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

    //Function to handle text input change
    const OnInputChange = (newText:string) => {
        if(!hasTyped){
        setHasTyped(true);
        }
        setText(newText)
    }

    return(
        <Modal animationType='slide' visible={isVisable} transparent={true}>
            <View style={styles.container}>
                <View style={styles.modal}>
            <TextInput 
                placeholder='Enter Text' 
                style={styles.textInput} 
                value={text}
                autoFocus={focusOnRender}
                onFocus={()=>setIsFocused(true)}
                onBlur={()=>{OnInputBlur()}}
                onChangeText={text => OnInputChange(text)}/>

                {
                //If the user has typed and isFocused show text length (char count)
                hasTyped&&isFocused?
                <Text style={styles.text}>
                {text.length}
                </Text>:null
                }
               {hasBlurred?
                <Text>     
                {message}
                </Text>:null
                }
                <View style={styles.button}>
                <Button title="Confirm" onPress={handleConfirm}/>
                </View>
                </View>
                </View>
            </Modal>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{width:'30%',margin:10},
  textInput:{fontSize:20,color:'orange', margin:10, height:40,
    borderWidth: 1, borderRadius: 8, width: '80%', textAlign: 'center'},
  text:{fontSize:16,color:'orange', margin:2},
  modal:{backgroundColor:'#e0e0e0', width:'80%', padding:10, borderRadius:10, alignItems:'center'}
});

export default Input;