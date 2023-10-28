import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthScreens, First, Tabs, LandLord, Generals } from "../all";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../FirebaseConfig";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  const { user } = useAuth();
  if (user) {
    const LandlordStack = () => {
      return (
        <Tab.Navigator initialRouteName="LandLordHome">
          <Tab.Screen
            name="LandLordHome"
            component={LandLord.LandlordHome}
            screenOptions={{ headerShown: false }}
          />
        </Tab.Navigator>
      );
    };
    const TabScreens = () => {
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
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="CommonHome"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="CommonHome"
            component={First.CommonHome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GoingHome"
            component={AuthScreens.SignInHome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Settings"
            component={First.Settings}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Edit"
            component={First.Edit}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Tabs"
            component={TabScreens}
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
            component={LandlordStack}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SignUp"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="SignIn" component={AuthScreens.SignIn} />
          <Stack.Screen name="SignUp" component={AuthScreens.SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};
export default AppNavigation;
