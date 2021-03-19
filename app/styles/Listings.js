import { StyleSheet } from "react-native";
import colors from "../config/colors";

const styles = StyleSheet.create({
  screen: {
    padding: 12,
    backgroundColor: colors.light,
  },
  error: {
    padding: 20,
    backgroundColor: colors.light,
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default styles;
