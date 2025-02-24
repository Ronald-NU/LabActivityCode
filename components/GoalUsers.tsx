import { FlatList, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

export const GoalUsers = () => {
    const [Users, setUsers] = useState([]);
    useEffect(() => {     
        const getUserGoalData =  async () => {
            const promise = await (await fetch('https://jsonplaceholder.typicode.com/users')).json();
            setUsers(()=>promise);
        }
        getUserGoalData();
      }, []);
    return (
      <View style={{
        padding:10,
        justifyContent:'flex-start',
        width:'100%'
        }}>
         <FlatList
                contentContainerStyle={{alignItems:'center'}}
                data={Users}
                renderItem={({item, index, separators}) => 
                    <View key={index}>
                        <Text>{item['name']}</Text>
                    </View>
                }       
           />
      </View>
    )
}

export default GoalUsers