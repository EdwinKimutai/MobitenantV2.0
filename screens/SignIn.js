import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SIZES, COLORS } from "../constants";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FirebaseConfig";
import { useNavigation } from "@react-navigation/native";
const SignIn = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const HandleSignIn = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in

        const user = userCredential.user;

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  const Top = (props) => {
    return (
      <View style={styles.container2}>
        <Text style={styles.text1}>{props.text1}</Text>
        <Text style={styles.text2}>{props.text2}</Text>
      </View>
    );
  };
  const Bottom = () => {
    return (
      <View style={styles.bigContainer}>
        <View style={styles.container3}>
          <Pressable onPress={HandleSignIn}>
            <Text>Sign In</Text>
          </Pressable>
        </View>
        <View style={styles.txt}>
          <Text style={styles.txt1}>Dont have an account</Text>
          <Pressable onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.txt2}>Sign up</Text>
          </Pressable>
        </View>
      </View>
    );
  };
  // const InputsField = () => {

  //   return (

  //   );
  // };

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View>
          <View style={styles.container}>
            <Top
              text1="Wellcome Back!"
              text2="Please Sign in to your account"
            />
            <View style={styles.inputs}>
              <View>
                <TextInput
                  value={email}
                  style={styles.input4}
                  placeholder="Email"
                  onChangeText={(text) => setEmail(text)}
                />

                <TextInput
                  value={password}
                  style={styles.input4}
                  placeholder="password"
                  onChangeText={(text) => setPassword(text)}
                />
              </View>
            </View>
            <View>
              <Bottom />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
const styles = StyleSheet.create({
  container: {
    height: "100%",
    marginTop: 40,
  },
  inputs: {
    justifyContent: "space-around",
    marginTop: "30%",
  },
  container2: {
    width: "100%",

    justifyContent: "center",
    alignItems: "center",
  },
  text1: {
    fontSize: SIZES.ex_extra_Large,
    paddingTop: SIZES.large,
  },
  text2: {
    fontSize: SIZES.normal,
  },
  bigContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  container3: {
    backgroundColor: COLORS.gray,
    width: "80%",
    alignSelf: "center",
    alignItems: "center",
    padding: SIZES.extraLarge,
    borderRadius: SIZES.ex_extra_Large,
    marginTop: "80%",
  },
  txt: {
    marginTop: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  txt1: {
    fontWeight: "900",
  },
  txt2: {},
  input4: {
    backgroundColor: COLORS.gray,
    borderRadius: SIZES.ex_extra_Large,
    width: "80%",
    alignSelf: "center",
    padding: SIZES.large,
    marginVertical: SIZES.sooSmall,
  },
});
