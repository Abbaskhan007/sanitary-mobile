import { View, Text, Alert, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";

import Axios from "axios";
import constants from "../assets/constants";
import Header from "../Components/Header";

export default function Checkout() {
  const [publishableKey, setPublishableKey] = useState("");
  const stripe = useStripe();

  const fetchPublishableKey = async () => {
    try {
      const response = await Axios.get(`${constants.url}/config`);
      setPublishableKey(response.data.publishableKey);
    } catch (e) {
      console.log(e);
      console.warn("Unable to fetch publishable key. Is your server running");
      Alert.alert(
        "Error",
        "Unable to fetch publishable key. Is you server running"
      );
    }
  };

  const handlePayment = async () => {
    try {
      const { data } = await Axios.post(`${constants.url}/pay`, {
        amount: 400,
        name: "khan",
        orderId: "007",
      });
      console.log("Response of Stripe", data);
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: data.clientSecret,
      });
      if (initSheet.error) {
        return Alert.alert(
          "Error in initiating payment sheet: ",
          initSheet.error.message
        );
      }
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret: data.clientSecret,
      });
      if (presentSheet.error)
        return Alert.alert(
          "Error in present payment Sheet: ",
          presentSheet.error.message
        );
      Alert.alert(
        "Order Completed",
        "Thank you for paying. Your Order is on the way"
      );
    } catch (error) {
      console.log("Error", error);
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    fetchPublishableKey();
  }, []);

  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="merchant.identifier"
    >
      <Header />
      <Button title="Pay" onPress={handlePayment} />
    </StripeProvider>
  );
}
