import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, SafeAreaView, FlatList,Alert } from 'react-native';
import Header from './components/Header';
import Input from './components/Input';
import { useState } from 'react';
import { GoalItem } from './components/GoalItem';

export interface Goal {
  text: string;
  id: number;
}

export default function App() {
  
  const [goals, setGoals] = useState<Goal[]>([]);

  const [isInputVisable, setIsInputVisable] = useState<boolean>(false);
  const appName = "Lab Activity Code";
  //controls if the input componenet is focused on render
  const isFocusedOnRender = true;

  //Function to handle input data from the input component and hide modal
  const handleInputData = (data: string) => {
    //creates new goal object with id random num 0-1000000
    var newGoal:Goal = {
      text: data,
      id: Math.floor(Math.random()*1000000)
    }
    setGoals(goals => [newGoal, ...goals]);
    setIsInputVisable(false)
  }
  const handleCancelInput = () => {
    setIsInputVisable(false)
  }

  const handleOnDeleteGoal = (id:number) => { 
    setGoals(goals => goals.filter((goal)=> {
      if(goal.id==id){
        return false
      }else{
        return true
      }
    }))
  }
  const handelDeleteAll = () => {
     Alert.alert('Delete All?','Are you sure you want to delete all goals?',[
                { text: 'Yes', onPress: () => {
                    setGoals([]);
                } },
                { text: 'No', onPress: () => {} }
            ])
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
        <FlatList
        contentContainerStyle={{alignItems:'center'}}
        data={goals}
        renderItem={({item}) => <GoalItem goal={item} handleOnDelete={handleOnDeleteGoal} />}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.text}>No goals to show</Text>}
        ListHeaderComponent={goals.length>0?<Text style={styles.text}>My Goal List</Text>:null}
        ListFooterComponent={goals.length>0?<Button title={'Delete All'} onPress={handelDeleteAll}/>:null}
        ItemSeparatorComponent={() => <View style={{ height: 3, backgroundColor: '#e0e0e0' }} />}
        />
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
  text:{fontSize:20,color:'orange', textAlign:'center'},
  topSection:{
    flex:1,
    justifyContent:'space-around',
    alignItems: 'center'},
  bottomSection:{flex:4, padding:10,
    justifyContent:'flex-start', backgroundColor:'#a3a3a3',width:'100%'}
});
