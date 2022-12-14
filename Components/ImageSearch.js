import { View, Text, Touchable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Axios from "axios";
import { connect } from "react-redux";
import { PRODUCT_SEARCH } from "../Redux/Constants";
import constants from "../assets/constants";

function ImageSearch({ fetchProducts }) {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      let imageData = {
        uri: result.uri,
        type: `image/jpg`,
        name: `test.jpg`,
      };
      console.log("ImageData----", imageData);
      try {
        const data = new FormData();
        data.append("file", imageData);
        const response = await Axios.post(
          "http://127.0.0.1:4000/flaskSearchImage",
          data
        );
        console.log("Response ------", response.data);
        const public_ids = Object.values(response.data).map(
          item => item.split("/")[1].split(".")[0]
        );
        console.log("Public Ids", public_ids);
        const productData = await Axios.post(
          `${constants.url}/products/imageSearch`,
          public_ids
        );

        console.log("Product Data after image search: ", productData);
        fetchProducts(productData.data);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  };
  return (
    <View style={{ marginLeft: 15 }}>
      <TouchableOpacity onPress={pickImage}>
        <AntDesign name="camerao" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: async data => {
      dispatch({
        type: PRODUCT_SEARCH,
        payload: data,
      });
    },
  };
};

//  ImageSearch;
export default connect(null, mapDispatchToProps)(ImageSearch);
