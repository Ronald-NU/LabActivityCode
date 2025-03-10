import { Text, StyleSheet, View, TextInput, Button } from 'react-native'
import React from 'react'

export default function login(){
    return (
    <View>
        <Text>Email Address</Text>
        <TextInput 
        placeholder='Enter Text' 
        style={styles.textInput} 
        value={""}
        onChangeText={text => ()=>{}}/>
        <Text>Password</Text>
        <TextInput 
        placeholder='Enter Text' 
        style={styles.textInput}
        secureTextEntry={true}
        value={""}
        onChangeText={text => ()=>{}}/>
        <Button title="Log in" onPress={()=>{}}/>
        <Button title="New User? Create an account" onPress={()=>{}}/>
    </View>
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
      buttonContainer:{flexDirection:'row', justifyContent:'space-between'},
    text:{fontSize:16,color:'orange', margin:2},
});