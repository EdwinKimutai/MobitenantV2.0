import {
  View,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES } from "../constants";

import {
  collection,
  addDoc,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../FirebaseConfig";
import DropdownComponent from "../components/DropdownComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { auth } from "../FirebaseConfig";
import Validation from "../hooks/validation";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignInHome = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setData();
    fetchData();
  }, []);

  const [user, setUser] = useState([]);
  const [backHome, setbackHome] = useState(true);
  const setData = async () => {
    try {
      const key = "Logged";
      const data = await AsyncStorage.setItem(key, "checked");
    } catch (error) {
      console.log("error occured", error.message);
    }
  };
  const fetchData = async () => {
    try {
      const key = "Logged";
      const data = await AsyncStorage.getItem(key);
      if (data !== null) {
        setbackHome(false);
      } else {
        setbackHome(false);
      }
    } catch (error) {
      console.log(`this Happened ${error.message}`);
    }
  };

  /* top component */
  const Top = () => {
    return (
      <View style={styles.container1}>
        <Text style={styles.text1}>Going Home!</Text>
        <Text style={styles.text2}>Fill in the form bellow</Text>
      </View>
    );
  };
  /* end of top component */

  const Midle = (props) => {
    const [home, setHome] = useState("");
    const [serialNo, setSerialNo] = useState("");
    const [userName, setUserName] = useState("");
    const [occupation, setOccupation] = useState("");
    const [loading, setLoading] = useState(true);
    const { HandleHome, HandleRouting } = Validation();
    const [message, setMessage] = useState("");
    const [displayMesssage, setMessageDisplay] = useState(false);

    useEffect(() => {
      HandleLoading();
      setSerialNo("");
      setUserName("");
      setHome("");
      setOccupation("");
    }, []);
    const HandleLoading = () => {
      HandleHome().then((value) => {
        if (value === false) {
          return setTimeout(() => {
            setLoading(false);
          }, 1000);
        } else {
          setLoading(true);
        }
      });
    };

    const HandleRoutingData = {
      Occupation: occupation,
      Home: home,
      Name: userName,
      HouseNo: serialNo,
    };
    const LandlordData = {
      Name: userName,
      Home: home,
      Serial: serialNo,
      Occupation: occupation,
      Id: auth.currentUser.uid,
    };
    const TenantData = {
      Name: userName,
      Id: auth.currentUser.uid,
    };

    const storeName = async () => {
      try {
        const key = "Home";
        const data = await AsyncStorage.setItem(key, home);
      } catch (error) {
        return console.log(error.message);
      }
    };

    const routs = async () => {
      setLoading(true);
      storeName();
      return await HandleRouting(
        HandleRoutingData,
        LandlordData,
        TenantData
      ).then((message) => {
        setLoading(false);
        setMessageDisplay(true);
        setMessage(message);
      });
    };
    const HandleRemoveError = () => {
      setMessageDisplay(false);
      setMessage("");
      return navigation.navigate("CommonHome");
    };
    return (
      <View style={styles.container2}>
        {loading && (
          <>
            <View style={styles.indicator}>
              <ActivityIndicator />
            </View>
          </>
        )}
        {displayMesssage && (
          <>
            <View style={styles.errorMessageContainer}>
              <View style={styles.errorMessageText}>
                <Text>{message}</Text>
              </View>
              <TouchableOpacity
                style={styles.errorMessageBtn}
                onPress={() => HandleRemoveError()}
              >
                <Text>OK</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        <View style={styles.flex}>
          <View style={styles.dropdown}>
            <DropdownComponent setNewValue={(Value) => setOccupation(Value)} />
          </View>
        </View>
        <View style={styles.userName}>
          <Text>user name</Text>
          <TextInput
            style={styles.inp}
            placeholder="username"
            value={userName}
            onChangeText={(text) => setUserName(text)}
          />
        </View>
        <View style={styles.last}>
          <View style={styles.bottom}>
            <Text>Home</Text>
            <TextInput
              style={styles.inpu}
              placeholder="Home"
              value={home}
              onChangeText={(text) => setHome(text)}
            />
          </View>
          <View style={styles.bottom}>
            <Text>Serial No</Text>

            <TextInput
              style={styles.inpu}
              placeholder="Serial "
              value={serialNo}
              onChangeText={(text) => setSerialNo(text)}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.btn} onPress={() => routs()}>
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <KeyboardAvoidingView>
      <SafeAreaView>
        {backHome ? (
          <ActivityIndicator />
        ) : (
          <ScrollView
            style={styles.MainContainer}
            showsVerticalScrollIndicator={false}
          >
            <View>
              <View>
                <Top />
              </View>
              <View style={styles.mid}>
                <Midle statusLoad={(stat) => setLoading(stat)} />
              </View>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignInHome;
const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: COLORS.white,
    marginTop: "9%",
    height: "100%",
  },
  container1: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "10%",
  },
  container2: {
    backgroundColor: COLORS.softGray,
    borderRadius: SIZES.large,
    width: "99%",
    alignSelf: "center",
    marginBottom: "20%",
  },
  text1: {
    fontSize: SIZES.largest,
  },
  text2: {},
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: "5%",
    marginVertical: "5%",
    borderRadius: 15,
  },
  in: {
    backgroundColor: COLORS.softGray,
    width: 130,
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  userName: {
    backgroundColor: COLORS.white,
    width: "90%",
    alignSelf: "center",
    paddingVertical: "4%",
    paddingHorizontal: 10,
    flex: 1,
    borderRadius: 15,
  },
  inp: {
    backgroundColor: COLORS.softGray,
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  last: {
    backgroundColor: COLORS.white,
    marginVertical: "5%",
    width: "90%",
    alignSelf: "center",
    paddingVertical: "4%",
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 15,
  },
  inpu: {
    backgroundColor: COLORS.softGray,
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  btn: {
    width: "80%",
    borderRadius: SIZES.small,
    backgroundColor: COLORS.blueS,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginBottom: "10%",
  },
  dropdown: {
    width: "100%",
  },
  bottom: {
    width: "45%",
  },
  loadingActivity: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.gray,
  },
  errorMessageContainer: {
    backgroundColor: COLORS.blueL,
    padding: 10,
    flexDirection: "column",
    alignSelf: "center",
    borderRadius: 10,
    position: "absolute",
    zIndex: 1,
    width: "80%",
    top: "30%",
  },
  errorMessageText: {
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",

    padding: 10,
    borderRadius: 10,
    marginVertical: "2%",
  },
  errorMessageBtn: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    padding: 2,
    borderRadius: 10,
    marginVertical: "1%",
  },
  indicator: {
    position: "absolute",
    zIndex: 2,
    alignSelf: "center",
    top: "30%",
  },
});
