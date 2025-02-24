import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, SafeAreaView, FlatList,Alert } from 'react-native';
import Header from '../components/Header';
import Input from '../components/Input';
import { useState, useEffect } from 'react';
import { GoalItem } from '../components/GoalItem';
import { deleteAllFromDB, deleteFromDB, writeToDB } from '../Firebase/firestoreHelper';

import { collection, onSnapshot } from 'firebase/firestore';
import { database } from '../Firebase/firebaseSetup';
import { PressableButton } from '@/components/PressableButton';

export interface Goal {
  text: string;
  id: string;
  warning?:boolean;
}

export default function App() {
  const collectionGoals = 'goals';
  const [goals, setGoals] = useState<Goal[]>([]);

  const [isInputVisable, setIsInputVisable] = useState<boolean>(false);
  const appName = "Lab Activity Code";
  //controls if the input componenet is focused on render
  const isFocusedOnRender = true;

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(database, "goals"), (querySnapshot) => {
      if(!querySnapshot.empty){
        setGoals(goals => []);
      querySnapshot.forEach((doc)=>{
        const displayGoal:Goal = {id:doc.id,text:doc.data().text}
        setGoals(goals => [displayGoal,...goals]);
      })
      }else{
        setGoals(goals => []);
      }
    })
    return () => {
      unsubscribe();
    };
  }, [])
  

  //Function to handle input data from the input component and hide modal
  const handleInputData = (data: string) => {
    const goalData = {
      text: data
    }
    writeToDB(goalData,collectionGoals)
  
    setIsInputVisable(false)
  }
  const handleCancelInput = () => {
    setIsInputVisable(false)
  }

  const handleOnDeleteGoal = (id:string) => { 
    deleteFromDB(id,collectionGoals)
  }

  const handleDeleteAll = () => {
     Alert.alert('Delete All?','Are you sure you want to delete all goals?',[
                { text: 'Yes', onPress: () => {
                  deleteAllFromDB(collectionGoals);
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
        <PressableButton pressedHandler={()=>{setIsInputVisable(true)}} pressedStyle={{opacity:0.5}}>
            <Text style={[styles.text,{backgroundColor: 'grey', paddingVertical:8, borderRadius: 10,width:130}]}>Add a goal</Text>
          </PressableButton>
      </View>
      </View>

      <View style={styles.bottomSection}>
        <FlatList
        contentContainerStyle={{alignItems:'center'}}
        data={goals}
        renderItem={({item, index, separators}) => 
          <GoalItem goal={item} handleOnDelete={handleOnDeleteGoal} 
        onPressIn={separators.highlight}
        onPressOut={separators.unhighlight}/>}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.text}>No goals to show</Text>}
        ListHeaderComponent={goals.length>0?<Text style={styles.text}>My Goal List</Text>:null}
        ListFooterComponent={goals.length>0?<Button title={'Delete All'} onPress={handleDeleteAll}/>:null}
        ItemSeparatorComponent={({ highlighted }) => {
          const backgroundColor = highlighted ? 'orange' : '#e0e0e0';
          return <View style={{ height: 3, backgroundColor: backgroundColor}}/>
        }}
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
