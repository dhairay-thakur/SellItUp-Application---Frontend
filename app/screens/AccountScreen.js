import React from "react";
import { View } from "react-native";

import ListItem from "../components/ListItem";
import colors from "../config/colors";
import Icon from "../components/Icon";
import routes from "../navigation/routes";
import Screen from "../components/Screen";

import styles from "../styles/Account";

function AccountScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title="Dhairay Thakur"
          subTitle="dhairaythakur.che18@iitbhu.ac.in"
          image={require("../assets/mosh.jpg")}
        />
      </View>
      <View style={styles.container}>
        <ListItem
          title="My Listings"
          IconComponent={
            <Icon
              name="format-list-bulleted"
              backgroundColor={colors.primary}
            />
          }
        />
      </View>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#7D8CC4" />}
      />
    </Screen>
  );
}

export default AccountScreen;
