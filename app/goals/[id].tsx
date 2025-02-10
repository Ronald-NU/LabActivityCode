import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams } from "expo-router";
import { readDocFromDB, updateDB } from '@/Firebase/firestoreHelper';
import { Goal } from '../index';

export default function GoalDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [goal, setGoal] = useState<Goal|null>(null);
    const [warning, setWarning] = useState<boolean>(false);
    console.log(warning)

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
                        return <Button onPress={()=>setWarningHandle()}
                        title="warning"
                        color='white'
                        />
                    }
                 }} />
      <Text style={warning && styles.textWarning}>Details: {goal?.text}, id:{id}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    textWarning:{
        color:'red'
    }
});