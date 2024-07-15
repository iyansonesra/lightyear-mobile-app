// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore , collection} from "firebase/firestore";
import {getReactNativePersistence, initializeAuth} from 'firebase/auth/react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";




// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcQxp6cQJlEDpXRKH4552YTeOt2RTkZEM",
  authDomain: "lightyear-app-login.firebaseapp.com",
  projectId: "lightyear-app-login",
  storageBucket: "lightyear-app-login.appspot.com",
  messagingSenderId: "319238927043",
  appId: "1:319238927043:web:4e775bf078486843e5a876",
  measurementId: "G-GN3X0164YV"
};

let app, auth;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    console.log("Error initializing app: " + error);
  }
} else {
  app = getApp();
  auth = getAuth(app);
}

export {app, auth};

export const db = getFirestore(app);

export const usersRef = collection(db, 'users');
export const storage = getStorage(app);

export const roomRef = collection(db, 'rooms');