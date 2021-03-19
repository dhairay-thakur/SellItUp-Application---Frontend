import { StyleSheet } from "react-native";
import colors from "../config/colors";
const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  description: { marginBottom: 10 },
  divider: {
    left: "2%",
    width: "96%",
    borderColor: colors.secondary,
    borderWidth: 1,
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  userContainer: {
    marginVertical: 5,
  },
});
export default styles;
