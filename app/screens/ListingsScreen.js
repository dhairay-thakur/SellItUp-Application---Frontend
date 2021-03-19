import React, { useEffect, useState } from "react";
import listingsApi from "../api/listings";
import { FlatList, View } from "react-native";
import ActivityIndicator from "../components/ActivityIndicator";
import Card from "../components/Card";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import AppText from "../components/Text";
import AppButton from "../components/Button";
import useApi from "../hooks/useApi";

import styles from "../styles/Listings";

function ListingsScreen({ navigation }) {
  const { data, error, loading, request: loadListings } = useApi(
    listingsApi.getAllListings
  );

  useEffect(() => {
    loadListings();
  }, []);

  return (
    <Screen style={styles.screen}>
      <ActivityIndicator visible={loading} />
      {!loading && error && (
        <View style={styles.error}>
          <AppText>Couldn't load listings!</AppText>
          <AppButton title={"retry"} onPress={loadListings} />
        </View>
      )}
      {!loading && !error && (
        <FlatList
          refreshing={false}
          onRefresh={loadListings}
          showsVerticalScrollIndicator={false}
          data={data.listings}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subTitle={"₹ " + item.price}
              image={item.images[0].fileName}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            />
          )}
        />
      )}
    </Screen>
  );
}

export default ListingsScreen;
