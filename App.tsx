import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, SafeAreaView } from 'react-native';
import Header from './components/Header';
import Input from './components/Input';
import { useState } from 'react';

export default function App() {

  const [text, setText] = useState<string>('');
  const [isInputVisable, setIsInputVisable] = useState<boolean>(false);
  const appName = "Lab Activity Code";
  //controls if the input componenet is focused on render
  const isFocusedOnRender = true;

  //Function to handle input data from the input component and hide modal
  const handleInputData = (data: string) => {
    setText(data)
    setIsInputVisable(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topSection}>
      <Header appName={appName} />
      <Input isVisable={isInputVisable} focusOnRender={isFocusedOnRender} handleInputData={handleInputData} />
      <View style={styles.button}>
      <Button title='Add a goal' onPress={()=>setIsInputVisable(true)}/>
      </View>
      </View>
      <View style={styles.bottomSection}>
      {
      <View style={styles.textContainer}>
          <Text style={styles.text}>{text}</Text>
      </View>
      }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{width:'30%',margin:10},
  text:{fontSize:20,color:'orange', padding:10,},
  textContainer:{backgroundColor:'#e0e0e0', borderRadius:10},
  topSection:{
    flex:1,
    alignItems: 'center'},
  bottomSection:{flex:5, alignItems:'center', padding:10,
    justifyContent:'flex-start', backgroundColor:'#a3a3a3',width:'100%'}
});
