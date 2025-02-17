import { Goal } from "@/app";
import { Link, router } from "expo-router";
import { Text, StyleSheet, Button, Pressable} from 'react-native';
import { PressableButton } from "./PressableButton";

 type GoalItemProps = {goal: Goal,
    handleOnDelete:(id:string)=>void;
 };

  export const GoalItem = ( {goal,handleOnDelete}: GoalItemProps ) => (
    
    <Pressable android_ripple={{color:'white'}} onPress={()=>{router.setParams({titleName: `${goal.text}`});router.navigate(`/goals/${goal.id}`);}} 
    style={({ pressed }) => {
      return [styles.textContainer, pressed && styles.pressedStyle];
    }}>
      <Text style={styles.text}>{goal.text}</Text>
      <PressableButton pressedHandler={()=>{handleOnDelete(goal.id)}} pressedStyle={styles.pressedStyle}>
        <Text style={{color:'white',paddingHorizontal:8}}>X</Text>
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