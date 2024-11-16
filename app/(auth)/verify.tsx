import { SafeAreaView, TextInput } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "expo-router";

export default function OTP() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30); // Countdown timer
  const [isTimerActive, setIsTimerActive] = useState(false); // To check if timer is running

  // Create refs for each input field
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Handle OTP input change
  const handleInputChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input when a digit is entered
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus(); // Focus the next input if it exists
    }
  };

  // Countdown timer logic
  useEffect(() => {
    // Start the timer automatically when the component mounts
    setIsTimerActive(true); // Start the countdown as soon as the page loads

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

    // Cleanup interval when the component unmounts or when the timer stops
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTimerActive, timer]); // Runs when `isTimerActive` or `timer` state changes

  const handleResendCode = () => {
    setTimer(30); // Reset timer to 30 seconds
    setIsTimerActive(true); // Start the countdown again
  };

  const handleProfile = () => {
    router.push("/(tabs)/home");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <VStack className="p-4 mb-4 w-full">
        <Text className="font-roboto_bold text-[32px] text-black">
          Enter the OTP code
        </Text>

        <Text className="font-inter_regular text-[12px] text-[#979797] mt-4">
          We sent an OTP to your number at +234**********. Please enter the OTP
          code
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
          className={`font-roboto_medium text-[12px] ${
            timer > 0 ? "text-[#979797]" : "text-[#2B63E1]"
          } mt-4 text-center`}
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
          onPress={handleProfile}
        >
          <ButtonText className="font-roboto_medium text-[16px] text-white">
            Continue
          </ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
}
