import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './components/Header';
import { useState } from 'react';

export default function App() {

  const [text, setText] = useState('');
  
  var appName = "Lab Activity Code";

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header appName={appName} />
      <TextInput placeholder='Enter Text' style={{height:40}}
      value={text}
      onChangeText={text => setText(text)}
      />
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
