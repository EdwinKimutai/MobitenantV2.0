import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

import { COLORS, SIZES } from "../../constants";

const Bottom = (props) => {
  const { title } = props;

  return <Text style={{ color: COLORS.white }}>{title}</Text>;
};

export default Bottom;
const styles = StyleSheet.create({});
