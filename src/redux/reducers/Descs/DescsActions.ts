import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { NavigateFunction } from "react-router-dom";
import { firestore } from "../../../firebase";
import { IDesc } from "../../../types/types";

const checkError = (error: any) => {
  console.log(error.code)
  switch (error.code) {
    case "auth/email-already-in-use":
      console.log('email in use')
      break;
    case "auth/invalid-email":
      console.log('incorrect email')
      break;
    case "auth/weak-password":
      console.log('password jok')
      break;
    default:
      console.log('netu oshibok')
      break;
  }
}

interface descParams {
  descName: string
}

export const createDesc = createAsyncThunk(
  'desc/createDesc',
  async ({ descObj, uid }: { descObj: descParams; uid: string }) => {
    const descDoc = {
      name: descObj.descName,
      bio: '',
      descPic: null,
      author: uid,
      createdAt: Date.now(),
      pins: [],
    }
    try {
      const descDocRef = await addDoc(collection(firestore, "descs"), descDoc);
      const useDocRef = doc(firestore, "users", uid);
      await updateDoc(useDocRef, { descs: arrayUnion(descDocRef.id) });
      const descQ = await getDocs(collection(firestore, 'descs'));
      const descs: IDesc[] = [];
      descQ.forEach((doc) => {
          const data = doc.data();
          console.log(data);
          descs.push({
              id: doc.id,
              name: data.name || '',
              bio: data.bio || '',
              author: data.author || '',
              descPic: data.descPic || '',
              createdAt: data.createdAt || 0,
              pins: data.pins || []
          });
      });

      descs.sort((a, b) => a.createdAt - b.createdAt);
      return { descs }
    } catch (error) {
      const checkedError = checkError(error)
      throw checkedError;
    }
  }
);

export const getOwnDescs = createAsyncThunk(
  'desc/getOwnDescs',
  async (uid: string) => {
    try {
      const q = query(collection(firestore, "descs"), where("author", "==", uid));
      const querySnapshot = await getDocs(q);
      const descs: IDesc[] = [];
      querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log(data);
          descs.push({
              id: doc.id,
              name: data.name || '',
              bio: data.bio || '',
              author: data.author || '',
              descPic: data.descPic || '',
              createdAt: data.createdAt || 0,
              pins: data.pins || []
          });
      });

      descs.sort((a, b) => a.createdAt - b.createdAt);
      console.log(descs)
      return { descs };
    } catch(error) {
      console.error(error)
      const checkedError =  checkError(error)
      throw checkedError;
    }
  }
)

export const getOneDesc = createAsyncThunk(
  'desc/getOneDesc',
  async ({ id }: { id: any }) => {
    try {
      //const q = query(collection(firestore, "descs", id));
      const descRef = await getDoc(doc(firestore, "descs", id));
      const descRes = descRef.data()
      //const querySnapshot = await getDocs(q);
      //let userDoc;
      //querySnapshot.forEach((doc) => {
      //  userDoc = doc.data();
      //});
      //console.log(userDoc)

      return { descRes }
    } catch(error) {
      const checkedError =  checkError(error)
      throw checkedError;
    }
  }
)

