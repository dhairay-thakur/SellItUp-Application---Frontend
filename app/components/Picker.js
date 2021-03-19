import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";

import Text from "./Text";
import Button from "./Button";
import defaultStyles from "../config/styles";
import PickerItem from "./PickerItem";
// import Screen from "./Screen";

function AppPicker({
  icon,
  items,
  numberOfColumns = 1,
  onSelectItem,
  PickerItemComponent = PickerItem,
  placeholder,
  selectedItem,
  width = "100%",
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={defaultStyles.colors.medium}
              style={styles.icon}
            />
          )}
          {selectedItem ? (
            <Text style={styles.text}>{selectedItem.label}</Text>
          ) : (
            <Text style={styles.placeholder}>{placeholder}</Text>
          )}

          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.modalContainer}>
        <Modal
          useNativeDriver
          backdropOpacity={0.5}
          isVisible={modalVisible}
          style={styles.modal}
        >
          <View style={styles.modalView}>
            <FlatList
              data={items}
              keyExtractor={(item) => item.value.toString()}
              numColumns={numberOfColumns}
              renderItem={({ item }) => (
                <PickerItemComponent
                  item={item}
                  label={item.label}
                  onPress={() => {
                    setModalVisible(false);
                    onSelectItem(item);
                  }}
                />
              )}
            />
            <Button
              width="50%"
              title="Close"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  modalContainer: { position: "absolute" },
  modal: { margin: 0, alignItems: "center", justifyContent: "center" },
  modalView: {
    minHeight: 260,
    width: "86.67%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  placeholder: {
    color: defaultStyles.colors.medium,
    flex: 1,
  },
  text: {
    flex: 1,
  },
});

export default AppPicker;
