import { View, Text, Button, Alert } from 'react-native'
import React from 'react'

import * as ImagePicker from 'expo-image-picker';

export const ImageManager = () => {
    const [response, requestPermission] = ImagePicker.useCameraPermissions();


const verifyImagePermissions = async () => {
    if (response?.granted === false) {
        await requestPermission();
        return false;
    } else {
        return true;
    }
  }
  
  const takeImageHandler = async () => {
    try {
    if(await verifyImagePermissions()){
      const result = await ImagePicker.launchCameraAsync({allowsEditing: true, aspect: [16, 9], quality: 0.5});
      console.log(result);
        }
    }
    catch (err) {
      console.log(err);
    }
  };
  
    return (
    <View>
       <Button title="Take Image" onPress={()=>{takeImageHandler()}} />
    </View>
    );
}

export default ImageManager