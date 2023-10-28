import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";

import { COLORS, SIZES } from "../../constants";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Landlord } from "../../assets";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
const Complains = () => {
  const Top = () => {
    return (
      <View style={styles.top}>
        <Pressable>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </Pressable>
        <Text style={{ fontSize: SIZES.ex_extra_Large }}>top</Text>
        <View>
          <Image
            style={{ width: 30, height: 30 }}
            resizeMode="cover"
            source={Landlord}
          />
        </View>
      </View>
    );
  };
  const Mid = () => {
    const [texts, setText] = useState([]);
    useEffect(() => {
      const todoRef = collection(db, "Text");
      const getText = onSnapshot(todoRef, {
        next: (snapshot) => {
          console.log("UPDATED");
          const text = [];
          snapshot.docs.forEach((doc) => {
            text.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setText(text);
        },
      });
      return () => getText();
    }, []);
    return (
      <View>
        <View style={styles.mes}>
          <Text>map</Text>
          {texts.map((text) => {
            <Text key={text.id}>{text.Text}</Text>;
          })}
        </View>
      </View>
    );
  };
  const Bottom = () => {
    const [text, setText] = useState("");
    const HandleSubmit = async () => {
      try {
        const docRef = await addDoc(collection(db, "Text"), {
          Text: text,
        });
        console.log("Document written with ID: ", docRef.id);
        setText("");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };
    return (
      <View style={styles.bottomA}>
        <View>
          <Feather name="camera" size={24} color="black" />
        </View>
        <View style={{ backgroundColor: COLORS.gray, width: "70%" }}>
          <TextInput
            style={{
              backgroundColor: COLORS.white,

              paddingHorizontal: 10,
            }}
            placeholder="Complain"
            value={text}
            onChangeText={(text) => setText(text)}
          />
        </View>
        <Pressable onPress={HandleSubmit}>
          <View style={styles.send}>
            <Feather name="send" size={22} color="black" />
          </View>
        </Pressable>
      </View>
    );
  };
  return (
    <KeyboardAvoidingView>
      <SafeAreaView>
        <View
          style={{
            backgroundColor: COLORS.white,
            height: "100%",

            paddingTop: "6%",
          }}
        >
          <View style={styles.container2}>
            <Top />
          </View>
          <ScrollView>
            <View style={styles.container3}>
              <Mid />
            </View>
          </ScrollView>
          <View style={styles.container}>
            <Bottom />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Complains;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.softGray,
    width: "100%",

    width: "100%",
    paddingVertical: 6,
    borderRadius: SIZES.small,
    marginTop: "auto",
  },
  container2: {
    backgroundColor: COLORS.softGray,
    width: "100%",

    height: "8%",
    justifyContent: "center",
  },
  container3: {
    backgroundColor: COLORS.red,
    justifyContent: "center",
    alignItems: "center",

    width: "70%",
    alignSelf: "center",
  },
  bottomA: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "4%",
  },
  send: {
    backgroundColor: COLORS.white,
    height: 28,
    width: 28,
    borderRadius: 28 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  mes: {
    backgroundColor: COLORS.gray,
    width: "auto",
    paddingHorizontal: "2%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "3%",
    borderRadius: 30,
    marginVertical: 10,
  },
  top: {
    backgroundColor: COLORS.softGray,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "2%",
    paddingVertical: "4%",
  },
});
