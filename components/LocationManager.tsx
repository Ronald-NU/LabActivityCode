import { View, Button } from 'react-native'
import React, { useState } from 'react'
import * as Location from 'expo-location';

const LocationManager = () => {
    const [response, requestPermission] = Location.useForegroundPermissions();
    const [mylocation, setLocation] = useState<Location.LocationObjectCoords>();

    const locateUserHandler = async () => {
        await verifyPermissions();
        if(response?.granted){
        try {
            const location = await Location.getCurrentPositionAsync();
            setLocation(location.coords);
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

  return (
    <View>
      <Button title='Locate User' onPress={locateUserHandler}/>
    </View>
  )
}

export default LocationManager