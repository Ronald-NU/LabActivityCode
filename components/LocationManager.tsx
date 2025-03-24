import { View, Button, Image } from 'react-native'
import React, { useState } from 'react'
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { Region } from '@/app/(protected)/map';

type location = {
    latitude:number,
    longitude:number
}

const LocationManager = () => {
    const [response, requestPermission] = Location.useForegroundPermissions();
    const [mylocation, setLocation] = useState<location>();

    const mapsApiKey = {
        key: process.env.EXPO_GOOGLE_STATIC_MAP_API_KEY
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
        router.navigate(`map?location=${mylocation}`)
      }

  return (
    <View style={{justifyContent:'center', alignItems:'center'}}>
      <Button title='Find My Location' onPress={locateUserHandler}/>
      <Button title='Go to Map' onPress={goToMap}/>
      
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