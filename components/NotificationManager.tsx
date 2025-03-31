import * as Notifications from "expo-notifications";
import { Alert, Button, View } from "react-native";

export  const verifyPermissions = async () => {
    const settings = await Notifications.getPermissionsAsync();
    if(settings.granted)
    {
      return settings.granted;
    } else {
        const status = await Notifications.requestPermissionsAsync();
        return status.granted;
    }
  }

const NotificationManager = () => {


const scheduleNotificationHandler = async () => {
  try {
    if(await verifyPermissions()){
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Daily Goals Reminder",
        body: "Set your Daily GOALS!",
      },
      trigger: {type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 10 },
    });
    } else {
      Alert.alert("Need Permissions", "To use Notifications go to Settings and allow Notifications!")
    }
  }
  catch (err) {
    console.log(err)
  }
};

return (
    <View style={{justifyContent:'center', alignItems:'center'}}>
      <Button title='Set A Daily Reminder' onPress={scheduleNotificationHandler}/>
    </View>
  )
}

export default NotificationManager;