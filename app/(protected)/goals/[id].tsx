import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams } from "expo-router";
import { readDocFromDB, updateDB } from '@/Firebase/firestoreHelper';
import { FontAwesome } from '@expo/vector-icons';
import { Goal } from '../index';
import { PressableButton } from '@/components/PressableButton';
import GoalUsers from '@/components/GoalUsers';
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from '@/Firebase/firebaseSetup';

export default function GoalDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [goal, setGoal] = useState<Goal|null>(null);
    const [warning, setWarning] = useState<boolean>(false);
    const [imageUri, setImageUri] = useState<string>("");

    useEffect(() => {
        const fetchGoal = async () => {
            try {
                const ReadGoal = await readDocFromDB(id, "goals");
                if(ReadGoal?.exists()){
                const data = ReadGoal?.data();
                data.warning ? setWarning(true) : setWarning(false);
                setGoal(goal => data as Goal);
                if(data.imageUri){
                const reference = ref(storage, data.imageUri);
                const url = await getDownloadURL(reference);
                setImageUri(url);
                }
               }
            } catch (err) {
                console.log(err);
            }
        };
        fetchGoal();
    }, []);

    const setWarningHandle = () => {
        setWarning(true);
        updateDB(id, "goals", { text: goal ? goal?.text:"", warning: true});
    }

  return (
    <View>
        <Stack.Screen options={{
                    headerTitle: goal ? (warning?'warning':goal?.text): "",
                    headerRight: () => {
                        return <PressableButton pressedHandler={()=>{setWarningHandle()}} pressedStyle={{opacity:0.5}} >
                        <FontAwesome name="warning" size={24} color="white" />
                      </PressableButton>
                    }
                 }} />
      <Text style={warning && styles.textWarning}>Details: {goal?.text}</Text>
      {imageUri &&
      <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} /> 
        }
                  <GoalUsers id={id} />

    </View>
  )
}

const styles = StyleSheet.create({
    textWarning:{
        color:'red'
    }
});