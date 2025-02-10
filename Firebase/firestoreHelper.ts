import { collection, addDoc, doc, deleteDoc, getDocs, getDoc, updateDoc } from "firebase/firestore"; 
import { database } from "./firebaseSetup";

interface goalData {
  text: string;
}

export async function writeToDB(data: goalData, collectionName: string) {
	try {
	     await addDoc(collection(database,collectionName),data);
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
   await updateDoc(docRef,{text:goalData.text,warning:true});
  }
  catch (err) {
    console.log(err)
  }
}