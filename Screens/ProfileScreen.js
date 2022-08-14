import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import { connect } from "react-redux";
import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import WorkerRequestModal from "../Components/WorkerRequestModal";
import SellerRequestModal from "../Components/SellerRequestModal";

function ProfileScreen({ user }) {
  const [sellerModelVisible, setSellerModelVisible] = useState(false);
  const [workerModelVisible, setWorkerModelVisible] = useState(false);
  const Right = () => {
    return (
      <Pressable
        onPress={() => navigation.navigate("EditProfile")}
        style={styles.editIcon}
      >
        <Entypo style={styles.iconStyle} name="edit" size={20} color="white" />
      </Pressable>
    );
  };

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.bg}>
        <Header color="white" Right={Right} />
      </View>
      <View style={styles.profileSection}>
        <Image
          style={styles.image}
          source={{
            uri: "https://res.cloudinary.com/dlxyvl6sb/image/upload/v1659467449/male-electrician-works-switchboard-with-electrical-connecting-cable_169016-15209_pxzyhk.jpg",
          }}
        />
        <Text style={styles.name}>{user.name}</Text>

        <View style={styles.addressPhoneRow}>
          <View style={styles.infoRow}>
            <AntDesign name="mail" size={20} color="gray" />
            <Text style={styles.rowText}>{user.email}</Text>
          </View>
          {user.phoneNumber && (
            <View style={styles.infoRow}>
              <AntDesign name="phone" size={20} color="gray" />
              <Text style={styles.rowText}>{user.phoneNumber}</Text>
            </View>
          )}
        </View>
        {user.address && (
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color="gray" />
            <Text style={styles.rowText}>{user.address}</Text>
          </View>
        )}
      </View>

      <Text style={styles.heading}>My Orders</Text>
      <View style={styles.orderRow}>
        <View style={styles.orderItem}>
          <MaterialCommunityIcons name="truck" size={32} color="black" />
          <Text style={styles.orderItemText}>Delivered</Text>
        </View>
        <View style={styles.orderItem}>
          <View style={styles.iconBackground}>
            <MaterialCommunityIcons
              name="truck-check-outline"
              size={32}
              color="white"
            />
          </View>

          <Text style={styles.orderItemText}>To Recieve</Text>
        </View>
        <View style={styles.orderItem}>
          <MaterialCommunityIcons name="truck" size={32} color="black" />
          <Text style={styles.orderItemText}>To ship</Text>
        </View>
        <View style={styles.orderItem}>
          <MaterialCommunityIcons name="truck" size={32} color="black" />
          <Text style={styles.orderItemText}>Cancelled</Text>
        </View>
      </View>
      <Text style={styles.heading}>My Reviews</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => setSellerModelVisible(true)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Become Seller</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setWorkerModelVisible(true)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Become Worker</Text>
        </TouchableOpacity>
      </View>
      {workerModelVisible && (
        <WorkerRequestModal
          modalVisible={workerModelVisible}
          setModalVisible={setWorkerModelVisible}
        />
      )}
      {sellerModelVisible && (
        <SellerRequestModal
          modalVisible={sellerModelVisible}
          setModalVisible={setSellerModelVisible}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: "500",
    color: "#30302f",
  },
  orderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
  },
  orderItem: {
    alignItems: "center",
    flex: 1,
  },
  orderItemText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 4,
  },
  iconBackground: {
    backgroundColor: "#818cf8",
    padding: 12,
    borderRadius: 32,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 12,
  },
  button: {
    width: "45%",
    backgroundColor: "#818cf8",
    borderRadius: 8,
    padding: 14,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  bg: {
    backgroundColor: "#818cf8",
    height: 200,
    paddingTop: 24,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 5,
    borderColor: "#fff",
  },
  profileSection: {
    alignItems: "center",
    marginTop: -75,
    width: "100%",
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: "500",
    marginTop: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  rowText: {
    color: "gray",
    fontSize: 15,
    marginLeft: 4,
  },
  addressPhoneRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-evenly",
    paddingHorizontal: 12,
  },
  editIcon: {
    backgroundColor: "rgba(232,234,237, 0.4)",
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,

    margin: 12,
  },
});

const mapStateToProps = state => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(ProfileScreen);

// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import React, { useState, useEffect, useRef } from "react";
// import { connect } from "react-redux";
// import { FontAwesome } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import Axios from "axios";
// import constants from "../assets/constants";
// import {
//   LOADING_FALSE,
//   LOADING_TRUE,
//   UPDATE_PROFILE,
// } from "../Redux/Constants";
// import ErrorBox from "../Components/ErrorBox";
// import LoadingScreen from "./LoadingScreen";
// import Header from "../Components/Header";
// import BackButton from "../Components/BackButton";

// function ProfileScreen({ user, updateProfile }) {
//   console.log("User_______________", user);
//   const [name, setName] = useState(user.name);
//   const [email, setEmail] = useState(user.email);
//   const [password, setPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [profileImage, setProfileImage] = useState(user.profileImage);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [address, setAddress] = useState(user.address);
//   const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
//   const imageRef = useRef(null);
//   const [loading, setLoading] = useState(false);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.cancelled) {
//       setLoading(true);
//       let imageData = {
//         uri: result.uri,
//         type: `test/${result.uri.split(".")[1]}`,
//         name: `test/${result.uri.split(".")[1]}`,
//       };

