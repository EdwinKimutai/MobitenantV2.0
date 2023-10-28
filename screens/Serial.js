import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES } from "../constants";
import { Feather } from "@expo/vector-icons";
import { collection, getDoc, doc, addDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { useNavigation } from "@react-navigation/native";

const Serial = ({ route }) => {
  const { Name, Serial } = route.params;
  const navigation = useNavigation();
  const [serial, setSerial] = useState("");
  const [name, setName] = useState([]);
  const [loading, setLoading] = useState(false);
  const Validation = async () => {
    console.log(serial);
    setLoading(true);
    const docRef = doc(db, "Home", serial);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = {
        UserName: Name,
        SerialNo: Serial,
      };
      const collectionRef = collection(db, "Home", serial, "person");
      await addDoc(collectionRef, data);
      setLoading(false);
      return navigation.navigate("Landlord");
    } else {
      // docSnap.data() will be undefined in this case
      alert("no such home");
      setLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView>
      <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <>
              <View style={styles.Texts}>
                <Text style={styles.text1}>Wellcome!</Text>
                <Text style={styles.text2}>Input ID</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: "10%",
                  alignItems: "center",
                }}
              >
                <TextInput
                  style={styles.input}
                  placeholder="SerialNo"
                  value={serial}
                  onChangeText={(text) => setSerial(text)}
                />
                <Pressable style={styles.btn} onPress={Validation}>
                  <Feather name="send" size={24} color="black" />
                </Pressable>
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Serial;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    height: "100%",

    justifyContent: "center",
  },
  input: {
    backgroundColor: COLORS.softGray,
    padding: 10,
    width: "60%",
    alignSelf: "center",
    borderRadius: SIZES.large,
  },
  Texts: {
    backgroundColor: COLORS.blueL,
    marginVertical: "10%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    width: "80%",
    alignSelf: "center",
  },
  text1: {
    fontSize: SIZES.ex_extra_Large,
  },
  text2: {
    fontSize: SIZES.normal,
  },
  wrapper: {
    backgroundColor: COLORS.blueL,
    paddingVertical: 20,
    width: "90%",
    alignSelf: "center",
    borderRadius: SIZES.large,
  },
  btn: {
    backgroundColor: COLORS.white,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40 / 2,
  },
});
