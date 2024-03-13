import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { firestore, storage } from "../../../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NavigateFunction } from "react-router-dom";
import { getRandomIndexes } from "../../../helpers/functions";
import { IPin } from "../../../types/types";

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

interface pinInputs {
  name: string;
  bio: string;
  tags: string[];
}

export const createPin = createAsyncThunk(
  'pins/createPin',
  async ({ inputs, selectedFile, descId, userId, navigate }: { inputs: pinInputs, selectedFile: string, descId: string, userId: string, navigate: NavigateFunction }) => {
    const newPin = {
      name: inputs.name,
      bio: inputs.bio,
      author: userId,
      createdAt: Date.now(),
      tags: inputs.tags,
      comments: [],
    }

    try {
      const pinDocRef = await addDoc(collection(firestore, "pins"), newPin)
      const userDocRef = doc(firestore, "users", userId);
      //const descDocRef = doc(firestore, "descs", descId);

      const imageRef = ref(storage, `pins/${pinDocRef.id}`);
      await uploadString(imageRef, selectedFile, "data_url");
			const downloadURL = await getDownloadURL(imageRef);
      
      await updateDoc(pinDocRef, { id: pinDocRef.id });
      await updateDoc(pinDocRef, { img: downloadURL });
      
      const pinRef = await getDoc(doc(firestore, "pins", pinDocRef.id))

      await updateDoc(userDocRef, { pins: arrayUnion(pinDocRef.id) });
      //await updateDoc(descDocRef, { pins: arrayUnion(pinRef.data()) });
      
      return { navigate }
    } catch (error) {
      console.error(error)
      const checkedError =  checkError(error)
      throw checkedError;
    }
  }
);

export const getRandomedPins = createAsyncThunk(
  'pins/getRandomedPins',
  async () => {
    try {
      const pinsQuerySnapshot = await getDocs(collection(firestore, 'pins'));
      const pins = pinsQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const randomIndexes = getRandomIndexes(pins.length, pins.length);

      const randomPins = randomIndexes.map(index => pins[index]);

      return { randomPins };
    } catch(error) {
      console.error(error)
      const checkedError =  checkError(error)
      throw checkedError;
    }
  }
)


export const getOwnPins = createAsyncThunk(
  'pins/getOwnPins',
  async (uid: string) => {
    try {
      const q = query(collection(firestore, "pins"), where("author", "==", uid));
      const querySnapshot = await getDocs(q);
      const pins: IPin[] = [];
      querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log(data);
          pins.push({
              id: doc.id,
              name: data.name || '',
              bio: data.bio || '',
              author: data.author || '',
              createdAt: data.createdAt || 0,
              img: data.img || '',
              tags: data.tags || [],
              comments: data.comments || [],
          });
      });

      pins.sort((a, b) => a.createdAt - b.createdAt);
      console.log(pins)
      return { pins };
    } catch(error) {
      console.error(error)
      const checkedError =  checkError(error)
      throw checkedError;
    }
  }
)

export const getPinById = createAsyncThunk(
  'pins/getPinById',
  async (id: string) => {
    console.log(id)
    try {
      const descRef = await getDoc(doc(firestore, "pins", id));
      const descRes = descRef.data()
      return { descRes }
    } catch(error) {
      const checkedError =  checkError(error)
      throw checkedError;
    }
  }
)

export const addToDesc = createAsyncThunk(
  'pins/addToDesc',
  async ({ pinId, descId, userId }: { pinId: any, descId: any, userId: any }) => {
    try {
      const pinRef = await getDoc(doc(firestore, "pins", pinId));
      const pinRes = pinRef.data()
      console.log(pinRes)

      const descDocRef = doc(firestore, "descs", descId);
      const userDocRef = doc(firestore, "users", userId);

      await updateDoc(descDocRef, { pins: arrayUnion(pinRes) });
      await updateDoc(userDocRef, { pins: arrayUnion(pinRef.id) });
    } catch(error) {
      console.error(error)
      const checkedError =  checkError(error)
      throw checkedError;
    }
  }
)

export const addComent = createAsyncThunk(
  'pins/addComent',
  async ({ pinId, userId, input }: { pinId: string, userId: string, input: any }) => {
    const newComment = {
      name: input,
      author: userId,
      createdAt: Date.now()
    }
    try {
      const pinDocRef = doc(firestore, "pins", pinId);
      const userDocRef = doc(firestore, "users", userId);
      //const descDocRef = doc(firestore, "descs", descId);
      await updateDoc(pinDocRef, { comments: arrayUnion(newComment) });
      
      const pinRef = await getDoc(doc(firestore, "pins", pinId));
      const pinRes = pinRef.data()
      await updateDoc(userDocRef, { pins: arrayUnion(pinRef.data()) });
      //await updateDoc(descDocRef, { pins: arrayUnion(pinRef.data()) });
      return { pinRes }
    } catch(error) {
      console.error(error)
      const checkedError =  checkError(error)
      throw checkedError;
    }
  }
)