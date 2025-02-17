import { Goal } from "@/app";
import { Link, router } from "expo-router";
import { Text, StyleSheet, Button, Pressable} from 'react-native';

 type GoalItemProps = {goal: Goal,
    handleOnDelete:(id:string)=>void;
 };

  export const GoalItem = ( {goal,handleOnDelete}: GoalItemProps ) => (
    
    <Pressable onPress={()=>{router.setParams({titleName: `${goal.text}`});router.navigate(`/goals/${goal.id}`);}} style={styles.textContainer}>
      <Text style={styles.text}>{goal.text}</Text>
      <Button title="x" color={'grey'} onPress={()=>{handleOnDelete(goal.id)}}/>
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
  });