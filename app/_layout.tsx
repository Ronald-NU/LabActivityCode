import { auth } from "@/Firebase/firebaseSetup";
import { Stack } from "expo-router";
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
    return   (
    <Stack screenOptions={{headerShown:false}}>
    </Stack>)
}