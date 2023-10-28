import React from "react";
import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import firebase from "firebase/app"; // Import the Firebase core module

import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../FirebaseConfig";
import { signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogoutScreen = () => {
  const navigation = useNavigation();
  // Function to handle user logout
  const handleLogout = async () => {
    try {
      const key = "Occupation";
      const Name = "Name";
      const logged = "Logged";
      await AsyncStorage.removeItem(key);
      await AsyncStorage.removeItem(Name);
      await AsyncStorage.removeItem(logged);
      await signOut(auth); // Sign the user out
      // You can also navigate the user to a login screen or perform other actions after logout.
      navigation.navigate("SignIn");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Logout Screen</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
};

export default LogoutScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
