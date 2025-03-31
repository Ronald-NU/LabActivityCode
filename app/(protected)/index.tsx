import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, SafeAreaView, FlatList,Alert, Platform } from 'react-native';
import Header from '@/components/Header';
import Input from '@/components/Input';
import React, { useState, useEffect } from 'react';
import { GoalItem } from '@/components/GoalItem';
import { deleteAllFromDB, deleteFromDB, writeToDB } from '@/Firebase/firestoreHelper';

import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, database, storage } from '@/Firebase/firebaseSetup';
import { PressableButton } from '@/components/PressableButton';
import { ref, uploadBytesResumable } from 'firebase/storage';
import * as Notifications from "expo-notifications";

import Constants from "expo-constants";
import { verifyPermissions } from '@/components/NotificationManager';

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
  const isFocusedOnRender = true;
  const [pushToken, setPushToken] = useState<string | undefined>();

  useEffect(()=>{
    const NotificationSetup = async () => {
      if(await verifyPermissions()){
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
    });
  }
  Notifications.setNotificationHandler({
    handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound: false, shouldSetBadge: false })
  });
  
  const token = await Notifications.getExpoPushTokenAsync({
    projectId: Constants.expoConfig?.extra?.eas?.projectId,
  });
  setPushToken(token.data);
}
}
NotificationSetup()
  },[])

  

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      console.log("Notification received:", notification);
      })
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener((notification) => {
      console.log("Notification Response Received:", notification);
      });
    return () => subscription.remove();
  }, []);
  

  useEffect(() => {
    //add where clause to query
    if (!auth.currentUser) return;
    const unsubscribe = onSnapshot(query(collection(database, "goals"), 
    where("owner","==", auth.currentUser.uid)), 
    (querySnapshot) => {
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
  const handleInputData = async (data: {text:string, imageURI:string}) => {
    const goalData = {
      text: data.text
    }
    var uploadURIResult;
    if(data.imageURI?.length>0){
      const response = await fetch(data.imageURI);
      const blob = await response.blob();

      const imageName = data.imageURI.substring(data.imageURI.lastIndexOf('/') + 1);
      const imageRef = ref(storage, `images/${imageName}`)
      const uploadResult = await uploadBytesResumable(imageRef, blob);
      uploadURIResult = uploadResult.ref.fullPath;
      writeToDB({...goalData, imageUri: uploadURIResult},collectionGoals)
      setIsInputVisable(false)
    } else {
      writeToDB(goalData, collectionGoals)
      setIsInputVisable(false)
    }
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

  const PushNotification = async () => {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        to: pushToken,
        title: "Push Notification",
        body: "This is a push notification",
      })
    })
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
      <Button title="Send Push" onPress={PushNotification} />

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
