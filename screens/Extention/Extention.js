import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState } from "react";

import { COLORS, SIZES } from "../../constants";

const Extention = () => {
  const HandleSubmit = () => {
    setDays("");
    setReasons("");
  };

  const Top = () => {
    return (
      <View style={styles.TopContainer}>
        <Text style={styles.text1}>Requesting An Extention!</Text>
        <Text style={styles.text2}>Please fill out the form bellow</Text>
      </View>
    );
  };
  const Midle = () => {
    const [days, setDays] = useState("");
    const [reasons, setReasons] = useState("");
    return (
      <View style={styles.container2}>
        <View style={styles.txt}>
          <Text style={styles.txt1}>Rem Days:</Text>
          <Text style={styles.txt2}>4</Text>
        </View>
        <TextInput
          value={days}
          style={styles.inputs}
          placeholder="Added days"
          onChangeText={(text) => setDays(text)}
        />
        <TextInput
          style={styles.inputs}
          placeholder="reason"
          value={reasons}
          onChangeText={(text) => setReasons(text)}
        />
        <Pressable style={styles.btn} onPress={HandleSubmit}>
          <View>
            <Text>Submit</Text>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.topG}>
          <View style={styles.container}>
            <Top />
          </View>
          <View style={styles.Midle}>
            <Midle />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Extention;
const styles = StyleSheet.create({
  topG: {
    backgroundColor: COLORS.white,
    height: "100%",
  },
  container: {
    backgroundColor: COLORS.white,
    height: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  TopContainer: {
    backgroundColor: COLORS.white,
    width: "90%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },

  container2: {
    alignItems: "center",
    paddingVertical: 10,
  },
  Midle: {
    marginVertical: "25%",
    marginTop: "6%",
  },

  btn: {
    backgroundColor: COLORS.softGray,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "5%",
    marginTop: "25%",
    borderRadius: 30,
  },
  inputs: {
    backgroundColor: COLORS.gray,
    width: "80%",
    marginVertical: "2%",
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    borderRadius: SIZES.medium,
  },
  text1: {
    fontSize: SIZES.ex_extra_Large,
  },
  txt: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
    alignItems: "center",
    marginBottom: 40,
    backgroundColor: COLORS.softGray,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
});
