import React, { useState, useEffect, useLayoutEffect } from "react";
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

function ListingsFilterScreen({ navigation, route }) {
  const id = route.params;
  let targetApi;
  let arg;
  let title = "";
  if (id.userId) {
    targetApi = listingsApi.getListingsByUser;
    arg = id.userId;
    let user = id.userName ? id.userName : "Seller";
    title = "All Listings from " + user;
  } else {
    targetApi = listingsApi.getListingsByCategory;
    arg = id.categoryId;
    title = "Similar Products";
  }

  const { data, error, loading, request: loadListings } = useApi(targetApi);
  useEffect(() => {
    loadListings(arg);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title,
    });
  }, [navigation]);

  return (
    <Screen style={[styles.screen, { paddingTop: 8 }]}>
      <ActivityIndicator visible={loading} />
      {!loading && error && (
        <View style={styles.error}>
          <AppText>Couldn't load listings!</AppText>
          <AppButton title={"retry"} onPress={() => loadListings(arg)} />
        </View>
      )}
      {!loading && !error && (
        <FlatList
          refreshing={false}
          onRefresh={() => loadListings(arg)}
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

export default ListingsFilterScreen;
