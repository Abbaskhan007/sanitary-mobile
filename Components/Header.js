import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import BackButton from "./BackButton";

export default function Header({ Left, Right, color = "#000" }) {
  const route = useRoute();
  return (
    <View style={styles.container}>
      <BackButton color={color} />
      <Text style={[styles.title, { color }]}>{route.name}</Text>
      {Right && <Right />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "400",
    marginLeft: -52,
    fontFamily: "lato",
  },
});
