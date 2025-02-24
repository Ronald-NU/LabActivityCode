import { FlatList, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { writeToDB } from '@/Firebase/firestoreHelper';

interface GoalUserProps {
    id:string
}

export const GoalUsers = ({id}:GoalUserProps) => {
    const [Users, setUsers] = useState([]);
    useEffect(() => {     
        const getUserGoalData =  async () => {
            try {
            const promise = await fetch('https://jsonplaceholder.typicode.com/users');
            //only extract data if response ok
            if(promise.ok){
            const Data = await promise.json();
            setUsers(()=> Data);
            if(Users.length > 1){
                Users.forEach((value)=>{
                    writeToDB(value,`goals/${id}/users`)
                })
               }
            }else {
                throw new Error(`Something went wrong with ${promise.status}`)
            }
            }catch (err) {
                console.log("fetching users ", err)
            }
      
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
                renderItem={({item, index}) => 
                    <View key={index}>
                        <Text>{item['name']}</Text>
                    </View>
                }       
           />
      </View>
    )
}

export default GoalUsers