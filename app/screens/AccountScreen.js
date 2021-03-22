import React, { useContext } from "react";
import { View } from "react-native";

import ListItem from "../components/ListItem";
import colors from "../config/colors";
import Icon from "../components/Icon";
import routes from "../navigation/routes";
import Screen from "../components/Screen";

import styles from "../styles/Account";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";

function AccountScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);
  const handleLogOut = () => {
    setUser(null);
    authStorage.removeToken();
  };
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user.name}
          subTitle={user.email}
          image={require("../assets/dummy.png")}
        />
      </View>
      <View style={styles.container}>
        <ListItem
          onPress={() => {
            navigation.navigate(routes.LISTINGS_FILTER, {
              userName: user.name,
              userId: user.userId,
              categoryId: null,
            });
          }}
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
        onPress={handleLogOut}
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#7D8CC4" />}
      />
    </Screen>
  );
}

export default AccountScreen;
