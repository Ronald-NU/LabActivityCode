import { View, Button } from 'react-native'
import React, { useState } from 'react'
import * as Location from 'expo-location';

const LocationManager = () => {
    const [mylocation, setLocation] = useState<Location.LocationObjectCoords>();
    const locateUserHandler = async () => {
        try {
            const location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);
        }
        catch (err) {

        }
      };

  return (
    <View>
      <Button title='Locate User' onPress={locateUserHandler}/>
    </View>
  )
}

export default LocationManager