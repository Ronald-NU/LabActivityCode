import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { auth } from '@/Firebase/firebaseSetup';

export default function profile() {
  return (
     <SafeAreaView>
          <StatusBar />
      <Text>{auth.currentUser?.email}</Text>
      <Text>{auth.currentUser?.uid}</Text>
    </SafeAreaView>
  )
}