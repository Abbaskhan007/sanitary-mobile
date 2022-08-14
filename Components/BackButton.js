import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function BackButton({ bg, color }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={[styles.conatiner, { backgroundColor: bg, color }]}
    >
      <Ionicons name="chevron-back-outline" size={32} color={color} />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  conatiner: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});
