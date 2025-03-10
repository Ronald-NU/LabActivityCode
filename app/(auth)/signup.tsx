import { Text, StyleSheet, View, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router';

export default function signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');

    return (
    <View style={styles.container}>
        <Text style={styles.text}>Email Address</Text>
        <TextInput 
        placeholder='Email Address' 
        style={styles.textInput} 
        value={email}
        onChangeText={text => {setEmail(text)}}/>
        <Text style={styles.text}>Password</Text>
        <TextInput 
        placeholder='Password' 
        style={styles.textInput}
        secureTextEntry={true}
        value={password}
        onChangeText={text => {setPassword(text)}}/>
         <Text style={styles.text}>Confirm Password</Text>
         <TextInput 
        placeholder='Password' 
        style={styles.textInput}
        secureTextEntry={true}
        value={confirmpassword}
        onChangeText={text => {setConfirmPassword(text)}}/>
        <Button title="Register" onPress={()=>{}}/>
        <Button title="Already Registered? Login" onPress={() => router.replace('./login')}/>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textInput:{fontSize:20,color:'orange', margin:10, height:40,
      borderWidth: 1, borderRadius: 8, width: '80%', textAlign: 'center'},
      buttonContainer:{flexDirection:'row', justifyContent:'space-between'},
    text:{fontSize:16,color:'orange', margin:2},
});