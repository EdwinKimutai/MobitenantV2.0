import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Pressable,
} from "react-native";
import React from "react";
import { Logo, Prof } from "../../assets";
import { COLORS } from "../../constants";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const Tenants = () => {
  const Top = () => {
    return (
      <>
        <View style={styles.profileWrapper}>
          <Image style={styles.image} source={Prof} resizeMode="cover" />
        </View>
        <View style={styles.topBottomWrapper}>
          <Pressable style={styles.iconButtons}>
            <AntDesign name="message1" size={24} color="black" />
          </Pressable>
          <Pressable style={styles.iconButtons}>
            <AntDesign name="phone" size={24} color="black" />
          </Pressable>
        </View>
      </>
    );
  };
  const Midle = () => {
    return (
      <>
        <View style={styles.midleContainer}>
          <Text>midle</Text>
        </View>
      </>
    );
  };
  const Bottom = () => {
    return (
      <>
        <View style={styles.bottomContainer}>
          <View style={styles.LeftIconWrapper}>
            <Pressable style={[styles.logout, styles.lowerIcons]}>
              <AntDesign name="logout" size={24} color="black" />
            </Pressable>
            <Text>Logout</Text>
          </View>
          <View style={styles.rightIconWrapper}>
            <Pressable style={[styles.removeUser, styles.lowerIcons]}>
              <Entypo name="remove-user" size={24} color="black" />
            </Pressable>
            <Text>Remove</Text>
          </View>
        </View>
      </>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.imageWrapper}>
          <Top />
        </View>
        <View style={styles.midleWrapper}>
          <Midle />
        </View>
        <View style={styles.bottomWrapper}>
          <Bottom />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Tenants;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    height: "99%",
  },
  imageWrapper: {
    justifyContent: "center",
    marginTop: "0%",
    borderBottomWidth: 2,
    borderBottomColor: COLORS.softGray,
    paddingBottom: "1%",
    height: "20%",
  },
  profileWrapper: {
    alignItems: "center",
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 90 / 2,
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.softGray,
  },
  topBottomWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "1%",
    width: "30%",
    alignSelf: "center",
  },
  midleWrapper: {
    backgroundColor: COLORS.white,
    height: "60%",
  },
  bottomWrapper: {
    backgroundColor: COLORS.white,
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    alignSelf: "center",
    alignItems: "center",
  },
  lowerIcons: {
    backgroundColor: COLORS.softGray,
    height: 55,
    width: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 55 / 2,
  },
  LeftIconWrapper: {
    alignItems: "center",
  },
  rightIconWrapper: {
    alignItems: "center",
  },
});
