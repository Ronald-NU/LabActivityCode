import {  router } from "expo-router";
import { Text, StyleSheet, Pressable, Alert} from 'react-native';
import { PressableButton } from "./PressableButton";
import React from "react";
import { FontAwesome } from '@expo/vector-icons';
import { Goal } from "@/app/(protected)";

 type GoalItemProps = {goal: Goal,
    handleOnDelete:(id:string)=>void;
    onPressIn:()=>void;
    onPressOut:()=>void;
 };

  export const GoalItem = ( {goal, handleOnDelete,onPressIn,onPressOut}: GoalItemProps ) => (
    
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut}
    onLongPress={()=>{
      Alert.alert('Delete Goal', `Are you sure you want to delete ${goal.text}?`, [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', onPress: () => handleOnDelete(goal.id)}
      ]);
    }} android_ripple={{color:'white'}} onPress={()=>{router.setParams({titleName: `${goal.text}`});router.navigate(`/goals/${goal.id}`);}} 
    style={({ pressed }) => {
      return [styles.textContainer, pressed && styles.pressedStyle];
    }}>
      <Text style={styles.text}>{goal.text}</Text>
      <PressableButton pressedHandler={()=>{handleOnDelete(goal.id)}} pressedStyle={styles.pressedStyle}>
        <FontAwesome name="trash" size={24} color="white" />
      </PressableButton>
    </Pressable>
  );

  const styles = StyleSheet.create({
    text:{
        fontSize:20,color:'orange', padding:10, textAlign:'center'
    },
    textContainer:{
        flexDirection:'row', justifyContent:'center', 
        alignItems:'center',backgroundColor:'#e0e0e0',
        borderRadius:10, marginVertical:8
    },
    pressedStyle:{
        opacity:0.5
    }
  });