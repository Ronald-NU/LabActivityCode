import { View, Button, Image } from 'react-native'
import React, { useState } from 'react'

import * as ImagePicker from 'expo-image-picker';

interface ImageManagerProps {
    retrievedImage: (imageUri: string) => void;
}

export const ImageManager =  ({retrievedImage} : ImageManagerProps) => {
const [response, requestPermission] = ImagePicker.useCameraPermissions();
  const [image, setImage] = useState<string>("");
const verifyImagePermissions = async () => {
    if (response?.granted === false) {
        const result = await requestPermission();
        return result.granted;
    } else {
        return true;
    }
  }
  
  const takeImageHandler = async () => {
    try {
    if(await verifyImagePermissions()){
      const result = await ImagePicker.launchCameraAsync({allowsEditing: true});
        if (!result.canceled) {
            retrievedImage(result.assets[0].uri); 
            setImage(result.assets[0].uri); 
        }
    }
    }
    catch (err) {
      console.log(err);
    }
  };
  
    return (
    <View>
        <Image source={{ uri: image}} style={{ width: 100, height: 100 }} />
       <Button title="Take Image" onPress={()=>{takeImageHandler()}} />
    </View>
    );
}

export default ImageManager