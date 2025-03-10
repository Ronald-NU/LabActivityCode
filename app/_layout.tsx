import { auth } from "@/Firebase/firebaseSetup";
import { router, Stack } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Layout() {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
            setUserLoggedIn(true);
          } else {
          // User is signed out
            setUserLoggedIn(false);
          }
        })
      }, []);

      useEffect(() => {
        if (userLoggedIn)
        {
        router.replace("/(protected)/");
        }
        else if (!userLoggedIn )      
        {
        router.replace("/(auth)/login");
        }
   }, [userLoggedIn]);
   
    return   (
    <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
        <Stack.Screen
				 name="(auth)" options={{ animation: "slide_from_left" }} />     
	<Stack.Screen 
				name="(protected)" options={{ animation: "slide_from_right" }} />
    </Stack>)
}