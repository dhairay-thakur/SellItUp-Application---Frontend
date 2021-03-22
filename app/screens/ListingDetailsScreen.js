import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";

import ListItem from "../components/ListItem";
import Text from "../components/Text";
import Button from "../components/Button";
import Screen from "../components/Screen";
import Modal from "react-native-modal";
import Icon from "../components/Icon";

import routes from "../navigation/routes";

import useApi from "../hooks/useApi";
import usersApi from "../api/users";

import styles from "../styles/ListingDetails";
import colors from "../config/colors";
import ActivityIndicator from "../components/ActivityIndicator";

function ListingDetailsScreen({ navigation, route }) {
  const listing = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const { data, error, loading, request: loadUserDetails } = useApi(
    usersApi.getUserDetails
  );
  useEffect(() => {
    loadUserDetails(listing.userId);
  }, []);

  // function to make phone call
  const callOrSms = (call = true) => {
    const mobile = data.user.mobileNumber;
    if (mobile) {
      let url;
      if (call) url = `tel:${mobile}`;
      else url = `sms:${mobile}`;
      url = Linking.openURL(url)
        .then((data) => {
          console.log("Dialer opened successfully " + data);
        })
        .catch(() => {
          alert("Could not open Phone dialer");
        });
    } else {
      alert("Please enter mobile no");
    }
  };

  // function to open whatsapp
  const openWhatsApp = () => {
    const msg =
      "Hi, I am interested to buy " +
      listing.title +
      "from you, Is it still available?";
    const mobile = data.user.mobileNumber;
    if (mobile) {
      if (msg) {
        const url = "whatsapp://send?text=" + msg + "&phone=91" + mobile;
        Linking.openURL(url)
          .then((data) => {
            console.log("WhatsApp Opened successfully " + data);
          })
          .catch(() => {
            alert(
              "WhatsApp is not installed on your device. Please install it first"
            );
          });
      } else {
        alert("Please enter message to send");
      }
    } else {
      alert("Please enter mobile no");
    }
  };
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
            <ActivityIndicator visible={loading || !data} />
            {!loading && error && (
              <View style={styles.error}>
                <Text>Couldn't load user details!</Text>
                <Button
                  title={"retry"}
                  onPress={() => loadUserDetails(listing.userId)}
                />
              </View>
            )}
            {!loading && !error && data.user && (
              <>
                <Text style={styles.title}>{data.user.name}</Text>
                <Text style={styles.subTitle}>{data.user.hostel}</Text>
                <Text style={styles.subTitle}>{data.user.room}</Text>
                <View style={styles.userDetails}>
                  <Text style={styles.subTitle}>Contact Seller : </Text>
                  <TouchableOpacity onPress={callOrSms}>
                    <Icon name="phone" backgroundColor="blue" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={openWhatsApp}>
                    <Icon name="whatsapp" backgroundColor="green" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => callOrSms(false)}>
                    <Icon name="message" backgroundColor="deepskyblue" />
                  </TouchableOpacity>
                </View>
                <View style={styles.userDetailsLast}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                      navigation.navigate(routes.LISTINGS_FILTER, {
                        userName: data.user.name,
                        userId: listing.userId,
                        categoryId: null,
                      });
                    }}
                  >
                    <Text style={styles.textUser}>
                      All listings from {data.user.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
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
                navigation.navigate(routes.LISTINGS_FILTER, {
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
