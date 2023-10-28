import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants";

//import { profile, Logo } from "../../assets";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Logo } from "../../assets";
import { useNavigation } from "@react-navigation/native";
import Nav from "../../hooks/Navigation";

const Top = (params) => {
  const { Title, Change } = params;
  const navigation = useNavigation();
  const GoBackHome = () => {
    Change(true);
    return navigation.navigate("CommonHome");
  };
  const Navigation = (wapi) => {
    if (wapi === "1") {
      return navigation.navigate("CommonHome");
    } else if (wapi === "2") {
      return navigation.navigate("Profile");
    }
  };
  const { Where } = Nav();
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          GoBackHome();
        }}
      >
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 50 / 2,

            borderWidth: 4,
            borderColor: COLORS.gray,
          }}
          resizeMode="cover"
          source={Logo}
        />
      </Pressable>

      <Text style={styles.text1}>Hi,{Title}</Text>

      <Pressable
        onPress={() => {
          Navigation("2");
        }}
      >
        <MaterialCommunityIcons
          name="account-circle-outline"
          size={18}
          color="black"
        />
        <Text style={{ fontSize: 8 }}>profile</Text>
      </Pressable>
    </View>
  );
};

export default Top;
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.softGray,
    width: "100%",
    height: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",

    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginTop: "0%",
  },
  text1: {
    flex: 1,
    marginLeft: "2%",
    fontSize: SIZES.large,
    fontWeight: "500",
  },
  left: {
    backgroundColor: COLORS.white,
    padding: 2,
    alignItems: "center",
    paddingHorizontal: "2%",
    borderRadius: 10,
  },
});
