import { Stack } from "expo-router";

export default function Layout() {
  return   (
    <Stack>
    <Stack.Screen name="index"
    options={{title:'All My Goals',
        headerStyle:{
            backgroundColor:'orange'
        },
        headerTitleStyle:{
            color:'white'
        }}} />
    <Stack.Screen 
    options={{title:'Goal Details',
        headerStyle:{
            backgroundColor:'orange'
        },
        headerTitleStyle:{
            color:'white'
        },
        headerTintColor:'white'
    }}
    name="goals/[id]" />
    </Stack>)
}