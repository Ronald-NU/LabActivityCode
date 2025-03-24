import { SafeAreaView, StatusBar,  Text } from 'react-native'
import React from 'react'
import { auth } from '@/Firebase/firebaseSetup';
import LocationManager from '@/components/LocationManager';

export default function profile() {
  return (
     <SafeAreaView>
          <StatusBar />
      <Text>{auth.currentUser?.email}</Text>
      <Text>{auth.currentUser?.uid}</Text>
      <LocationManager />
    </SafeAreaView>
  )
}