import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES } from "../../../constants";
import { Prof } from "../../../assets";
import { Ionicons } from "@expo/vector-icons";

const EditProfile = () => {
  const Top = () => {
    return (
      <View style={styles.outer}>
        <View>
          <View style={styles.icon}>
            <Ionicons name="image-outline" size={21} color="white" />
          </View>
        </View>

        <View>
          <Image style={styles.container} resizeMode="cover" source={Prof} />
        </View>
      </View>
    );
  };

  const Puts = () => {
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [phoneNo, setPhoneNumber] = useState("");
    const [sub, setSub] = useState(false);
    const [sub2, setSub2] = useState(false);
    const [sub3, setSub3] = useState(false);
    const HandleConferm = () => {
      setEmail("");
      setSub(true);
    };
    const HandleSubmit = () => {
      console.log("successfull");
      setEmail("");
      setSub(false);
    };
    const HandleConferm2 = () => {
      setUserName("");
      setSub2(true);
    };
    const HandleSubmit2 = () => {
      console.log("successfull change username");
      setUserName("");
      setSub2(false);
    };
    const HandleConferm3 = () => {
      setPhoneNumber("");
      setSub3(true);
    };
    const HandleSubmit3 = () => {
      console.log("successfull change phone nuber");
      setPhoneNumber("");
      setSub3(false);
    };

    return (
      <View
        style={{ backgroundColor: COLORS.white, borderRadius: SIZES.large }}
      >
        <View style={styles.each}>
          <TextInput
            placeholder="edwinronyx@gmail.com"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          {sub ? (
            <Button
              style={styles.btn}
              title="Change"
              disabled={email === ""}
              onPress={HandleSubmit}
            />
          ) : (
            <Button
              style={styles.btn}
              title="conferm"
              disabled={email === ""}
              onPress={HandleConferm}
            />
          )}
        </View>

        <View style={styles.each}>
          <TextInput
            placeholder="User Name"
            value={username}
            onChangeText={(text) => setUserName(text)}
          />
          {sub2 ? (
            <Button
              style={styles.btn}
              title="Change"
              disabled={username === ""}
              onPress={HandleSubmit2}
            />
          ) : (
            <Button
              style={styles.btn}
              title="conferm"
              disabled={username === ""}
              onPress={HandleConferm2}
            />
          )}
        </View>
        <View style={styles.each}>
          <TextInput
            placeholder="Phone No"
            value={phoneNo}
            onChangeText={(text) => setPhoneNumber(text)}
          />
          {sub3 ? (
            <Button
              style={styles.btn}
              title="Change"
              disabled={phoneNo === ""}
              onPress={HandleSubmit3}
            />
          ) : (
            <Button
              style={styles.btn}
              title="conferm"
              disabled={phoneNo === ""}
              onPress={HandleConferm3}
            />
          )}
        </View>
      </View>
    );
  };
  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <SafeAreaView>
          <View style={styles.container1}>
            <Top />
          </View>

          <View style={styles.container2}>
            <Text>new changes</Text>
            <Puts />
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;
const styles = StyleSheet.create({
  alartContainer: {
    borderRadius: 30,
    backgroundColor: COLORS.white,
  },
  container1: {
    backgroundColor: COLORS.softGray,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    height: 110,
    width: 110,
    borderRadius: 110 / 2,
    borderWidth: 4,
    borderColor: COLORS.white,
  },
  icon: {
    position: "absolute",
    zIndex: 1,
    top: -10,
    backgroundColor: COLORS.softGray,
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    borderWidth: 5,
    borderColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "70%",
  },
  outer: {
    flexDirection: "column",
    backgroundColor: COLORS.softGray,
  },
  container2: {
    // alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "blue",
    width: "80%",
    alignSelf: "center",
    marginTop: "10%",
    height: "60%",
  },
  each: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    // backgroundColor: COLORS.red,
    // width: "80%",
    // alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: "4%",
    backgroundColor: COLORS.gray,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: SIZES.ex_extra_Large,
  },
  btn: {},
});
