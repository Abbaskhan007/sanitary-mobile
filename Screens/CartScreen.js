import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import CartItem from "../Components/CartItem";
import Header from "../Components/Header";

function CartScreen({ cart, navigation }) {
  console.log("Real Cart------------------------------------------", cart);

  if (cart.length > 0) {
    return (
      <View style={{ padding: 18, flex: 1, marginBottom: 125 }}>
        <Header />
        <View style={{ flex: 1 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.product._id}
            data={cart}
            renderItem={({ item }) => <CartItem item={item} />}
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("Checkout")}
          style={styles.checkoutButton}
        >
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View
      style={[
        styles.container,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <Image
        style={styles.image}
        source={{
          uri: "https://res.cloudinary.com/dlxyvl6sb/image/upload/v1658143233/tkk8whmnpvs5efnwamms.png",
        }}
      />
      <Text style={styles.message}>No Items Present in the Cart</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Products")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Shop Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 46 },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  message: {
    fontSize: 20,
    fontWeight: "500",
    color: "gray",
    textAlign: "center",
    marginTop: -42,
  },
  button: {
    backgroundColor: "#e63ff8",
    padding: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 24,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
  },
  checkoutButton: {
    backgroundColor: "#637aff",
    padding: 12,
    borderRadius: 6,
    marginTop: 18,
  },
  checkoutText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "500",
    fontSize: 20,
  },
});

const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
  };
};

export default connect(mapStateToProps)(CartScreen);
