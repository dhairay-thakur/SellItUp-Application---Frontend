import React, { useState } from "react";
import { View, Image, ScrollView, TouchableOpacity } from "react-native";

import ListItem from "../components/ListItem";
import Text from "../components/Text";
import Screen from "../components/Screen";
import Modal from "react-native-modal";
import Icon from "../components/Icon";
import categories from "../constants/categories";
import routes from "../navigation/routes";

import styles from "../styles/ListingDetails";
import colors from "../config/colors";

function ListingDetailsScreen({ navigation, route }) {
  const listing = route.params;
  const category = categories.find((c) => c.value === listing.categoryId);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Screen>
      <View style={styles.modalContainer}>
        <Modal
          useNativeDriver
          backdropOpacity={0.5}
          isVisible={modalVisible}
          style={styles.modal}
          onBackButtonPress={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.cross}
              onPress={() => setModalVisible(false)}
            >
              <Icon name="close" backgroundColor={colors.primary} />
            </TouchableOpacity>
            <Text style={styles.title}>Dhairay Thakur</Text>
            <Text style={styles.subTitle}>_Hostel_Name_</Text>
            <Text style={styles.subTitle}>_Room_No._</Text>
            <View style={styles.userDetails}>
              <Text style={styles.subTitle}>Contact Seller : </Text>
              <TouchableOpacity>
                <Icon name="phone" backgroundColor="blue" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="whatsapp" backgroundColor="green" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="message" backgroundColor="deepskyblue" />
              </TouchableOpacity>
            </View>
            <View style={styles.userDetailsLast}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate(routes.LISTINGS, {
                    userId: "604fc56814ebd61490bb4c3e",
                    categoryId: null,
                  });
                }}
              >
                <Text>All listings from Dhairay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <Image
        style={styles.image}
        source={{ uri: listing.images[0].fileName }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{listing.title}</Text>
          <Text style={styles.price}>₹ {listing.price}</Text>
          <Text style={styles.description}>{listing.description}</Text>
          <View style={styles.divider} />
          <View style={styles.itemContainer}>
            <ListItem
              title="View seller details"
              onPress={() => setModalVisible(true)}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.itemContainer}>
            <ListItem
              title="View similar listings"
              onPress={() => {
                setModalVisible(false);
                navigation.navigate(routes.LISTINGS, {
                  userId: null,
                  categoryId: listing.categoryId,
                });
              }}
            />
          </View>
          <View style={styles.divider} />
        </View>
      </ScrollView>
    </Screen>
  );
}

export default ListingDetailsScreen;
