import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { AntDesign } from "@expo/vector-icons";

const Notice = () => {
  const Top = () => {
    return (
      <View style={styles.container1}>
        <View>
          <Text style={styles.text}>Notice Board!</Text>
          <View style={styles.Btext}>
            <Text style={styles.text2}>Message from, </Text>
            <Text style={styles.text2}>Mukisa </Text>
          </View>
        </View>
        <Pressable style={styles.left}>
          <MaterialCommunityIcons
            name="inbox-arrow-down-outline"
            size={18}
            color="black"
          />
          <Text style={{ fontSize: 8 }}>complain</Text>
        </Pressable>
      </View>
    );
  };
  const Midle = () => {
    return (
      <View style={styles.container3}>
        <View style={styles.top}>
          <Text>10/12/2002</Text>
        </View>

        <View style={styles.innerContainer}>
          <View style={styles.con1}>
            <Text style={styles.text1}>About:</Text>
          </View>
          <View style={styles.con2}>
            <Text style={styles.text2}>
              Trash Collection will be Happening tomorrow 6:30,ensure you empty
              your individual house bins thankyou
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.Top}>
          <Top />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.Midle}>
            <Midle />
            <Midle />
            <Midle />
            <Midle />
            <Midle />
            <Midle />
            <Midle />
            <Midle />
            <Midle />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Notice;
const styles = StyleSheet.create({
  container: {
    marginTop: "2%",
  },
  Top: {
    marginTop: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  Midle: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "50%",
  },
  Bottom: {
    backgroundColor: COLORS.white,
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  container1: {
    flexDirection: "row",
    backgroundColor: COLORS.softGray,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: "5%",
    paddingVertical: 4,
  },
  text: {
    fontSize: SIZES.largest,
    fontWeight: "600",
  },
  Btext: {
    flexDirection: "row",
  },
  text2: {
    fontSize: SIZES.large,
  },
  left: {
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "2%",
    borderRadius: 5,
  },
  container3: {
    backgroundColor: COLORS.softGray,
    width: "80%",
    justifyContent: "center",
    paddingVertical: 10,

    marginVertical: 10,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: SIZES.small,
    alignItems: "center",
  },
  innerContainer: {
    justifyContent: "center",
    backgroundColor: COLORS.white,
    borderRadius: SIZES.large,
    marginHorizontal: 3,
  },
  con1: {
    width: "40%",
    marginVertical: SIZES.small,
    alignItems: "center",
  },
  text1: {
    fontSize: SIZES.normal,
  },
  con2: {
    marginVertical: SIZES.medium,
  },
  text2: {
    fontSize: SIZES.large,
    marginHorizontal: 10,
  },
});
