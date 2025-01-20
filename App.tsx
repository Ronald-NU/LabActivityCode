import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import Header from './components/Header';
import Input from './components/Input';
import { useState } from 'react';

export default function App() {

  const [text, setText] = useState<string>('');
  const appName = "Lab Activity Code";
  //controls if the input componenet is focused on render
  const isFocusedOnRender = true;

  //Function to handle input data from the input component
  const handleInputData = (data: string) => {
    setText(data)
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header appName={appName} />
      <Input focusOnRender={isFocusedOnRender} handleInputData={handleInputData} />
      {
      <Text>{text}</Text>
      }
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
