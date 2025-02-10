import { Goal } from "@/app";
import { Link } from "expo-router";
import { View, Text, StyleSheet, Button} from 'react-native';

 type GoalItemProps = {goal: Goal,
    handleOnDelete:(id:string)=>void;
 };

  export const GoalItem = ( {goal,handleOnDelete}: GoalItemProps ) => (
    
    <View style={styles.textContainer}>
      <Text style={styles.text}>{goal.text}</Text>
      <Button title="x" color={'grey'} onPress={()=>{handleOnDelete(goal.id)}}/>
      <Link href={{pathname:`/goals/${goal.id}`, params: { titleName: `${goal.text}` }}} style={{fontSize:16, color:'grey',marginRight:8}}> i </Link>
    </View>
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