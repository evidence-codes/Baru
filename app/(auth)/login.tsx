import { SafeAreaView, View } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth";
import { Response } from "@/constants/ApiResponse";
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { AlertCircleIcon } from "@/components/ui/icon";
import * as SecureStore from "expo-secure-store";

interface LoginData {
  accessToken: string;
  user: {
    fullName: string;
    phoneNumber: string;
    email: string;
  };
}

export default function Login() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [email, setEmail] = useState((params.email as string) || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Check if all fields have values
  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const { mutate: loginMutation } = useMutation({
    mutationFn: async () => {
      const loginData = { email, password };
      const response = await login(loginData);
      return response.data as Response;
    },
    onSuccess: async (data: Response) => {
      if (data.success) {
        const loginData = data.data as LoginData;
        const userInfo = {
          accessToken: loginData.accessToken,
          fullName: loginData.user.fullName,
          phoneNumber: loginData.user.phoneNumber,
          email: loginData.user.email,
        };
        console.log(userInfo);
        await SecureStore.setItemAsync("userInfo", JSON.stringify(userInfo));
        // router.push({
        //   pathname: "/(tabs)/home",
        // });
        router.push("/(tabs)/home");
      } else {
        console.error(data.message);
        setErrorMessage(data.message);
      }
    },
    onError: (error: any) => {
      if (error.response) {
        const backendErrorMessage =
          error.response.data?.message || "An error occurred";
        setErrorMessage(backendErrorMessage);
      } else {
        setErrorMessage("An error occurred while trying to Login.");
      }
      console.error("Error Logging in:", error.response?.data?.message);
    },
  });

  // Handle form submission
  const handleSubmit = async () => {
    if (isFormValid) {
      setLoading(true); // Show loading screen

      // Create a promise for the setTimeout
      const timeoutPromise = new Promise((resolve) =>
        setTimeout(resolve, 9000)
      );

      try {
        // Start both the timeout and the login mutation
        const [loginResponse] = await Promise.allSettled([
          loginMutation(),
          timeoutPromise,
        ]);

        // Process the response from the login mutation
        if (loginResponse.status === "fulfilled") {
          console.log("Login successful:", loginResponse.value);
        } else {
          console.log("Login failed:", loginResponse.reason);
        }
      } catch (error) {
        console.error("An error occurred during login:", error);
      } finally {
        setLoading(false); // Hide loading screen
      }
    } else {
      console.log("Please ensure all fields are filled out correctly.");
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Profile Setup Form */}
      <VStack className="p-4 mb-4 w-full">
        <Text className="font-roboto_bold text-[32px] text-black">
          Welcome Back
        </Text>
        <Text className="font-inter_regular text-[12px] text-[#979797] mt-4">
          Let us get you back to sending and receiving
        </Text>
      </VStack>

      <VStack className="p-4">
        {/* Form Inputs */}

        {/* Email Input */}
        <Input
          variant="outline"
          size="md"
          className={`mb-4 h-14 rounded-lg ${
            email ? "bg-[#ffffff]" : "bg-[#E5E5E5] border-outline-0"
          }`}
        >
          <InputField
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            className={`font-roboto_regular text-[12px] ${
              email ? "text-black" : "text-[#757575]"
            }`}
          />
        </Input>

        {/* Password Input */}
        <Input
          variant="outline"
          size="md"
          className={`mb-4 h-14 rounded-lg ${
            password ? "bg-[#ffffff]" : "bg-[#E5E5E5] border-outline-0"
          }`}
        >
          <InputField
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            className={`font-roboto_regular text-[12px] ${
              password ? "text-black" : "text-[#757575]"
            }`}
          />
          <InputSlot>
            <FontAwesome
              name={showPassword ? "eye" : "eye-slash"}
              size={16}
              color={`${password ? "#000000" : "#757575"}`}
              onPress={() => setShowPassword(!showPassword)}
              style={{ marginRight: 10 }}
            />
          </InputSlot>
        </Input>
      </VStack>

      {errorMessage && (
        <VStack className="p-4">
          <Alert action="error" className="gap-3">
            <AlertIcon as={AlertCircleIcon} size="lg" />
            <AlertText
              className="text-typography-900 font-inter_semibold text-[14px]"
              size="sm"
            >
              {errorMessage}
            </AlertText>
          </Alert>
        </VStack>
      )}

      {/* Submit Button */}
      <VStack className="px-4 flex-1 justify-end mb-4">
        <Button
          size="lg"
          variant="solid"
          action="primary"
          className={`w-full h-12 rounded-[8px] mt-6 mb-4 shadow-lg shadow-black/50 ${
            isFormValid ? "bg-[#2B63E1]" : "bg-[#979797]"
          }`}
          onPress={handleSubmit}
          disabled={!isFormValid}
        >
          <ButtonText className="font-roboto_medium text-[16px] text-white">
            Continue
          </ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
}

// LoadingScreen component
function LoadingScreen() {
  const message = "Wait while we set you up";
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Toggle visibility every 500ms
    const intervalId = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 700);

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  return (
    <View className="flex-1 bg-white justify-center items-center px-4">
      <Text
        className="font-roboto_bold text-[28px] text-black"
        style={{ opacity: isVisible ? 1 : 0.3 }} // Adjust opacity dynamically
      >
        {message}
      </Text>
    </View>
  );
}
