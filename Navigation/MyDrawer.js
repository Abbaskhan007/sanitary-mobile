import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text } from "react-native";
import React from "react";
import HomeScreen from "./HomeScreen";
import CustomDrawer from "./CustomDrawer";
import BottomNavigator from "./HomeScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import SellerDashboard from "../Screens/SellerDashboard";

export default function MyDrawer() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: "90%",
        },
        drawerActiveBackgroundColor: "#818cf8",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="User Profile" component={ProfileScreen} />
      <Drawer.Screen name="Admin Dashboard" component={HomeScreen} />
      <Drawer.Screen name="Seller Dashboard" component={SellerDashboard} />
      <Drawer.Screen name="Worker Dashboard" component={HomeScreen} />
    </Drawer.Navigator>
  );
}
