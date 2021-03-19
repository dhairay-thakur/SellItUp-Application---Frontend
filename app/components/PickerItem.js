import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import colors from "../config/colors";

function PickerItem({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Text style={styles.text}>{item.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.dark,
    padding: 20,
    fontSize: 1,
    fontSize: 1,
  },
});

export default PickerItem;
