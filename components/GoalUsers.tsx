import { FlatList, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { writeToDB } from '@/Firebase/firestoreHelper';

export const GoalUsers = () => {
    const [Users, setUsers] = useState([]);
    useEffect(() => {     
        const getUserGoalData =  async () => {
            try {
            const promise = await fetch('https://jsonplaceholder.typicode.com/users');
            //only extract data if response ok
            if(promise.ok){
            const responseData = await promise.json();
            setUsers(()=>responseData);
            }else {
                throw new Error(`Something went wrong with ${promise.status}`)
            }
            }catch (err) {
                console.log("fetching users ", err)
            }
           // writeToDB({text:Users[0]['name']},`goals/{$id}/users`)
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