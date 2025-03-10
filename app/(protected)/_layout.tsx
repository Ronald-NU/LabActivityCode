import { PressableButton } from "@/components/PressableButton";
import { router, Stack } from "expo-router";
import React from "react";
import { FontAwesome } from '@expo/vector-icons';
import { auth } from "@/Firebase/firebaseSetup";
import { Alert } from "react-native";

export default function Layout() {
    return   (
    <Stack screenOptions={{headerStyle: {
        backgroundColor: 'orange'
    },
    headerTitleStyle: {
        color: 'white'
    },
    headerTintColor: 'white'
    }}>
    <Stack.Screen name="index"
    options={{headerTitle:'All My Goals',
        headerRight: () => {
        return <PressableButton pressedHandler={()=>{router.navigate('profile')}} pressedStyle={{opacity:0.5}} >
        <FontAwesome name="user" size={24} color="white" />
      </PressableButton>
    }
 }}  />
    <Stack.Screen name="goals/[id]" />
    <Stack.Screen name="profile" 
    options={{
        headerRight: () => {
            return <PressableButton pressedHandler={()=>{
                Alert.alert('Sign Out?','Are you sure you want to sign out?',[
                    {text:'Yes',onPress
                    :()=>{ auth.signOut()}},
                    {text:'No',onPress:()=>{}}
                ])
                }} pressedStyle={{opacity:0.5}} >
            <FontAwesome name="user-times" size={24} color="white" />
          </PressableButton>
        }
    }}/>
    </Stack>)
}