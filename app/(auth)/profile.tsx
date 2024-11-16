import { SafeAreaView, View } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { Input, InputField } from "@/components/ui/input";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Profile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Password validation checks
  const passwordChecks = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[^A-Za-z0-9]/.test(password),
    passwordsMatch: confirmPassword === password,
  };

  const isPasswordValid =
    passwordChecks.minLength &&
    passwordChecks.hasUppercase &&
    passwordChecks.hasNumber &&
    passwordChecks.hasSpecialChar &&
    passwordChecks.passwordsMatch;

  // Handle form submission
  const handleProfileSubmit = () => {
    if (isPasswordValid) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        router.push("/(tabs)/home"); // Navigate to the next screen
      }, 5000);
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
          Set up your Profile
        </Text>
        <Text className="font-inter_regular text-[12px] text-[#979797] mt-4">
          Create a profile to begin delivering faster....
        </Text>
      </VStack>

      <VStack className="p-4">
        {/* Form Inputs */}
        <Input
          variant="outline"
          size="md"
          className="mb-4 h-12 rounded-lg bg-[#E5E5E5]"
        >
          <InputField
            placeholder="First name"
            value={firstName}
            onChangeText={setFirstName}
            className="font-roboto_regular text-[#757575] text-[12px]"
          />
        </Input>
        <Input
          variant="outline"
          size="md"
          className="mb-4 h-12 rounded-lg bg-[#E5E5E5]"
        >
          <InputField
            placeholder="Last name"
            value={lastName}
            onChangeText={setLastName}
            className="font-roboto_regular text-[#757575] text-[12px]"
          />
        </Input>
        <Input
          variant="outline"
          size="md"
          className="mb-4 h-12 rounded-lg bg-[#E5E5E5]"
        >
          <InputField
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            className="font-roboto_regular text-[#757575] text-[12px]"
          />
        </Input>
        {/* Password Input */}
        <Input
          variant="outline"
          size="md"
          className="mb-4 h-12 rounded-lg bg-[#E5E5E5]"
        >
          <InputField
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="font-roboto_regular text-[#757575] text-[12px]"
          />
        </Input>

        {/* Password Requirements */}
        <VStack className="mb-4">
          <Text className="font-inter_regular text-[10px] text-[#979797]">
            Your password should be:
          </Text>
          {[
            {
              label: "Minimum of 8 characters",
              isValid: passwordChecks.minLength,
            },
            {
              label: "At least one uppercase letter",
              isValid: passwordChecks.hasUppercase,
            },
            { label: "At least one number", isValid: passwordChecks.hasNumber },
            {
              label: "At least one special character",
              isValid: passwordChecks.hasSpecialChar,
            },
          ].map(({ label, isValid }, index) => (
            <Text
              key={index}
              className="flex-row items-center text-[10px] text-[#757575] font-inter_regular"
            >
              <FontAwesome
                name={isValid ? "check-circle" : "times-circle"}
                color={isValid ? "green" : "red"}
              />{" "}
              {label}
            </Text>
          ))}
        </VStack>

        {/* Confirm Password Input */}
        <Input
          variant="outline"
          size="md"
          className="mb-4 h-12 rounded-lg bg-[#E5E5E5]"
        >
          <InputField
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            className="font-roboto_regular text-[#757575] text-[12px]"
          />
        </Input>

        {/* Confirm Password Requirement */}
        <Text className="flex-row items-center text-[10px] text-[#757575] font-inter_regular">
          <FontAwesome
            name={
              passwordChecks.passwordsMatch ? "check-circle" : "times-circle"
            }
            color={passwordChecks.passwordsMatch ? "green" : "red"}
          />{" "}
          Passwords match
        </Text>
      </VStack>

      {/* Submit Button */}
      <VStack className="px-4 flex-1 justify-end mb-4">
        <Button
          size="lg"
          variant="solid"
          action="primary"
          className="w-full bg-[#2B63E1] h-12 rounded-[8px] mt-6 mb-4 shadow-lg shadow-black/50"
          onPress={handleProfileSubmit}
          disabled={!isPasswordValid}
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
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + message[index]);
      setIndex((prev) => prev + 1);
    }, 100);

    if (index === message.length) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [index]);

  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Text className="font-roboto_bold text-[30px] text-black">
        {displayedText}
      </Text>
    </View>
  );
}
