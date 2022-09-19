import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import StarRating from "../Components/StarRating";
import constants from "../assets/constants";
import Carousel from "../Components/Carousel";
import Header from "../Components/Header";
import { useRoute, useNavigation } from "@react-navigation/native";
import Axios from "axios";
import { connect } from "react-redux";
import { ADD_TO_CART, ADD_TO_CART_LOCAL } from "../Redux/Constants";
import { Feather } from "@expo/vector-icons";

function ProductDetail({ addToCartAction, addToCartLocal, user, cart }) {
  const routes = useRoute();
  const { productId } = routes.params;
  const [productData, setProductData] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const navigation = useNavigation();

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    console.log("PRoduct Id", productId);
    const { data } = await Axios.get(
      `${constants.url}/products/getProduct/${productId}`
    );
    setProductData(data);
  };
  console.log("Product Data", productData);

  const quantityHandler = qty => {
    if (qty === 1) {
      if (quantity === productData.inStock) {
        return;
      } else {
        setQuantity(prevQty => prevQty + qty);
      }
    } else {
      if (quantity === 1) return;
      setQuantity(prevQty => prevQty + qty);
    }
  };

  const addToCart = () => {
    if (!user.user.name) {
      addToCartLocal(productData, quantity);
    } else {
      addToCartAction(
        {
          user: user.user._id,
          products: { product: productData._id, quantity: quantity },
        },
        user
      );
    }
  };

  return (
    <View style={styles.container}>
      <Header color="#fff" />
      <View style={styles.imageContainer}>
        <Carousel images={productData.images} />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.nameRatingRow}>
          <Text style={styles.nameText}>{productData.name}</Text>
          <View>
            <View style={styles.ratingRow}>
              <StarRating rating={productData.rating} />
              <Text style={styles.ratingNum}>({productData.rating})</Text>
            </View>
            <Text style={styles.reviewText}>
              {productData?.reviews?.length} Reviews
            </Text>
          </View>
        </View>
        <View style={styles.storeRow}>
          <View style={styles.storeImageContainer}>
            <Image
              style={styles.storeImage}
              source={{
                uri: "data:image/jpeg;base64,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",
              }}
            />
          </View>
          <Text style={styles.storeName}>{productData?.store?.name}</Text>
        </View>

        <Text numberOfLines={4} style={styles.description}>
          {productData.description}
        </Text>

        <View style={styles.buttonRow}>
          <View style={styles.ctgButton}>
            <Text style={styles.category}>{productData.category}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("ARView", productData.model)}
            style={styles.arButton}
          >
            <Feather name="codesandbox" size={24} color="#fff" />
            <Text style={styles.arText}>AR View</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <Text style={styles.price}>Rs {productData.price}</Text>

          <View style={styles.quantityRow}>
            <TouchableOpacity onPress={() => quantityHandler(1)}>
              <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>
            <Text style={styles.qty}>{quantity}</Text>
            <TouchableOpacity onPress={() => quantityHandler(-1)}>
              <Text style={styles.quantityButton}>-</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.btnRow}>
          <TouchableOpacity onPress={addToCart} style={styles.AddToCartButton}>
            <Text style={styles.cartText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Reviews", {
                reviews: productData.reviews,
                rating: productData.rating,
              })
            }
            style={styles.reviewBtn}
          >
            <Text style={styles.cartText}>Reviews</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.theme,
    padding: 16,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 30,
  },
  image: {
    height: 300,
    width: "100%",
    resizeMode: "contain",
    marginHorizontal: "auto",
    backgroundColor: "transparent",
  },
  infoContainer: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 18,
    marginBottom: 10,
  },
  nameRatingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameText: {
    fontSize: 24,
    fontWeight: "500",
  },
  storeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  storeName: {
    color: "#615e5c",
    fontWeight: "500",
    fontSize: 16,
  },
  description: {
    color: "#615e5c",
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  AddToCartButton: {
    backgroundColor: "#6365f1",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 12,
  },
  reviewBtn: {
    backgroundColor: "#6365f1",
    padding: 12,
    borderRadius: 8,
    paddingHorizontal: 24,
  },
  btnRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  cartText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    fontWeight: "500",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingNum: {
    color: "gray",
    marginLeft: 4,
    fontWeight: "600",
  },
  reviewText: {
    color: "gray",
    fontWeight: "600",
    marginTop: 5,
    marginLeft: "auto",
  },
  price: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 12,
  },
  storeImage: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },
  storeImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#d4d4d4",
    padding: 2,
    marginRight: 8,
    marginTop: 8,
  },
  row: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quantityRow: {
    flexDirection: "row",
    marginTop: 12,
    alignItems: "center",
  },
  qty: {
    width: 40,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
  quantityButton: {
    backgroundColor: "#6365f1",
    color: "#fff",
    fontSize: 28,
    // height: 35,
    width: 35,
    fontWeight: "400",
    overflow: "hidden",
    textAlign: "center",
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  category: {
    fontSize: 16,
    fontWeight: "500",
    color: "gray",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 6,
    padding: 7,
    backgroundColor: "#e4e4e4",
    textAlign: "center",
    paddingHorizontal: 26,
  },

  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  arButton: {
    backgroundColor: "#6365f1",
    padding: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  arText: {
    color: "#fff",
    marginLeft: 14,
    fontSize: 16,
  },
});

const mapStateToProps = state => {
  console.log("State PD: ", state);
  return {
    user: state.user,
    cart: state.cart,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCartAction: async item => {
      console.log("Item: ", item);

      try {
        const { data } = await Axios.post(
          `${constants.url}/cart/addToCart`,
          item
        );
        dispatch({
          type: ADD_TO_CART,
          payload: data.products,
        });
        console.log("Data", data);
      } catch (error) {
        console.log(error);
      }
    },
    addToCartLocal: (product, qty) => {
      dispatch({
        type: ADD_TO_CART_LOCAL,
        payload: { product, quantity: qty },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
