import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../FirebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        //user is logged in
        const storedAccessToken = await AsyncStorage.getItem("userToken");
        if (storedAccessToken) {
          // Apply the stored access token to Firebase
          await user.getIdToken(true); // Refresh the token
          console.log("Access token applied:", user.uid);
        }
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, []);

  return { user };
};

export default useAuth;

const styles = StyleSheet.create({});
