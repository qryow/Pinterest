import { createAsyncThunk } from "@reduxjs/toolkit";
import { FacebookAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, firestore } from "../../../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { NavigateFunction } from "react-router-dom";
import { isUserLogin, logoutFunc } from "../../../helpers/functions";
import { OneUser, IUser } from "../../../types/types";

const provider2 = new FacebookAuthProvider();

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

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({userObj, navigate}: {userObj: IUser, navigate: NavigateFunction}) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, userObj.email, userObj.password);
      const userDoc = {
        uid: user.uid,
        email: userObj.email,
        username: userObj.email?.split("@")[0],
        fullName: userObj.email?.split("@")[0],
        following: [],
        followers: [],
				profilePicURL: user.photoURL || 'https://i.pinimg.com/564x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg',
        bio: '',
        descs: [],
        pins: [],
        createdAt: Date.now(),
      }
      await setDoc(doc(firestore, "users", user.uid), userDoc);
      const docRef = doc(firestore, "users", user.uid);
			const docSnap = await getDoc(docRef);
      const userRes = docSnap.data()
      return { user, userRes, navigate }
    } catch (error) {
      const checkedError = checkError(error);
      throw checkedError;
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({userObj, navigate}: {userObj: IUser, navigate: NavigateFunction}) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, userObj.email, userObj.password);

      const docRef = doc(firestore, "users", user.uid);
			const docSnap = await getDoc(docRef);
      const userRes = docSnap.data()
      return { user, userRes, navigate };
    } catch (error) {
      const checkedError = checkError(error)
      throw checkedError;
    }
  }
)

export const loginWithGoogle = createAsyncThunk(
  'user/loginWithGoogle',
  async ({ navigate, signInWithGoogle }: { navigate: NavigateFunction, signInWithGoogle: any}) => {
    try {
      const {user} = await signInWithGoogle();
      const userRef = doc(firestore, "users", user.uid);
			const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
				//* login
				const userDoc = userSnap.data();
				localStorage.setItem("user-info", JSON.stringify(userDoc));
        return { user, navigate }
      } else {
				//* signup
				const userDoc = {
					uid: user.uid,
					email: user.email,
					username: user.email?.split("@")[0],
          fullName: user.displayName,
          following: [],
          followers: [],
          profilePicURL: user.photoURL || 'https://i.pinimg.com/564x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg',
          bio: '',
          descs: [],
          pins: [],
          createdAt: Date.now(),
				};
				await setDoc(doc(firestore, "users", user.uid), userDoc);
        return { user, navigate }
      }
    } catch (error) {
      console.error(error);
    }
  }
)

export const loginWithFacebook = createAsyncThunk(
  'user/loginWithFaceBook',
  async ({ navigate, signInWithFacebook }: { navigate: NavigateFunction, signInWithFacebook: any }) => {
    try {
      const { user } = await signInWithPopup(auth, provider2)
      const userRef = doc(firestore, "users", user.uid);
			const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
				//* login
				const userDoc = userSnap.data();
				localStorage.setItem("user-info", JSON.stringify(userDoc));
        return { user, navigate }
      } else {
				//* signup
				const userDoc = {
					uid: user.uid,
					email: user.email,
					username: user.email?.split("@")[0],
          fullName: user.displayName,
					followers: [],
					following: [],
					profilePicURL: user.photoURL,
          bio: '',
          descs: [],
          pins: [],
          createdAt: Date.now(),
				};
				await setDoc(doc(firestore, "users", user.uid), userDoc);
        return { user, navigate }
      }
    } catch (error) {
      console.error(error);
      const checkedError = checkError(error);
      throw checkedError
    }
  }
)

export const getOneUser = createAsyncThunk(
  'user/getOneUser',
  async ( { uid }: {uid: string} ) => {
    try {
      const userRef = await getDoc(doc(firestore, "users", uid));
      const user =  userRef.data()
      return { user }
    } catch (error) {
      console.error(error)
    }
  }
)

export const signOut = createAsyncThunk(
  'user/signOut',
  async ({ navigate }: { navigate: any}) => {
    try {
      await auth.signOut();
      console.log('Успешный выход из системы');
      logoutFunc()
      isUserLogin()
      navigate('/') 
    } catch (error) {
      console.error('Ошибка при выходе из системы:', error);
      throw error;
    }
  }
);

interface inputsTypes {
  fullName: string;
	username: string;
	bio: string
}

export const editProfile = createAsyncThunk(
  "user/editProfile",
  async ({ inputs, selectedFile, oneUser, navigate }: { inputs: inputsTypes, selectedFile: any, oneUser: OneUser, navigate: NavigateFunction}) => { 
    console.log(typeof selectedFile)
    try {
      const updatedUser = {
        ...oneUser,
        fullName: inputs.fullName || oneUser.fullName,
        username: inputs.username || oneUser.username,
        bio: inputs.bio || oneUser.bio,
        profilePicURL: selectedFile,
      };
      const userDocRef = doc(firestore, "users", oneUser.uid);
      await updateDoc(userDocRef, updatedUser);
      console.log("Success", "Profile updated successfully", "success");
      return { updatedUser, navigate }
    } catch (error) {
      console.error(error);
    }
  }
);