import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Prof } from "../../assets";
import { Logo } from "../../assets";

import { SIZES, COLORS } from "../../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { db } from "../../FirebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Validation from "../../hooks/validation";

const Home = ({ route }) => {
  const navigation = useNavigation();
  const [home, sethome] = useState("");
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [displayMessage, setDisplayMessage] = useState(false);
  const { getTenants } = Validation();
  // const { param1 } = route.params;
  useEffect(() => {
    // // Disable back gesture for this screen
    // navigation.setOptions({
    //   gestureEnabled: false,
    // });

    // const unsubscribe = navigation.addListener("beforeRemove", (e) => {
    //   // Prevent the screen from being removed
    //   e.preventDefault();
    // });
    storeData();
    displayHome();
    // const fetchData = async () => {
    //   const docRef = collection(db, "Home");
    //   const querySnapshot = await getDocs(docRef);
    //   const newData = [];

    //   querySnapshot.forEach((doc) => {
    //     // Map document data to your desired format
    //     data.push({
    //       ...doc.data(),
    //       id: doc.id,
    //     });
    //   });

    //   // Update the component state with the fetched data
    // };
    // fetchData();

    // Clean up the listener when the component is unmounted
    // return () => {
    //   unsubscribe();
    // };
    fetchingTenants();
  }, []);

  const storeData = async () => {
    try {
      const key = "Occupation";
      await AsyncStorage.setItem(key, "Landlord");
    } catch (error) {
      alert(error.message);
    }
  };
  const displayHome = async () => {
    try {
      const key = "Home";
      const data = await AsyncStorage.getItem(key);
      sethome(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const HandleRouting = () => {
    return navigation.navigate("Tenants");
  };
  const HandleMessaging = () => {
    return navigation.navigate("Message");
  };
  const HandleHome = () => {
    return navigation.navigate("CommonHome");
  };
  const fetchingTenants = async () => {
    try {
      await getTenants().then((message) => {
        setMessage(message);
        setDisplayMessage(true);
        return;
      });
    } catch (error) {
      console.log("Error meeeeeeeeee");
      return;
    }
  };
  const Top = (props) => {
    const { Tenant, homeName } = props;
    return (
      <View style={styles.InerContainer}>
        <Pressable onPress={() => navigation.navigate("LSettings")}>
          <View style={{ marginLeft: 10, alignItems: "center" }}>
            <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 40 / 2,

                borderWidth: 4,
                borderColor: COLORS.gray,
              }}
              resizeMode="cover"
              source={Logo}
            />
            <Text style={{ fontSize: 8 }}>settings</Text>
          </View>
        </Pressable>

        <View style={styles.topText}>
          <Text style={styles.title}>MOBITENANT</Text>
          <Text>{homeName}</Text>
        </View>
        <Pressable>
          <View style={styles.Home}>
            {/* <MaterialCommunityIcons
              name="home-export-outline"
              size={18}
              color="black"
            /> */}
            <Text>{Tenant}</Text>
            <Text style={styles.homeText}>MT</Text>
          </View>
        </Pressable>
      </View>
    );
  };
  const Card = (props) => {
    const { Name, Email } = props;
    return (
      <View style={styles.cardContainer}>
        <Pressable onPress={() => HandleRouting()}>
          <Image source={Prof} resizeMode="cover" style={styles.image} />
        </Pressable>
        <Pressable style={styles.description}>
          <Text style={styles.Name}>{Name}</Text>
          <Text styles={styles.Email}>{Email}</Text>
        </Pressable>
        <Pressable onPress={() => HandleMessaging()}>
          <AntDesign name="message1" size={24} color="black" />
        </Pressable>
      </View>
    );
  };
  const Bottom = () => {
    const HandleNavigation = () => {
      return navigation.navigate("TennantSignUp");
    };
    return (
      <View style={styles.Bottm}>
        <Pressable onPress={() => HandleNavigation()}>
          <AntDesign name="plus" size={20} color="black" />
        </Pressable>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.Container}>
      <View>
        <Top Tenant="20" homeName={home} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.center}>
          <Card Name="Edwin" Email="edwinronyx@gmail.com" />
        </View>
      </ScrollView>
      {displayMessage && (
        <>
          <View style={{ position: "absolute", zIndex: 100 }}>
            <Text>UserFetched successful</Text>
            <Pressable onPress={() => setDisplayMessage(false)}>
              <Text>okay</Text>
            </Pressable>
          </View>
        </>
      )}
      <Pressable style={styles.Bottom}>
        <Bottom />
      </Pressable>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: COLORS.white,
    height: "100%",
    marginTop: "6%",
  },
  scrollWrapper: {
    backgroundColor: COLORS.blueL,
  },

  cardContainer: {
    backgroundColor: COLORS.softGray,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
    marginVertical: 10,

    width: "90%",
    alignSelf: "center",
    paddingHorizontal: 4,
    borderRadius: 15,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
  description: {
    backgroundColor: COLORS.white,
    height: "80%",
    width: "60%",
    justifyContent: "center",
    paddingHorizontal: "2%",
    borderRadius: 10,
  },
  InerContainer: {
    backgroundColor: COLORS.softGray,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "0%",
    paddingHorizontal: "3%",
    paddingVertical: "3%",
  },
  title: {
    fontSize: SIZES.ex_extra_Large,
    fontWeight: "900",
  },
  Home: {
    backgroundColor: COLORS.white,
    padding: 1,
    paddingHorizontal: 15,
    borderRadius: 7,
  },
  homeText: {
    fontSize: 10,
  },
  center: { backgroundColor: COLORS.white, marginBottom: "25%" },
  Bottom: {
    backgroundColor: COLORS.white,
    position: "absolute",
    bottom: "2%",
    right: "2%",
  },
  Bottm: {
    backgroundColor: COLORS.greenS,
    padding: 10,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    right: "1%",
  },
  topText: {
    flexDirection: "column",
    alignItems: "center",
  },
});
