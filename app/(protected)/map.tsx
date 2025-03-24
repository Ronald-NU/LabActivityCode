import { View, Text } from 'react-native'
import React from 'react'
import MapView, { Marker } from "react-native-maps";
import { useLocalSearchParams } from 'expo-router';

export type Region = {
    latitude: Number,
    longitude: Number,
    latitudeDelta: Number,
    longitudeDelta: Number,
  }

export default function map() {
    const {latitude, longitude} = useLocalSearchParams()
  return (
    <MapView style={{flex:1}} initialRegion={{
        latitude: Number.parseFloat(latitude as string),
        longitude: Number.parseFloat(longitude as string),
        longitudeDelta:0.05,
        latitudeDelta:0.05}}>
    </MapView>
  )
}