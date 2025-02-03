import { collection, addDoc, doc, deleteDoc, getDocs } from "firebase/firestore"; 
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