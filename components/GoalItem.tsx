import { Goal } from "@/App";
import { View, Text, StyleSheet} from 'react-native';

 type GoalItemProps = {goal: Goal};

  export const GoalItem = ( {goal}: GoalItemProps ) => (
    <View style={styles.textContainer}>
      <Text style={styles.text}>{goal.text}</Text>
    </View>
  );

  const styles = StyleSheet.create({
    text:{
        fontSize:20,color:'orange', padding:10, textAlign:'center'
    },
    textContainer:{
        flexDirection:'row', justifyContent:'center', backgroundColor:'#e0e0e0', borderRadius:10, marginVertical:8
    },
  });