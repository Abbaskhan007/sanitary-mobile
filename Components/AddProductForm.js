import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import LoadingIndicator from "./LoadingIndicator";
import * as ImagePicker from "expo-image-picker";
import constants from "../assets/constants";
import Axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import {
  PRODUCT_FETCH_REQUEST,
  PRODUCT_FETCH_REQUEST_FAIL,
  PRODUCT_FETCH_REQUEST_SUCCESS,
} from "../Redux/Constants";

function AddProductForm({
  seller,
  categories,
  isModalVisible,
  setModalVisible,
  storeId,
  fetchProducts,
}) {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [inStock, setInStock] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [images, setImages] = useState("");

  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImages([...images, result.uri]);
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    if (
      images.length === 0 ||
      !description ||
      !categories ||
      !price ||
      !inStock ||
      !name ||
      !shippingPrice
    ) {
      setError("Please Enter all the fields");
    } else {
      const cloudinaryImages = await Promise.all(
        images.map(async image => {
          let imageData = {
            uri: image,
            type: `test/${image.split(".")[1]}`,
            name: `test/${image.split(".")[1]}`,
          };
          const data = new FormData();
          data.append("file", imageData);
          data.append("upload_preset", "sanitary");
          const response = await Axios.post(
            "https://api.cloudinary.com/v1_1/dlxyvl6sb/image/upload",
            data
          );
          console.log(
            "Response of single Cloudinary",
            response,
            "image",
            image
          );
          return response.data.url;
        })
      );
      console.log("Cloudinary Images", cloudinaryImages);

      const data = {
        name,
        images: cloudinaryImages,
        description,
        price,
        inStock,
        shippingPrice,
        category: items,
        seller,
        store: storeId,
      };

      try {
        const response = await Axios.post(
          `${constants.url}/products/addProduct`,
          data
        );
        console.log("Response*************************", response);
        fetchProducts();
        Alert.alert("Store Created Successfully");
        setModalVisible(false);
        navigation.navigate("Seller Dashboard");
      } catch (err) {
        Alert.alert(`Add Product Failed: ${err}`);
      }
    }
    setLoading(false);
  };

  const onDeleteIcon = item => {
    console.log("Images", item, images);
    const updatedImages = images.filter(img => img !== item);
    // console.log("Item", item, updatedImages);
    setImages(updatedImages);
  };

  console.log("Items", items);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.iconStyle}
            >
              <AntDesign name="close" size={20} color="white" />
            </TouchableOpacity>
            {loading ? (
              <View style={{ height: 550 }}>
                <LoadingIndicator loading={loading} />
              </View>
            ) : (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ width: "100%" }}
              >
                <Text style={styles.title}>Create Store</Text>
                <Text style={styles.heading}>Name</Text>
                <TextInput
                  style={styles.textField}
                  placeholder="Enter Name"
                  onChangeText={setName}
                  value={name}
                />

                <Text style={styles.heading}>Price</Text>
                <TextInput
                  style={styles.textField}
                  placeholder="Enter Price"
                  onChangeText={setPrice}
                  value={price}
                />

                <Text style={styles.heading}>InStock</Text>
                <TextInput
                  style={styles.textField}
                  placeholder="Enter InStock Items"
                  onChangeText={setInStock}
                  value={inStock}
                />

                <Text style={styles.heading}>Shipping Price</Text>
                <TextInput
                  style={styles.textField}
                  placeholder="Enter Shipping Price"
                  onChangeText={setShippingPrice}
                  value={shippingPrice}
                />

                <Text style={styles.heading}>Description</Text>
                <TextInput
                  style={[
                    styles.textField,
                    { textAlignVertical: "top", height: 70 },
                  ]}
                  placeholder="Enter Description"
                  value={description}
                  onChangeText={setDescription}
                  multiline={true}
                  numberOfLines={3}
                />
                <Text style={[styles.heading, { marginBottom: 5 }]}>
                  Categories
                </Text>
                <View style={{ width: "100%" }}>
                  <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    onValueChange={value => setItems(value)}
                    items={categories}
                    placeholder={{
                      label: "Select Product Category",
                      value: null,
                    }}
                    value={items}
                    Icon={() => (
                      <AntDesign name="down" size={16} color="black" />
                    )}
                    style={{
                      ...pickerSelectStyles,
                      iconContainer: {
                        top: 15,
                        right: 12,
                      },
                    }}
                  />
                </View>
                <TouchableOpacity
                  onPress={pickImage}
                  style={styles.cameraIconContainer}
                >
                  <Ionicons name="camera-outline" size={64} color="#d4d4d4" />
                </TouchableOpacity>
                <View>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={images}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => (
                      <View style={styles.workImageContainer}>
                        <TouchableOpacity
                          onPress={() => onDeleteIcon(item)}
                          style={styles.delteIcon}
                        >
                          <AntDesign name="close" size={16} color="white" />
                        </TouchableOpacity>
                        <Image style={styles.image} source={{ uri: item }} />
                      </View>
                    )}
                  />
                </View>
                <View>
                  <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.cancelButton}>
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={onSubmit}
                      style={styles.submitButton}
                    >
                      <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(8,8,8, 0.4)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    maxHeight: 550,
  },
  title: {
    fontSize: 21,
    fontWeight: "400",
    marginBottom: 24,
    textAlign: "center",
  },
  heading: {
    textAlign: "left",
    fontSize: 18,
    alignSelf: "flex-start",
    fontWeight: "500",
    color: "#141212",
  },
  iconStyle: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(8,8,8, 0.5)",
    padding: 6,
    borderRadius: 22,
    zIndex: 50,
  },
  delteIcon: {
    position: "absolute",
    top: 4,
    right: 17,
    backgroundColor: "rgba(8,8,8, 0.5)",
    padding: 4,
    borderRadius: 22,
    zIndex: 50,
  },
  textField: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#d1d5db",
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 5,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: "400",
    paddingHorizontal: 12,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: 18,
  },
  cancelButton: {
    backgroundColor: "#EF4444",
    padding: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginRight: 18,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
  submitButton: {
    backgroundColor: "#22C55E",
    padding: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  cameraIconContainer: {
    borderWidth: 3,
    borderColor: "#d4d4d4",
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "center",
    marginVertical: 12,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 14,
  },
  workImageContainer: {
    position: "relative",
  },
  delteIcon: {
    position: "absolute",
    top: 4,
    right: 17,
    backgroundColor: "rgba(8,8,8, 0.5)",
    padding: 4,
    borderRadius: 22,
    zIndex: 50,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const mapStateToProps = state => {
  const productCategories = state.categories.map(ctg => {
    return { label: ctg.label, value: ctg.name };
  });
  return {
    categories: productCategories,
    seller: state.seller._id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: async () => {
      dispatch({ type: PRODUCT_FETCH_REQUEST });
      try {
        const { data } = await Axios.get(
          `${constants.url}/products/getProducts`
        );

        dispatch({
          type: PRODUCT_FETCH_REQUEST_SUCCESS,
          payload: data,
        });
      } catch (err) {
        console.log("Error Message", err.message);
        dispatch({
          type: PRODUCT_FETCH_REQUEST_FAIL,
          payload: err.message,
        });
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProductForm);
