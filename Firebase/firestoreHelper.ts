import { collection, addDoc, doc, deleteDoc, getDocs, getDoc, updateDoc, setDoc } from "firebase/firestore"; 
import { auth, database } from "./firebaseSetup";
import { LatLng } from "react-native-maps";

interface goalData {
  text: string;
  warning?: boolean;
  imageUri?: string;
  owner?: string;
}

interface Geo {
  lat: number;
  lng: number;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export async function writeToDB(data: goalData|User, collectionName: string) {
	try {
	     await addDoc(collection(database,collectionName),{...data, owner: auth.currentUser?.uid});
	  }
	catch (err) {
	    console.log(err)
	  }
	}

export async function deleteFromDB(id: string, collectionName: string) {
  try { 
    await deleteDoc(doc(database,collectionName,id))
  }
  catch (err) {
    console.log(err)
  }
}

export async function deleteAllFromDB(collectionName:string) {
    try { 
     const querySnapshot = await getDocs(collection(database,collectionName))
     querySnapshot.forEach((document)=>{
       deleteDoc(doc(database,collectionName,document.id))
     });
  
    }
    catch (err) {
      console.log(err)
    }
  }

export async function readDocFromDB(id: string, collectionName: string) {
  try { 
    const goal = await getDoc(doc(database,collectionName,id))
    if(goal.exists()){
    return goal;
    }else{
      return null;
    }
  }
  catch (err) {
    console.log(err)
  }
}

export async function updateDB(id: string, collectionName: string, goalData:goalData) {
  try { 
    const docRef = doc(database,collectionName,id);
    await setDoc(docRef,goalData);
  }
  catch (err) {
    console.log(err)
  }
}


export async function getCollectionFromDB(collectionName: string) {
  try { 
    const querySnapshot = await getDocs(collection(database,collectionName))
    if(!querySnapshot.empty){
      var Data : any[] = []
      querySnapshot.docs.forEach((value)=>Data.push(value.data()))
    return Data;
    }else{
      return null;
    }
  }
  catch (err) {
    console.log(err)
  }
}

export async function setUserLocation(collectionName:string, id:string, location:LatLng){
  try { 
  const docRef = doc(database,collectionName,id);
  await setDoc(docRef,location,{merge:true});
  }
  catch (err) {
    console.log(err)
  }
}

export async function getUserLocation(collectionName:string, id:string){
  try { 
    const docRef = doc(database,collectionName,id);
    const UserDoc = await getDoc(docRef);
    if(UserDoc.exists()){
    return UserDoc.data();
    }else{
      return null;
    }
  }
  catch (err) {
    console.log(err)
  }
}