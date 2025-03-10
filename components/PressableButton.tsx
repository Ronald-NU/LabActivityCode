import { Pressable, StyleProp, View, ViewStyle } from "react-native";

interface PressableButtonProps {
    pressedHandler: () => void;
    pressedStyle?: StyleProp<ViewStyle>;
    children: React.ReactNode;
  }
  
  export function PressableButton({children, pressedHandler, pressedStyle}:
  PressableButtonProps){
  
  return (
    <Pressable android_ripple={{color:'light-grey'}} onPressIn={pressedHandler} style={({ pressed }) => {
      return [pressed && pressedStyle]; }}>
      <View style={{padding:8}}>
        {children}
      </View>
      </Pressable>
   );
  }