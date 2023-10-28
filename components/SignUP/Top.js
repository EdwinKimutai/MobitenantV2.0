import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants";

const Top = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>{props.text1}</Text>
      <Text style={styles.text2}>{props.text2}</Text>
    </View>
  );
};

export default Top;
const styles = StyleSheet.create({
  container: {
    width: "100%",

    justifyContent: "center",
    alignItems: "center",
  },
  text1: {
    fontSize: SIZES.ex_extra_Large,
    paddingTop: SIZES.large,
  },
  text2: {
    fontSize: SIZES.normal,
  },
});
