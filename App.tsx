import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, SafeAreaView } from 'react-native';
import Header from './components/Header';
import Input from './components/Input';
import { useState } from 'react';

export interface Goal {
  text: string;
  id: number;
}

export default function App() {
  
  const [goals, setGoals] = useState<Goal[]>([]);

  const [text, setText] = useState<string>('');
  const [isInputVisable, setIsInputVisable] = useState<boolean>(false);
  const appName = "Lab Activity Code";
  //controls if the input componenet is focused on render
  const isFocusedOnRender = true;

  //Function to handle input data from the input component and hide modal
  const handleInputData = (data: string) => {
    //creates new goal object with id random num 0-1000
    var newGoal:Goal = {
      text: data,
      id: Math.floor(Math.random()*1000000)
    }
    setGoals([newGoal, ...goals]);
    setText(data)
    setIsInputVisable(false)
  }
  const handleCancelInput = () => {
    setIsInputVisable(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topSection}>
      <Header appName={appName} />
      <Input isVisable={isInputVisable} focusOnRender={isFocusedOnRender} handleCancelInput={handleCancelInput} handleInputData={handleInputData} />
      <View style={styles.button}>
      <Button title='Add a goal' onPress={()=>setIsInputVisable(true)}/>
      </View>
      </View>
      <View style={styles.bottomSection}>
      {
        goals.map((goal)=>{
          return(
          <View key={goal.id} style={styles.textContainer}>
            <Text style={styles.text}>{goal.text}</Text>
          </View>
          )
        })
      }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{width:'30%',margin:10},
  text:{fontSize:20,color:'orange', padding:10},
  textContainer:{backgroundColor:'#e0e0e0', borderRadius:10, marginVertical:8},
  topSection:{
    flex:1,
    justifyContent:'space-around',
    alignItems: 'center'},
  bottomSection:{flex:4, alignItems:'center', padding:10,
    justifyContent:'flex-start', backgroundColor:'#a3a3a3',width:'100%'}
});
