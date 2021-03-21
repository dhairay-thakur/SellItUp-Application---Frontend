import { StyleSheet } from "react-native";
import colors from "../config/colors";
const styles = StyleSheet.create({
  cross: {
    width: "100%",
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  detailsContainer: {
    padding: 20,
  },
  modalContainer: { position: "absolute" },
  modal: { margin: 0, alignItems: "center", justifyContent: "center" },
  modalView: {
    minHeight: 260,
    width: "86.67%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  description: { marginBottom: 10 },
  divider: {
    left: "2%",
    width: "96%",
    borderColor: colors.secondary,
    borderWidth: 1,
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
  subTitle: {
    marginTop: 10,
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  itemContainer: {
    marginVertical: 5,
  },
  userDetails: {
    marginTop: 16,
    borderWidth: 1,
    width: "100%",
    borderStyle: "dotted",
    borderColor: colors.secondary,
    borderRadius: 40,
    padding: 10,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  userDetailsLast: {
    margin: 16,
    borderWidth: 1,
    width: "85%",
    borderColor: colors.secondary,
    borderStyle: "dotted",
    borderRadius: 40,
    padding: 10,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-evenly",
  },
});
export default styles;
