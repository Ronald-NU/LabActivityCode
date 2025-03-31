import * as Notifications from "expo-notifications";
import { Button, View } from "react-native";

export  const verifyPermissions = async () => {
    const settings = await Notifications.getPermissionsAsync();
    settings.granted
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