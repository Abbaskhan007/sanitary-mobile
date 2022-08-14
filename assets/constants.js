import { Platform } from "react-native";
const i = "http://127.0.0.1:5000";
const bgColor = "#e8ecf9";
const theme = "#0c1c29";
const url =
  Platform.OS === "android"
    ? "http://10.0.2.2:5000/api"
    : "http://127.0.0.1:5000/api";

export default {
  bgColor,
  theme,
  url,
};
