import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth , getReactNativePersistence} from 'firebase/auth'
import { getStorage } from "firebase/storage";


//Your web app's Firebase configuration. 
//Copy this object from Firebase console
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  };

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const database = getFirestore(app);

export const storage = getStorage(app);
