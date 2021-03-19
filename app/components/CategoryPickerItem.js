import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import Icon from "./Icon";
import Text from "./Text";

function CategoryPickerItem({ item, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Icon
          backgroundColor={item.backgroundColor}
          name={item.icon}
          size={60}
        />
      </TouchableOpacity>
      <Text style={styles.label}>{item.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    alignItems: "center",
    width: "33%",
  },
  label: {
    fontSize: 18,
    marginTop: 5,
    textAlign: "center",
  },
});

export default CategoryPickerItem;
