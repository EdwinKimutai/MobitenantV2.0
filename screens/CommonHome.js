import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Button,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SIZES, COLORS } from "../constants";
import { Home2, Home3, Logo, Landlord, Landlord2 } from "../assets";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Home1 } from "../assets";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../FirebaseConfig";
import Validation from "../hooks/validation";

const CommonHome = () => {
  const navigation = useNavigation();
  const { HandleHome } = Validation();
  const [loading, setLoading] = useState(false);

  const Top = (props) => {
    const { load } = props;
    const goingHome = async () => {
      setLoading(true);
      return setTimeout(async () => {
        await HandleHome().then((value) => {
          load(value);
        });
      }, 1000);
    };
    return (
      <View style={styles.InerContainer}>
        <Pressable onPress={() => navigation.navigate("Settings")}>
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

        <View>
          <Text style={styles.title}>MOBITENANT</Text>
        </View>
        <Pressable onPress={() => goingHome()}>
          <View style={styles.Home}>
            <MaterialCommunityIcons
              name="home-export-outline"
              size={18}
              color="black"
            />
            <Text style={styles.homeText}>Home</Text>
          </View>
        </Pressable>
      </View>
    );
  };
  const Midle = (props) => {
    const { image, landl, title, name, dis } = props;
    return (
      <View style={styles.card1}>
        <Text style={styles.cardTile}>{title}</Text>
        <View style={styles.home}>
          <Image
            style={{
              height: 250,
              width: 250,
              borderRadius: 10,
            }}
            resizeMode="cover"
            source={image}
          />
        </View>

        <View style={styles.bell}>
          <View style={styles.profile}>
            <View style={styles.bellow}>
              <Image
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 20 / 2,
                  borderWidth: 2,
                  borderColor: COLORS.white,
                }}
                resizeMode="cover"
                source={landl}
              />
            </View>
            <View style={styles.text}>
              <Text style={styles.Name}>{name} </Text>
              <Text style={styles.Description}>{dis}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView>
      <View style={styles.MainContainer}>
        <Top load={(value) => setLoading(value)} />
        {loading ? (
          <ActivityIndicator />
        ) : (
          <ScrollView>
            <View style={styles.container2}>
              <Midle
                image={Home1}
                landl={Landlord2}
                title="Heri"
                name="Gabu"
                dis="its been my entire life the home is full castomed"
              />
              <Midle
                image={Home2}
                landl={Landlord}
                title="Kwetu"
                name="Edwin kimutai"
                dis="I have done this job for close to 10 years"
              />
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CommonHome;

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: COLORS.white,
    marginTop: "9%",
    height: "95%",
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
  Home: {
    backgroundColor: COLORS.white,
    padding: 1,
    paddingHorizontal: 15,
    borderRadius: 7,
  },
  homeText: {
    fontSize: 10,
  },
  title: {
    fontSize: SIZES.ex_extra_Large,
    fontWeight: "900",
  },
  container2: {
    backgroundColor: COLORS.white,
    height: "70%",
    marginTop: "6%",
  },
  card1: {
    backgroundColor: COLORS.softGray,
    width: "95%",
    alignSelf: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: SIZES.large,
    marginVertical: 10,
  },
  home: {
    width: 30,
    marginVertical: 10,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
  },
  Name: {
    fontSize: SIZES.large,
    fontWeight: "900",
  },
  text: {
    flex: 1,
    marginLeft: 20,
    marginVertical: 10,
    backgroundColor: COLORS.softGray,
    padding: 3,
    borderRadius: 8,
  },
  cardTile: {
    fontSize: SIZES.large,
    fontWeight: "900",
  },
  bell: {
    backgroundColor: COLORS.softGray,
    borderRadius: 10,
  },
});
