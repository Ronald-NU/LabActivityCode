import { Text, View } from 'react-native'
import React, { useEffect } from 'react'

export const GoalUsers = () => {

    useEffect(() => {     
        const getUserGoalData =  async () => {
            const promise = await fetch('https://jsonplaceholder.typicode.com/users');
            console.log(await promise.json());
        }
        getUserGoalData();
      }, []);


    return (
      <View>
      </View>
    )
}

export default GoalUsers