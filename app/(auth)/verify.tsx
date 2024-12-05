import { SafeAreaView, TextInput } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import React, { useState, useRef, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { verifyOTP, resendOTP } from "@/api/auth";
import { AxiosResponse } from "axios";
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { AlertCircleIcon } from "@/components/ui/icon";

interface OTPProps {
  email: string;
  otp: string;
}

// Define the expected response structure
type verifyOTPResponse = {
  success: boolean;
  message: string;
};

export default function OTP() {
  const router = useRouter();
  const params = useLocalSearchParams() as Partial<OTPProps>;

  const { email } = params;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30); // Countdown timer
  const [isTimerActive, setIsTimerActive] = useState(false); // To check if timer is running
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message

  // Create refs for each input field
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Mutation to send OTP
  const {
    mutate: verifyOTPMutation,
    isLoading: isLoadingOTP,
    isError,
    error,
  } = useMutation<
    verifyOTPResponse,
    Error,
    string,
    AxiosResponse<verifyOTPResponse>
  >({
    mutationFn: async (otp) => {
      if (!email) {
        throw new Error("Email is required");
      }
      const data = { email, otp };
      console.log(data);
      const response = await verifyOTP(data);
      return response.data as verifyOTPResponse;
    },
    onSuccess: (data) => {
      if (data.success) {
        router.push({
          pathname: "/(auth)/profile",
          params: { email },
        });
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
        setErrorMessage("An error occurred while sending OTP.");
      }
      console.error("Error sending OTP:", error.response?.data?.message);
    },
  });

  const handleInputChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input when a digit is entered
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus(); // Focus the next input if it exists
    }
  };

  useEffect(() => {
    setIsTimerActive(true); // Start the countdown when the page loads

    let interval: NodeJS.Timeout | null = null;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1); // Decrement the timer every second
      }, 1000);
    } else if (timer === 0) {
      if (interval) {
        clearInterval(interval); // Clear the interval when the timer reaches 0
      }
      setIsTimerActive(false); // Stop the timer when it reaches 0
    }

    return () => {
      if (interval) {
        clearInterval(interval); // Cleanup interval when component unmounts
      }
    };
  }, [isTimerActive, timer]);

  const handleResendCode = async () => {
    setTimer(30); // Reset timer to 30 seconds
    setIsTimerActive(true); // Start the countdown again
    if (!email) {
      throw new Error("Email is required");
    }
    await resendOTP(email); // Resend OTP
  };

  const handleContinue = () => {
    const otpString = otp.join("");
    verifyOTPMutation(otpString); // Send OTP for validation
  };

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
          Enter the OTP code
        </Text>

        <Text className="font-inter_regular text-[12px] text-[#979797] mt-4">
          We sent an OTP to your email at {email}. Please enter the OTP code
        </Text>
      </VStack>

      <VStack className="p-4">
        <VStack className="flex-row justify-between w-full">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              value={digit}
              maxLength={1}
              onChangeText={(value) => handleInputChange(value, index)}
              keyboardType="number-pad"
              textAlign="center"
              className="w-[14%] h-14 bg-[#E5E5E5] rounded-lg px-2 outline-none text-[#000] font-inter_regular text-[14px] text-center"
            />
          ))}
        </VStack>
      </VStack>

      <VStack>
        <Text
          onPress={handleResendCode}
          className={`font-roboto_medium text-[12px] mt-4
          text-center ${timer > 0 ? "text-[#979797]" : "text-[#2B63E1]"}`}
        >
          {timer > 0 ? `Send code again in (${timer}s)` : "Resend Code"}
        </Text>
      </VStack>

      <VStack className="px-4">
        <Button
          size="lg"
          variant="solid"
          action="primary"
          className="w-full bg-[#2B63E1] h-12 rounded-[8px] mt-6 mb-4 shadow-lg shadow-black/50"
          onPress={handleContinue}
          disabled={isLoadingOTP || !email}
        >
          <ButtonText className="font-roboto_medium text-[16px] text-white">
            {isLoadingOTP ? "Sending..." : "Continue"}
          </ButtonText>
        </Button>
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
    </SafeAreaView>
  );
}
