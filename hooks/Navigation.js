import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Nav = () => {
  const navigation = useNavigation();
  const Where = (wapi) => {
    if (wapi === 1) {
      return navigation.navigate("SignUp");
    } else if (wapi === 2) {
      return navigation.navigate("SignIn");
    } else if (wapi === 3 || 3.0) {
      return navigation.navigate("CommonHome");
    } else if (wapi === 4 || 4.0) {
      return navigation.navigate("SignInHome");
    } else if (wapi === 1.1) {
      return navigation.navigate("Tabs");
    } else if (wapi === 1.2) {
      return navigation.navigate("Payment");
    } else if (wapi === 1.3) {
      return navigation.navigate("Notice");
    } else if (wapi === 1.4) {
      return navigation.navigate("Profile");
    } else if (wapi === 1.5) {
      return navigation.navigate("EditProfile");
    } else if (wapi === 1.6) {
      return navigation.navigate("Extention");
    } else if (wapi === 1.7) {
      return navigation.navigate("Complains");
    } else if (wapi === 2.1) {
      return navigation.navigate("Landlord");
    }
  };
  return { Where };
};

export default Nav;

const styles = StyleSheet.create({});
