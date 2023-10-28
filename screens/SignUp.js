import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";

import { Top } from "../components";
import { SIZES, COLORS } from "../constants";

import { auth } from "../FirebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";
const SignUp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const data = {
    Email: email,
    Name: fullname,
  };

  const handleSignUp = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        if (user) {
          navigation.navigate("Tabs");
        } else {
          return null;
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    const userRef = collection(db, "users");
    await setDoc(doc(userRef, auth.currentUser.uid), {
      Id: auth.currentUser.uid,
      ...data,
    });
  };

  // const MyInputs = () => {

  //   return (

  //   );
  // };

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <SafeAreaView>
          <View style={styles.container}>
            <Top text1="Create An Account" text2="Please fill the form below" />
            <View style={styles.inputs}>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="User Name"
                  value={fullname}
                  onChangeText={(text) => setFullname(text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                  secureTextEntry={true}
                  style={styles.input}
                  placeholder="password"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
              </View>
            </View>
            <View>
              <View style={styles.bigContainer}>
                <Pressable style={styles.container1} onPress={handleSignUp}>
                  <Text>Sign Up</Text>
                </Pressable>

                <View style={styles.text}>
                  <Text style={styles.text1}>Have An Account?</Text>
                  <Pressable onPress={() => navigation.navigate("SignIn")}>
                    <Text style={styles.text2}>Sign In</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
const styles = StyleSheet.create({
  container: {
    height: "100%",
    marginTop: 40,
  },
  inputs: {
    justifyContent: "space-around",
    marginTop: "30%",
  },
  bigContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "30%",
  },
  container1: {
    backgroundColor: COLORS.gray,
    width: "80%",
    alignSelf: "center",
    alignItems: "center",
    padding: SIZES.extraLarge,
    borderRadius: SIZES.ex_extra_Large,
    marginTop: "30%",
  },
  text: {
    marginTop: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  text1: {
    fontWeight: "900",
  },
  text2: {},
  input: {
    backgroundColor: COLORS.gray,
    borderRadius: SIZES.ex_extra_Large,
    width: "80%",
    alignSelf: "center",
    padding: SIZES.large,
    marginVertical: SIZES.sooSmall,
  },
});
