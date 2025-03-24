import { View, Text } from 'react-native'
import React from 'react'
import MapView from "react-native-maps";
import { useLocalSearchParams } from 'expo-router';

export type Region = {
    latitude: Number,
    longitude: Number,
    latitudeDelta: Number,
    longitudeDelta: Number,
  }

export default function map() {
    const {location} = useLocalSearchParams()
    
  return (
    <MapView style={{flex:1}}>

    </MapView>
  )
}