//       const data = new FormData();
//       data.append("file", imageData);
//       data.append("upload_preset", "sanitary");
//       const response = await Axios.post(
//         "https://api.cloudinary.com/v1_1/dlxyvl6sb/image/upload",
//         data
//       );
//       setProfileImage(response.data.url);

//       setLoading(false);
//     }
//   };

//   const onSubmit = () => {
//     setErrorMsg(null);

//     if (!password) {
//       updateProfile(
//         {
//           _id: user._id,
//           name,
//           email,
//           phoneNumber,
//           profileImage,
//           address,
//         },
//         setErrorMsg
//       );
//     } else {
//       if (newPassword !== confirmPassword) {
//         setErrorMsg("New Password is not equal to Confirm New Password");
//       } else if (newPassword.length < 6 || confirmPassword.length < 6) {
//         setErrorMsg("New Password is not equal to Confirm New Password");
//       } else {
//         setLoading(true);
//         updateProfile(
//           {
//             _id: user._id,
//             name,
//             email,
//             phoneNumber,
//             profileImage,
//             address,
//             password: password,
//             hashPassword: user.password,
//             newPassword,
//           },
//           setErrorMsg
//         );
//         setLoading(false);
//       }
//     }
//   };

//   console.log("Profile", profileImage);

//   if (loading) {
//     return <LoadingScreen />;
//   }

//   return (
//     <View style={styles.container}>
//       <Header />
//       <View style={styles.form}>
//         <View style={styles.imageContainer}>
//           <Image style={styles.image} source={{ uri: profileImage }} />

//           <FontAwesome
//             style={styles.iconStyle}
//             name="pencil"
//             size={24}
//             color="black"
//             onPress={pickImage}
//           />
//         </View>
//         {errorMsg && <ErrorBox message={errorMsg} />}

//         <TextInput
//           value={name}
//           onChangeText={setName}
//           placeholder="Enter Name"
//           style={styles.inputField}
//         />
//         <TextInput
//           value={email}
//           onChangeText={setEmail}
//           placeholder="Enter Email"
//           style={styles.inputField}
//         />

//         <TextInput
//           value={phoneNumber + ""}
//           onChangeText={setPhoneNumber}
//           placeholder="Enter Phone Number"
//           style={styles.inputField}
//         />
//         <TextInput
//           value={address}
//           onChangeText={setAddress}
//           placeholder="Enter Address"
//           style={styles.inputField}
//         />

//         <TextInput
//           value={password}
//           onChangeText={setPassword}
//           placeholder="Enter password"
//           style={styles.inputField}
//           secureTextEntry={true}
//         />
//         <TextInput
//           value={newPassword}
//           onChangeText={setNewPassword}
//           secureTextEntry={true}
//           placeholder="Enter New Password"
//           style={styles.inputField}
//         />
//         <TextInput
//           value={confirmPassword}
//           onChangeText={setConfirmPassword}
//           secureTextEntry={true}
//           placeholder="Confirm Password"
//           style={styles.inputField}
//         />

//         <TouchableOpacity onPress={onSubmit} style={styles.button}>
//           <Text style={styles.buttonText}>Update Profile</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   form: {
//     alignItems: "center",
//     justifyContent: "center",
//     flex: 1,
//     width: "75%",
//     alignSelf: "center",
//   },
//   imageContainer: {
//     height: 200,
//     width: 200,
//     borderRadius: 100,
//     marginBottom: 24,
//     position: "realtive",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 100,
//   },
//   iconStyle: {
//     position: "absolute",
//     right: 40,
//     bottom: 15,
//     color: "#fff",
//   },
//   inputField: {
//     borderColor: "#d4d4d4",
//     borderWidth: 1,
//     width: "100%",
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     marginBottom: 12,
//     borderRadius: 10,
//     fontSize: 17,
//     backgroundColor: "#fff",
//   },
//   button: {
//     backgroundColor: "#818cf8",
//     width: "100%",
//     padding: 12,
//     borderRadius: 8,
//   },
//   buttonText: {
//     textAlign: "center",
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "600",
//   },
// });

// const mapStateToProps = state => {
//   return {
//     user: state.user.user,
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     updateProfile: async (userData, setErrorMsg) => {
//       const { data } = await Axios.post(
//         `${constants.url}/users/updateProfile`,
//         userData
//       );
//       console.log("Updated user profile data", data);
//       if (data.message) {
//         setErrorMsg(data.message);
//       } else {
//         Alert.alert("Profile Updated");
//         dispatch({
//           type: UPDATE_PROFILE,
//           payload: data,
//         });
//       }
//     },
//     trueLoading: () => {
//       dispatch({
//         type: LOADING_TRUE,
//       });
//     },
//     falseLoading: () => {
//       dispatch({
//         type: LOADING_FALSE,
//       });
//     },
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
