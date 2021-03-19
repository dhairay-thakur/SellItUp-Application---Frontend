import React from "react";
import { View, Image } from "react-native";

import ListItem from "../components/ListItem";
import Text from "../components/Text";
import Screen from "../components/Screen";

import styles from "../styles/ListingDetails";

function ListingDetailsScreen({ route }) {
  const listing = route.params;

  return (
    <Screen>
      <Image
        style={styles.image}
        source={{ uri: listing.images[0].fileName }}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{listing.title}</Text>
        <Text style={styles.price}>₹ {listing.price}</Text>
        <Text style={styles.description}>{listing.description}</Text>
        <View style={styles.divider} />
        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/mosh.jpg")}
            title="Mosh Hamedani"
            subTitle="5 Listings"
          />
        </View>
      </View>
    </Screen>
  );
}

export default ListingDetailsScreen;
