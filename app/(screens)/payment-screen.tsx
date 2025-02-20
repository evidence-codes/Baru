import React from "react";
import { SafeAreaView, Text, Alert } from "react-native";
import { Paystack } from "react-native-paystack-webview";
import { useAuth } from "@/context/AuthContext";
import { useLocalSearchParams } from "expo-router";

export default function PaystackPaymentScreen() {
  const { user } = useAuth();
  const { amount } = useLocalSearchParams();

  const handleSuccess = (response: any) => {
    Alert.alert(
      "Payment Successful",
      `Transaction Ref: ${response.transactionRef}`
    );
    // Navigate back or update the state
  };

  const handleCancel = () => {
    Alert.alert("Payment Cancelled");
  };

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <Paystack
        paystackKey="pk_test_e0a87b6068d91efdb6c22515393c62cad641b299"
        amount={parseFloat(amount as string)}
        billingEmail={user?.email || "example@example.com"}
        activityIndicatorColor="green"
        onCancel={handleCancel}
        onSuccess={handleSuccess}
        autoStart={true}
      />
      <Text className="mt-4 text-lg">Processing Payment...</Text>
    </SafeAreaView>
  );
}
