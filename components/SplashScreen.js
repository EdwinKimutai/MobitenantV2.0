import { View, Image, StyleSheet } from "react-native";
import { Splash } from "../assets";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={Splash} // Path to your splash screen image
        resizeMode="contain"
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff", // Match the backgroundColor in app.json
  },
  image: {
    width: "80%", // Adjust the width as needed
  },
});

export default SplashScreen;
