import {  Button, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker } from "react-native-maps";
import { router, useLocalSearchParams } from 'expo-router';

export type Region = {
    latitude: Number,
    longitude: Number,
    latitudeDelta: Number,
    longitudeDelta: Number,
  }

  type LatLng = {
    latitude: number,    
    longitude: number, 
  }

export default function map() {
    const {latitude, longitude} = useLocalSearchParams()
    const [markerLoc, setMarkerLoc] = useState<LatLng>()

    const goToProfile = () => {
        router.replace(`profile?latitude=${markerLoc?.latitude}&longitude=${markerLoc?.longitude}`)
    }
  return (
    <SafeAreaView style={{flex:1}}>
    <MapView style={{flex:1}} initialRegion={{
        latitude: Number.parseFloat(latitude as string),
        longitude: Number.parseFloat(longitude as string),
        longitudeDelta:0.05,
        latitudeDelta:0.05}} onPress={(event)=>{setMarkerLoc(event.nativeEvent.coordinate)}}>
            {
             markerLoc?<Marker coordinate={markerLoc}/>:null
            }
    </MapView>
    <Button disabled={markerLoc?false:true} title="Confirm Selected Location"  onPress={goToProfile}/>
    </SafeAreaView>
  )
}