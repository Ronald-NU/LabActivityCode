import { Text, StyleSheet, View, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/Firebase/firebaseSetup';

export default function signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');

    const createUser = async () => {
        if (password === confirmpassword) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                console.log(user);
                router.replace('./login');
            } catch (error) {
                Alert.alert('Could not Register', 
                    "Make sure to imput a valid email and password with "+ 
                    "at least 8 characters and 1 captial letter!");
            }
        }
        else {
            Alert.alert('Could Not Register', 
                "Make sure the passwords match and have at least 8 characters and 1 captial letter!");
        }
    }
    return (
    <View style={styles.container}>
        <Text style={styles.text}>Email Address</Text>
        <TextInput 
        placeholder='Email Address' 
        style={styles.textInput} 
        value={email}
        keyboardType='email-address'
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
        <Button title="Register" onPress={()=>{createUser()}}/>
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
    text:{fontSize:16, margin:2, width:'80%', textAlign:'left'},
});