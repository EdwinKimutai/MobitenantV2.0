import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants";
import { auth } from "../../FirebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Settings = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Update the parameters of the 'Parent' screen
    navigation.setParams({
      param1: "1",
    });
  }, []);
  const HandleBack = () => {
    return navigation.goBack();
  };
  const HandleLogout = async () => {
    setLoading(true);
    try {
      const key = "Occupation";
      await AsyncStorage.removeItem(key);
      navigation.navigate("CommonHome");
    } catch (error) {
      console.error("Error logging out:", error);
    }
    setLoading(false);
  };
  const Top = () => {
    return (
      <>
        <View style={styles.TopContainer}>
          <Pressable onPress={() => HandleBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
          <Pressable style={styles.left} onPress={() => HandleLogout()}>
            <MaterialCommunityIcons name="logout" size={20} color="black" />
            <Text style={styles.logout}>Logout</Text>
          </Pressable>
        </View>
      </>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator style={styles.LogoutAction} />
      ) : (
        <View>
          <Top />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    marginTop: "6%",
  },
  TopContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "3%",
    marginTop: "4%",
  },
  left: {
    alignItems: "center",
    justifyContent: "center",
  },
  logout: {
    fontSize: 10,
  },
  LogoutAction: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    height: "100%",
  },
});
