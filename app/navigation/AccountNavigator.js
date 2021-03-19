import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Account"
      component={AccountScreen}
      options={{
        gestureEnabled: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
