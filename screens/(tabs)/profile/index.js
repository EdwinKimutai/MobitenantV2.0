import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../../constants";
import { Prof } from "../../../assets";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
const Profile = () => {
  const navigation = useNavigation();

  const HandleOnpress = () => {
    return navigation.navigate("EditProfile");
  };
  const Top = () => {
    return (
      <View>
        <View style={[styles.container1]}>
          <Pressable style={styles.outer} onPress={HandleOnpress}>
            <Image style={styles.image} resizeMode="cover" source={Prof} />
          </Pressable>
          <View style={styles.test}>
            <Text>Edwin Kimutai</Text>
            <Text>leaving in kwetu</Text>
          </View>
        </View>
      </View>
    );
  };
  const Midle = () => {
    const HandleLogout = async () => {
      try {
        const key = "Occupation";
        await AsyncStorage.removeItem(key);
        navigation.navigate("CommonHome");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };
    const HandleSignIn = async () => {
      try {
        const key = "Occupation";
        await AsyncStorage.removeItem(key);
        navigation.navigate("GoingHome");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };
    return (
      <View style={styles.container2}>
        <View style={styles.midBox}>
          <Text style={styles.text3}>YOUR EMAIL</Text>
          <Text style={styles.text4}>edwinronyx@gmail.com</Text>
        </View>
        <View style={styles.midBox}>
          <Text style={styles.text3}>YOUR PASSWORD</Text>
          <Text style={styles.text4}>..............</Text>
        </View>
        <View style={styles.midBox}>
          <Text style={styles.text3}>PHONE NO</Text>
          <Text style={styles.text4}>0706410093</Text>
        </View>
        <View style={styles.midBox}>
          <Text style={styles.text3}>COUNTRY</Text>
          <Text style={styles.text4}>KENYA</Text>
        </View>
        <TouchableOpacity onPress={() => HandleLogout()}>
          <View>
            <MaterialCommunityIcons name="logout" size={20} color="black" />
            <Text>Logout</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => HandleSignIn()}>
          <View>
            <Entypo name="login" size={20} color="black" />
            <Text>Sign in</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.top}>
          <Top />
        </View>

        <View style={styles.Midle}>
          <Midle />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    height: "100%",
    marginTop: "6.5%",
  },
  top: {
    backgroundColor: "#999DA0",
    width: "100%",
    height: "18%",
    justifyContent: "flex-end",
    position: "absolute",
    zIndex: 1,
  },
  Midle: {
    marginTop: "30%",
    backgroundColor: COLORS.white,
    height: "70%",

    justifyContent: "flex-start",
    paddingTop: "6%",
  },
  container1: {
    position: "absolute",
    bottom: 0,
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#999DA0",
    padding: 30,
    width: "80%",
    borderRadius: SIZES.large,
    marginLeft: SIZES.small,
  },
  test: {
    backgroundColor: "#999DA0",
    marginLeft: "50%",
  },
  image: {
    borderRadius: 110 / 2,
    width: 110,
    height: 110,
  },
  outer: {
    position: "absolute",
    bottom: -17,
    zIndex: 1,
    backgroundColor: COLORS.white,
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  midBox: {
    backgroundColor: COLORS.white,
    width: "80%",
    alignSelf: "center",
    height: 90,
    marginVertical: "2%",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 30,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.softGray,
  },
  text3: {
    fontSize: SIZES.small,
  },
  text4: {
    fontSize: SIZES.large,
  },
});
