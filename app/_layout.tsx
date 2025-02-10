import { Stack } from "expo-router";

export default function Layout() {
    return   (
    <Stack screenOptions={{headerStyle: {
        backgroundColor: 'orange'
    },
    headerTitleStyle: {
        color: 'white'
    },
    headerTintColor: 'white'
    }}>
    <Stack.Screen name="index"
    options={{headerTitle:'All My Goals'}} />
    <Stack.Screen name="goals/[id]" />
    </Stack>)
}