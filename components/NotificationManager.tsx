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
        title: "Reminder",
        body: "This is your scheduled notification.",
      },
      trigger: {type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 10, repeats: false },
    });
    }
  }
  catch (err) {
    console.log(err)
  }
};

return (
    <View style={{justifyContent:'center', alignItems:'center'}}>
      <Button title='Set A Reminder' onPress={scheduleNotificationHandler}/>
    </View>
  )
}

export default NotificationManager;