import { View, Text, Button } from 'react-native'
import React from 'react'

import * as ImagePicker from 'expo-image-picker';

export const ImageManager = () => {
  return (
    <View>
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
}

const takeImageHandler = async () => {
  try {
    const result = await ImagePicker.launchCameraAsync({allowsEditing: true, aspect: [16, 9], quality: 0.5});
    console.log(result);
  }
  catch (err) {
    console.log(err);
  }
};

export default ImageManager