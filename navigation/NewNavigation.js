import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthScreens, First, Tabs, LandLord, Generals } from "../all";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { SplashScreen } from "../components";
import { onAuthStateChanged } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../FirebaseConfig";
import { AntDesign } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const NewNavigation = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const storedAccessToken = await AsyncStorage.getItem("userToken");
        if (storedAccessToken) {
          await user.getIdToken(true);
          console.log("Access token applied:", user.uid);
        }

        setAppIsReady(true);
        setLoggedIn(true);
        setUser(user);
      } else {
        setUser(null);
        setAppIsReady(true);
        setLoggedIn(false);
      }
    });
    () => unsub();
  }, [user]);

  const renderScreens = () => {
    if (appIsReady) {
      if (loggedIn) {
        return MobitenantUsersStack();
      } else {
        return ValidationStack();
      }
    } else {
      return Splash();
    }
  };

  const TenantTabScreens = () => {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen
          name="Home"
          options={{ headerShown: false }}
          component={Tabs.Home}
        />
        <Tab.Screen
          name="Payment"
          options={{ headerShown: false }}
          component={Tabs.Payment}
        />
        <Tab.Screen
          name="Notice"
          options={{ headerShown: false }}
          component={Tabs.Notice}
        />
        <Tab.Screen
          name="Profile"
          options={{ headerShown: false }}
          component={Tabs.Profile}
        />
        <Tab.Screen
          name="EditProfile"
          options={{ headerShown: false }}
          component={Tabs.EditProfile}
        />
      </Tab.Navigator>
    );
  };
  const LandlordTabsScreens = () => {
    return (
      <Tab.Navigator initialRouteName="LandLordHome">
        <Tab.Screen
          name="LandLordHome"
          component={LandLord.LandlordHome}
          options={{
            tabBarLabel: "Home",
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              <AntDesign name="home" size={size} color={color} />;
            },
          }}
        />
      </Tab.Navigator>
    );
  };
  const LandlordsScreens = () => {
    return (
      <>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={LandlordTabsScreens}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tenants"
            component={LandLord.Tenants}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Message" component={LandLord.Messaging} />
          <Stack.Screen
            name="LSettings"
            component={LandLord.LSettings}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TennantSignUp"
            component={LandLord.SignUpTennant}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </>
    );
  };
  const MobitenantUsersStack = () => {
    return (
      <>
        <Stack.Screen
          name="CommonHome"
          component={First.CommonHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={First.Settings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GoingHome"
          component={AuthScreens.SignInHome}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Edit"
          component={First.Edit}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Tabs"
          component={TenantTabScreens}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Extention"
          component={Generals.Extention}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Complains"
          component={Generals.Complains}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Landlord"
          component={LandlordsScreens}
          options={{ headerShown: false }}
        />
      </>
    );
  };

  const ValidationStack = () => {
    return (
      <>
        <Stack.Screen name="SignUp" component={AuthScreens.SignUp} />
        <Stack.Screen name="SignIn" component={AuthScreens.SignIn} />
      </>
    );
  };

  const Splash = () => {
    return (
      <>
        <Stack.Screen name="Splash" component={SplashScreen} />
      </>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          appIsReady ? (loggedIn ? "CommonHome" : "SignUp") : "Splash"
        }
        screenOptions={{ headerShown: false }}
      >
        {renderScreens()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default NewNavigation;
