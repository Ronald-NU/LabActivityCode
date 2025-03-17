import React from 'react';
import { useState } from 'react';
import { TextInput, Modal, Text, Button, StyleSheet, View, Alert, Image } from 'react-native';
import ImageManager from './ImageManager';

interface InputProps {
    focusOnRender: boolean;
    handleInputData: (data: {text:string, imageURI:string}) => void;
    handleCancelInput: () => void;
    isVisable: boolean;
}

const Input = ({focusOnRender, handleCancelInput, handleInputData, isVisable}: InputProps) => {
    const [text, setText] = useState<string>('');
    const [isFocused, setIsFocused] = useState<boolean>(focusOnRender);
    const [hasBlurred, setHasBlurred] = useState<boolean>(false);
    const [hasTyped, setHasTyped] = useState<boolean>(false);
    const [message,setMessage] = useState<string>('');
    const [valid, setValid] = useState<boolean>(false);
    const [image, setImage] = useState<string>("");

    //Function to handle confirm button press
    const handleConfirm = () => {
        handleInputData({text: text, imageURI:image})
        OnInputBlur();
        setText('')
        setImage('');
    }

    //Function to handle cancel button press
    const handleCancel = () => {
        Alert.alert('Discard Input','Are you sure you want to cancel?',[
            { text: 'Ok', onPress: () => {
                handleCancelInput()
                setText('')
                OnInputBlur();
            } },
            { text: 'Cancel', onPress: () => {} }
        ])
    }

    //Function to handle onBlur event
    const OnInputBlur = () => {
        setIsFocused(false);
        setHasTyped(false);
        setHasBlurred(true);
        checkValidity(text);
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
        checkValidity(newText);
        setText(newText)
    }

    //Function to check validity of the text input
    const checkValidity = (text:string) => {
        setValid(!(text.length<3));
    }

    const retrievedImage = (imageUri: string) => {
        setImage(imageUri);
    }

    return(
        <Modal animationType='slide' visible={isVisable} transparent={true}>
            <View style={styles.container}>
                <View style={styles.modal}>
                    <Image source={{ uri:'https://cdn-icons-png.flaticon.com/512/2617/2617812.png'}} 
                    style={styles.image} alt='Target Image with arrow bullseye'/>
                    <Image source={require('../target.png')}
                    style={styles.image} alt='Target Image with arrow bullseye'/>
            
            <ImageManager retrievedImage={retrievedImage}/>
            
            <TextInput 
                placeholder='Enter Text' 
                style={styles.textInput} 
                value={text}
                autoFocus={focusOnRender}
                onFocus={()=>setIsFocused(true)}
                onBlur={()=>{OnInputBlur()}}
                onChangeText={text => OnInputChange(text)}/>

                {
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
                <View style={styles.buttonContainer}>
                <View style={styles.button}>
                        <Button title="Cancel" onPress={handleCancel}/>
                </View>
                <View style={styles.button}>
                    <Button disabled={!valid} title="Confirm" onPress={handleConfirm}/>
                </View>
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
  image:{width:100, height:100},
  textInput:{fontSize:20,color:'orange', margin:10, height:40,
    borderWidth: 1, borderRadius: 8, width: '80%', textAlign: 'center'},
    buttonContainer:{flexDirection:'row', justifyContent:'space-between'},
  text:{fontSize:16,color:'orange', margin:2},
  modal:{backgroundColor:'#e0e0e0', width:'80%', padding:10, borderRadius:10, alignItems:'center'}
});

export default Input;