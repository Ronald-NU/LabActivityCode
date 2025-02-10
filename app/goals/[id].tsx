import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from "expo-router";
import { readDocFromDB } from '@/Firebase/firestoreHelper';
import { Goal } from '../index';

export default function GoalDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [goal, setGoal] = useState<Goal>();
    useEffect(() => {
        const fetchGoal = async () => {
            try {
                const ReadGoal = await readDocFromDB(id, "goals");
                setGoal(ReadGoal?.data() as Goal);
            } catch (err) {
                console.log(err);
            }
        };
        fetchGoal();
    }, []);
  return (
    <View>
      <Text>Details: {goal?.text}, id:{id}</Text>
    </View>
  )
}