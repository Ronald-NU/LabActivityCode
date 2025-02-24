import { Button, FlatList, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getCollectionFromDB, User, writeToDB } from '@/Firebase/firestoreHelper';

interface GoalUserProps {
    id:string
}

export const GoalUsers = ({id}:GoalUserProps) => {
    const [Users, setUsers] = useState<User[]>([]);
    
    useEffect(() => {     
        const getUserGoalData =  async () => {
            const users = await getCollectionFromDB(`goals/${id}/users`);
            if(users){
                console.log("Get From DB");
                setUsers(users);
            }else{
            console.log("Get From API");
            try {
            const promise = await fetch('https://jsonplaceholder.typicode.com/users');
            //only extract data if response ok
            if(promise.ok){
            const Data = await promise.json();
            setUsers(Data);
            Data.forEach((value: User)=>{
                writeToDB(value,`goals/${id}/users`)
            })
            }else {
                throw new Error(`Something went wrong with ${promise.status}`)
            }
            }catch (err) {
                console.log("fetching users ", err)
            }
        }
      
        }
        getUserGoalData();
      }, []);


      const PostRequest = async () => {
        const FakeUser = {
            name:'Bob',
            id:4,
            username: "Bobby",
            email: "bob@hotmail.com",
            address: {
                street:'StreetName',
                suite:'12345',
                city:'City',
                zipcode:'A1B2C3',
                geo:
                {
                    lat:1000,
                    log:2000
                }
            },
            phone: '111-222-3333',
            website: 'Company.com',
            company: {
                name:'Company',
                catchphrase:'We Are a Company!',
                bs:'BS???'
            },
        }
        const jsonFakeUser = JSON.stringify(FakeUser);
        const promise = await fetch('https://jsonplaceholder.typicode.com/users',
            {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: jsonFakeUser
            }
        )
        console.log(await promise.json());
      }
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
         <Button title="Get Users" onPress={PostRequest}/>
      </View>
    )
}

export default GoalUsers