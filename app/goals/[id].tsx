import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams } from "expo-router";
import { readDocFromDB, updateDB } from '@/Firebase/firestoreHelper';
import { FontAwesome } from '@expo/vector-icons';
import { Goal } from '../index';
import { PressableButton } from '@/components/PressableButton';
import GoalUsers from '@/components/GoalUsers';

export default function GoalDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [goal, setGoal] = useState<Goal|null>(null);
    const [warning, setWarning] = useState<boolean>(false);

    useEffect(() => {
        const fetchGoal = async () => {
            try {
                const ReadGoal = await readDocFromDB(id, "goals");
                if(ReadGoal?.exists()){
                const data = ReadGoal?.data();
                data.warning ? setWarning(true) : setWarning(false);
                setGoal(goal => data as Goal);
               }
            } catch (err) {
                console.log(err);
            }
        };
        fetchGoal();
    }, []);

    const setWarningHandle = () => {
        setWarning(true);
        updateDB(id, "goals", { text: goal ? goal?.text:"", warning: true });
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
                  <GoalUsers />
    </View>
  )
}

const styles = StyleSheet.create({
    textWarning:{
        color:'red'
    }
});