import {
  collection,
  addDoc,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  updateDoc,
  setDoc,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
import { auth, db } from "../FirebaseConfig";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Nav from "./Navigation";
const Validation = () => {
  const { Where } = Nav();
  const navigation = useNavigation();
  const [globalData, setGlobalData] = useState("");

  const HandleHome = async () => {
    try {
      const key = "Occupation";
      const data = await AsyncStorage.getItem(key);
      if (data !== null) {
        if (data === "Tenant") {
          return navigation.navigate("Tabs", {
            screen: "Home",
            params: { user: auth.currentUser.displayName },
          });
        } else if (data === "Landlord") {
          return navigation.navigate("Landlord", {
            screen: "LandLordHome",
          });
        }
      } else {
        navigation.navigate("GoingHome");
        return false;
      }
    } catch (error) {
      return false;
    } finally {
      return false;
    }
  };

  //routing................................................................................

  const HandleRouting = async (
    dataSet = {},
    LandlordData = {},
    TenantData = {}
  ) => {
    setGlobalData(dataSet.Home);

    // validation
    //tenant validation if the new user is a tenant he or she is logged into the system
    if (dataSet.Occupation === "TENANT") {
      //checking if tenant exists
      const collectionRe = collection(
        db,
        `Home/${dataSet.Home}/Landlord/${dataSet.Home}/Tenants`
      );
      const q = query(
        collectionRe,
        where("Name", "==", dataSet.Name),
        where("SerialNo", "==", dataSet.HouseNo)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        return navigation.navigate("Tabs", {
          screen: "Home",
          params: { user: dataSet.Name },
        });
      } else {
        return `you are not a member of this house`;
      }
    } else {
      //checking if landlord exist
      ///this api checks for the existance of the landlord
      const collectionRe = collection(db, `Home/${dataSet.Home}/Landlord`);
      const q = query(
        collectionRe,
        where("Name", "==", dataSet.Name),
        where("SerialNo", "==", dataSet.HouseNo)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        return navigation.navigate("Landlord");
      } else {
        return `Check with mobitenant for client detail varifications \n thankyou`;
      }
      //   const docRef = collection(db, `Home/${dataSet.Home}/Landlord`);
      //   await addDoc(docRef, {
      //     Name: dataSet.Name,
      //     SerialNo: dataSet.HouseNo,
      //   });
      //   return navigation.navigate("Landlord");
    }
  };
  //allocating a new tenant a home
  const newTenant = async (name = "", houseNo = "", home = "") => {
    const stateIn = () => {
      return true;
    };
    const customId = name;
    try {
      const docRef = collection(db, `Home/${home}/Landlord/${home}/Tenants`);
      const docRef2 = collection(db, "Users");
      await addDoc(docRef, {
        Name: name,
        SerialNo: houseNo,
        Occupied: stateIn(),
        userId: false,
      });
      // await addDoc(docRef2, {
      //   Name: name,
      //   Home: home,
      //   email: "",
      //   userId: "",
      // });
      await setDoc(doc(docRef2, customId), {
        Name: name,
        Home: home,
        email: "",
        userId: "",
      });
      return "successfully Created tenants account";
    } catch (error) {
      console.log(error.message);
      return "There was a problem creating users account";
    }
  };

  //getting the landlords tenants
  const getTenants = async () => {
    try {
      const Query = query(
        collection(db, "Users"),
        orderBy("AccountCreationTime", "desc"), // Replace with your ordering criteria
        limit(1)
      );

      const unsubscribe = onSnapshot(Query, (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            // Handle new documents
            console.log(
              "New document:",
              change.doc.id,
              " => ",
              change.doc.data()
            );
          }
          if (change.type === "modified") {
            // Handle modified documents
            console.log(
              "Modified document:",
              change.doc.id,
              " => ",
              change.doc.data()
            );
          }
          if (change.type === "removed") {
            // Handle removed documents
            console.log("Removed document:", change.doc.id);
          }
        });
      });
      return "it was successful";
    } catch (error) {
      console.log("this occured", error.message);
      return "Something happened";
    }
  };

  return { HandleHome, HandleRouting, newTenant, getTenants };
};

export default Validation;
