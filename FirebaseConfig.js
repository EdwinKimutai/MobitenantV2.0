import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDvqUnN_iJxFz_uC1D8uyM1MbaZgXPPBFU",
  authDomain: "mobitenant2.firebaseapp.com",
  projectId: "mobitenant2",
  storageBucket: "mobitenant2.appspot.com",
  messagingSenderId: "941462835055",
  appId: "1:941462835055:web:c9a0768650a2d87968a29a",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
