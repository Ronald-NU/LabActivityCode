import { View, Button, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import { router, useLocalSearchParams } from 'expo-router';
import { getUserLocation, setUserLocation } from '@/Firebase/firestoreHelper';
import { auth } from '@/Firebase/firebaseSetup';
import { LatLng } from 'react-native-maps';

type location = {
    latitude:number,
    longitude:number
}

const LocationManager = () => {
    const {latitude, longitude} = useLocalSearchParams();
    const [response, requestPermission] = Location.useForegroundPermissions();
    const [mylocation, setLocation] = useState<location>();

    useEffect(()=>{
        if(latitude&&longitude){
        setLocation({
            latitude: Number.parseFloat(latitude as string),
            longitude: Number.parseFloat(longitude as string),
        })
        }
    },[latitude,longitude])

    useEffect(()=>{
        const getUserLoc = async () => {
        if (auth?.currentUser?.uid) {
        const user = await getUserLocation('users',auth.currentUser?.uid);
        if(user){
            setLocation(user as LatLng)
        }
        }
        }
        getUserLoc();
    },[])

    const mapsApiKey = {
        key: process.env.EXPO_PUBLIC_GOOGLE_STATIC_MAP_API_KEY
    };

    const locateUserHandler = async () => {
        await verifyPermissions();
        if(response?.granted){
        try {
            const location = await Location.getCurrentPositionAsync();
            setLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        }
        catch (err) {
            console.log(err);
        }
        }
      };

      const verifyPermissions = async () => {
        if (response?.granted) return true;
            
        const result = await requestPermission();
        return result.granted;
      }

      const goToMap = () => {
        router.navigate(`map?latitude=${mylocation?.latitude}&longitude=${mylocation?.longitude}`)
      }

      const setLocationToDB = () => {
        if (auth?.currentUser?.uid && mylocation) {
            setUserLocation("users", auth.currentUser.uid, mylocation);
          }
      }

  return (
    <View style={{justifyContent:'center', alignItems:'center'}}>
      <Button title='Find My Location' onPress={locateUserHandler}/>
      <Button title='Go to Map' onPress={goToMap}/>
      <Button title='Save Location' onPress={setLocationToDB} />
      {
      mylocation?
      <Image source={{ uri: `https://maps.googleapis.com/maps/api/staticmap?center=${mylocation?.latitude},${mylocation?.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${mylocation?.latitude},${mylocation?.longitude}&key=${mapsApiKey.key}` }} width={400} height={200} />
      :
      null
      }
    </View>
  )
}

export default LocationManager