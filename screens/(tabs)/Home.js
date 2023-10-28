import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Top3, Bottom3 } from "../../components";
import { SIZES, COLORS } from "../../constants";
import { BackgroundImage } from "../../assets";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ route }) => {
  const navigation = useNavigation();
  const [enable, setEnable] = useState(false);
  const { user } = route.params;
  useEffect(() => {
    //adding username to async storage
    // Disable back gesture for this screen
    // navigation.setOptions({
    //   gestureEnabled: true,
    // });

    // const unsubscribe = navigation.addListener("beforeRemove", (e) => {
    //   // Prevent the screen from being removed
    //   e.preventDefault();
    // });
    storeData();
    // // Clean up the listener when the component is unmounted
    // return () => {
    //   unsubscribe();
    // };
  }, []);

  const storeData = async () => {
    try {
      const key = "Occupation";
      const Name = "Name";
      await AsyncStorage.setItem(key, "Tenant");
      await AsyncStorage.setItem(Name, user);
      console.log("DataStored");
    } catch (error) {
      console.log(`This occured ${error.message}`);
    }
  };
  const Navigation = (wapi) => {
    if (wapi === 1) {
      return navigation.navigate("Payment");
    } else if (wapi === 2) {
      return navigation.navigate("Complains");
    } else if (wapi === 3) {
      return navigation.navigate("Notice");
    } else if (wapi === 4) {
      return navigation.navigate("Extention");
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.top}>
          <Top3 Title={user} Change={(value) => setEnable(value)} />
        </View>

        <View style={styles.Midle}>
          <Image
            resizeMode="cover"
            style={{ position: "absolute", zIndex: -1 }}
            source={BackgroundImage}
          />
          <Text style={{ color: "white" }}>what ,{user}</Text>
        </View>

        <View style={styles.Bottom}>
          <View style={styles.smallContainer}>
            <View style={styles.first}>
              <Pressable
                style={styles.BtnContainer}
                onPress={() => {
                  Navigation(1);
                }}
              >
                <Bottom3 title="PAY RENT" />
              </Pressable>
              <Pressable
                style={styles.BtnContainer}
                onPress={() => {
                  Navigation(2);
                }}
              >
                <Bottom3 title="COMPLAINS" />
              </Pressable>
            </View>
            <View style={styles.second}>
              <Pressable
                style={styles.BtnContainer}
                onPress={() => {
                  Navigation(3);
                }}
              >
                <Bottom3 title="NOTICE BOARD" />
              </Pressable>
              <Pressable
                style={styles.BtnContainer}
                onPress={() => {
                  Navigation(4);
                }}
              >
                <Bottom3 title="EXTENTION" />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    backgroundColor: COLORS.blueL,
  },
  BtnContainer: {
    backgroundColor: COLORS.blueS,
    width: "40%",
    paddingTop: 22,
    paddingBottom: 22,
    borderRadius: SIZES.largest,
    marginVertical: SIZES.small,
    marginHorizontal: SIZES.small,
    alignItems: "center",
    justifyContent: "center",
  },
  top: {
    backgroundColor: COLORS.blueL,
    alignItems: "center",
    height: "20%",
  },
  Midle: {
    backgroundColor: COLORS.blueL,
    alignItems: "center",
    height: "25%",
  },
  Bottom: {
    backgroundColor: COLORS.white,
    alignItems: "center",
    height: "60%",
    borderRadius: 30,
  },
  first: {
    flexDirection: "row",
    height: "30%",
    width: "100%",
  },
  second: {
    flexDirection: "row",
    height: "30%",
  },
  smallContainer: {
    height: "100%",
    alignItems: "center",
  },
});
