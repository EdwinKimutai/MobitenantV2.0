import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../constants";
import Validation from "../../hooks/validation";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUpTennant = ({ navigation }) => {
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const key = "Home";
      const data = await AsyncStorage.getItem(key);
      setHome(data);
    } catch (error) {
      return console.log("problem occured");
    }
  };
  const [name, setName] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [home, setHome] = useState("");
  const [displayPopup, setPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [messageToDisplay, setMessageToDisplay] = useState(false);

  const { newTenant } = Validation();
  const HandleSubmitt = async () => {
    setLoading(true);

    await newTenant(name, houseNo, home).then((message) => {
      setMessage(message);
      setLoading(false);
      setMessageToDisplay(true);
    });
    setHouseNo("");
    setName("");
  };
  const HandlePopDetails = (buttonType) => {
    if (buttonType === "Name") {
      setPopup(true);
      return;
    }
  };

  const Popup = ({ popTitle }) => {
    const [name, setName] = useState("");
    const titleToDisplay = (TT) => {
      if (TT === 1) {
        return "NAME";
      } else {
        return "SerialNo";
      }
    };
    const TitleOpPop = titleToDisplay(popTitle);
    return (
      <View style={styles.popupContainer}>
        <Text style={styles.popupTitle}>{TitleOpPop}</Text>
        <View style={styles.popupInput}>
          <TextInput
            value={name}
            style={styles.popupInputStyle}
            placeholder="Name"
            onChangeText={(value) => setName(value)}
          />
        </View>
        <View style={styles.popupButton}>
          <Pressable onPress={() => setPopup(false)}>
            <Text>Done</Text>
          </Pressable>
          <Pressable>
            <Text>Details</Text>
          </Pressable>
        </View>
      </View>
    );
  };
  return (
    <KeyboardAvoidingView>
      <SafeAreaView style={styles.container}>
        {messageToDisplay && (
          <>
            <View>
              <Text>{message}</Text>
              <Pressable onPress={() => navigation.goBack()}>
                <Text>okay</Text>
              </Pressable>
            </View>
          </>
        )}
        <View>
          <TextInput
            value={name}
            style={styles.popupInputStyle}
            placeholder="Name"
            onChangeText={(value) => setName(value)}
          />
          <TextInput
            value={houseNo}
            style={styles.popupInputStyle}
            placeholder="house no"
            onChangeText={(value) => setHouseNo(value)}
          />
          <TextInput
            value={home}
            style={styles.popupInputStyle}
            placeholder="home"
            onChangeText={(value) => setHome(value)}
          />
        </View>
        <TouchableOpacity onPress={() => HandleSubmitt()}>
          <Text>sbmit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignUpTennant;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    marginBottom: "auto",
    backgroundColor: COLORS.blueL,
    width: "60%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
    borderRadius: 20,
  },
  Input: {
    backgroundColor: COLORS.softGray,
    marginVertical: 10,
    padding: "2%",
    width: "80%",
    alignSelf: "center",
    borderRadius: 10,
  },
  inputContainer: {
    backgroundColor: COLORS.softGray,
    width: "90%",
    alignSelf: "center",
    height: 350,
    borderRadius: 10,
    justifyContent: "center",
  },
  TopText: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: "5%",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    paddingHorizontal: "10%",
    paddingVertical: "4%",
  },
  Name: {
    backgroundColor: COLORS.softGray,
    height: 50,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  houseNo: {
    backgroundColor: COLORS.softGray,
    height: 50,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  popupContainer: {
    backgroundColor: COLORS.white,
    width: "95%",
    alignSelf: "center",
    height: "60%",
    padding: "10%",
    borderRadius: 10,
    position: "absolute",
    zIndex: 100,
  },
  popupButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: "2%",
    paddingHorizontal: "3%",
    marginTop: "10%",
  },
  popupInput: {
    backgroundColor: COLORS.white,
    paddingVertical: "4%",
    alignItems: "center",
    justifyContent: "center",
    width: "98%",
    alignSelf: "center",
    marginVertical: "4%",
  },
  popupTitle: {
    alignSelf: "center",
    marginTop: -10,
  },
  popupInputStyle: {
    backgroundColor: COLORS.red,
    padding: "4%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
