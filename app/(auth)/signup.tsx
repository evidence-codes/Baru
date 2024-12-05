import { SafeAreaView } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Link, LinkText } from "@/components/ui/link";
import { Input, InputField } from "@/components/ui/input";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { sendOTP } from "@/api/auth";
import { useState, useEffect } from "react";
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert"; // Assuming you are using NativeBase for Alerts
import { AlertCircleIcon } from "@/components/ui/icon";

// Define the expected response structure
type SendOTPResponse = {
  success: boolean;
  message: string;
};

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for storing error message

  // Define the mutation to send OTP
  const {
    mutate: sendOTPMutation,
    isLoading: isLoadingAssertion,
    isError,
    error,
  } = useMutation<
    SendOTPResponse,
    Error,
    string,
    AxiosResponse<SendOTPResponse>
  >({
    mutationFn: async (email) => {
      const response = await sendOTP(email);
      return response.data as SendOTPResponse;
    },
    onSuccess: (data) => {
      if (data.success) {
        router.push({
          pathname: "/(auth)/verify",
          params: { email },
        }); // Navigate to verify screen on success
      } else {
        console.error(data.message); // Handle error message returned from API
        setErrorMessage(data.message); // Set the error message for display
      }
    },
    onError: (error: any) => {
      // Check if the error has a response and handle it properly
      if (error.response) {
        // Extract error message from the backend response
        const backendErrorMessage =
          error.response.data?.message || "An error occurred";
        setErrorMessage(backendErrorMessage); // Set the error message for display
      } else {
        setErrorMessage("An error occurred while sending OTP."); // Fallback error message
      }
      console.error("Error sending OTP:", error.response.data?.message);
    },
  });

  const isLoading = isLoadingAssertion;

  const handleVerify = () => {
    sendOTPMutation(email); // Call the mutation with the email
  };

  // Clear the error message after 3 seconds
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null); // Clear the error message after 3 seconds
      }, 3000);

      // Cleanup the timer when the component is unmounted or errorMessage changes
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <VStack className="p-4 mb-4 w-full">
        <Text className="font-roboto_bold text-[32px] text-black">
          Enter your email
        </Text>

        <Text className="font-inter_regular text-[14px] text-[#979797] mt-4">
          We will send an OTP to you on this email
        </Text>
      </VStack>

      <VStack className="p-4">
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          className="w-full h-14 bg-[#E5E5E5] rounded-lg px-2 border-outline-0"
        >
          <InputField
            placeholder="Email Address"
            className="text-[#757575] font-inter_regular text-[14px] outline-none"
            value={email}
            onChangeText={setEmail} // Update email state
          />
        </Input>
      </VStack>

      <VStack className="px-4">
        <Button
          size="lg"
          variant="solid"
          action="primary"
          className="w-full bg-[#2B63E1] h-12 rounded-[8px] mt-6 mb-4 shadow-lg shadow-black/50"
          onPress={handleVerify}
          disabled={isLoading || !email} // Disable when loading or no email
        >
          <ButtonText className="font-roboto_medium text-[16px] text-white">
            {isLoading ? "Sending..." : "Send me the code"}
          </ButtonText>
        </Button>
      </VStack>

      {errorMessage && (
        <VStack className="p-4">
          <Alert action="error" className="gap-3">
            {/* Use error icon instead of bomb icon */}
            <AlertIcon as={AlertCircleIcon} size="lg" />{" "}
            {/* Replace with the error icon */}
            <AlertText
              className="text-typography-900 font-inter_semibold text-[14px]"
              size="sm"
            >
              {/* <Text className="mr-2 font-semibold text-typography-900">
                Error:
              </Text> */}
              {errorMessage} {/* Display the error message */}
            </AlertText>
          </Alert>
        </VStack>
      )}

      <VStack className="flex-1 justify-end items-center p-4">
        <Text className="font-inter_regular text-[12px] text-[#979797] text-center">
          By continuing, you consent to receive messages via WhatsApp, SMS, or
          RCS, including those sent through automated methods, from Barῦ and its
          affiliates and also agree to our{" "}
          <Link className="" isExternal>
            <LinkText className="font-inter_regular text-[12px] no-underline">
              Terms of Service
            </LinkText>
          </Link>
          and{" "}
          <Link isExternal>
            <LinkText className="font-inter_regular text-[12px] no-underline">
              Privacy Policy
            </LinkText>
          </Link>
        </Text>
      </VStack>
    </SafeAreaView>
  );
}
