import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import ListingsScreen from "../screens/ListingsScreen";
import ListingsFilterScreen from "../screens/ListingsFilterScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Listings" component={ListingsScreen} />
    <Stack.Screen
      name="ListingsFilter"
      component={ListingsFilterScreen}
      options={{
        headerShown: true,
        title: "Filtered Listings",
        gestureEnabled: false,
        ...TransitionPresets.RevealFromBottomAndroid,
      }}
    />
    <Stack.Screen
      name="ListingDetails"
      component={ListingDetailsScreen}
      options={{
        gestureEnabled: false,
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}
    />
  </Stack.Navigator>
);

export default FeedNavigator;
