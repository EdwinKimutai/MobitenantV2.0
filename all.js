//authScreens
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import SignInHome from "./screens/SignInHome";
//CommonScreens
import CommonHome from "./screens/CommonHome";
import Edit from "./screens/HomeSettings/Edit";
import Settings from "./screens/HomeSettings/Settings";

//tab screens
import Home from "./screens/(tabs)/Home";
import Notice from "./screens/(tabs)/Notice";
import Payment from "./screens/(tabs)/Payment";
import Profile from "./screens/(tabs)/profile";
import EditProfile from "./screens/(tabs)/profile/EditProfile";
//general
import Complains from "./screens/Complains/Complains";
import Extention from "./screens/Extention/Extention";
//serial screen
import Serial from "./screens/Serial";
//Landlord pages

import LandlordHome from "./screens/tabs2/Home";
import Tenants from "./screens/tabs2/Tenants";
import Messaging from "./screens/tabs2/Messaging";
import LSettings from "./screens/tabs2/Settings";
import SignUpTennant from "./screens/tabs2/SignUpTennant";

const LandLord = {
  Serial,
  LandlordHome,
  Tenants,
  Messaging,
  LSettings,
  SignUpTennant,
};
const AuthScreens = { SignUp, SignIn, SignInHome };
const First = { CommonHome, Settings, Edit };
const Tabs = { Home, Notice, Payment, Profile, EditProfile };
const Generals = { Complains, Extention };
export { First, Tabs, Generals, AuthScreens, LandLord };
