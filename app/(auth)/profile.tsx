import { SafeAreaView, ScrollView, View } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { registerProfile, RegisterProfile } from "@/api/auth";
import { Response } from "@/constants/ApiResponse";
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { AlertCircleIcon } from "@/components/ui/icon";

export default function Profile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();
  const params = useLocalSearchParams();
  const { email } = params;

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

  // TanStack Query mutation for registering profile
  const { mutate: register } = useMutation({
    mutationFn: async () => {
      if (!email) {
        throw new Error("Email is required");
      }
      const profileData: RegisterProfile = {
        fullName: `${firstName.trim()} ${lastName.trim()}`,
        email: email as string,
        phoneNumber: phoneNumber,
        password: password,
      };

      const response = await registerProfile(profileData);
      return response.data as Response;
    },
    onSuccess: (data) => {
      if (data.success) {
        router.push({
          pathname: "/(auth)/login",
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

  // Handle form submission
  const handleProfileSubmit = () => {
    if (isPasswordValid) {
      register();
    } else {
      console.log("Please ensure all fields are filled out correctly.");
    }
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
      <ScrollView showsVerticalScrollIndicator={false}>
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
            className={`mb-4 h-12 rounded-lg ${
              firstName ? "bg-[#ffffff]" : "bg-[#E5E5E5] border-outline-0"
            }`}
          >
            <InputField
              placeholder="First name"
              value={firstName}
              onChangeText={setFirstName}
              className={`font-roboto_regular text-[12px] ${
                firstName ? "text-black" : "text-[#757575]"
              }`}
            />
          </Input>
          <Input
            variant="outline"
            size="md"
            className={`mb-4 h-12 rounded-lg ${
              lastName ? "bg-[#ffffff]" : "bg-[#E5E5E5] border-outline-0"
            }`}
          >
            <InputField
              placeholder="Last name"
              value={lastName}
              onChangeText={setLastName}
              className={`font-roboto_regular text-[12px] ${
                lastName ? "text-black" : "text-[#757575]"
              }`}
            />
          </Input>
          <Input
            variant="outline"
            size="md"
            className={`mb-4 h-12 rounded-lg ${
              phoneNumber ? "bg-[#ffffff]" : "bg-[#E5E5E5] border-outline-0"
            }`}
          >
            <InputField
              placeholder="Phone"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              className={`font-roboto_regular text-[12px] ${
                phoneNumber ? "text-black" : "text-[#757575]"
              }`}
              keyboardType="numeric"
            />
          </Input>
          {/* Password Input */}
          <Input
            variant="outline"
            size="md"
            className={`mb-4 h-12 rounded-lg ${
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
              {
                label: "At least one number",
                isValid: passwordChecks.hasNumber,
              },
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
            className={`mb-4 h-12 rounded-lg ${
              confirmPassword ? "bg-[#ffffff]" : "bg-[#E5E5E5] border-outline-0"
            }`}
          >
            <InputField
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              className={`font-roboto_regular text-[12px] ${
                confirmPassword ? "text-black" : "text-[#757575]"
              }`}
            />
            <InputSlot>
              <FontAwesome
                name={showConfirmPassword ? "eye" : "eye-slash"}
                size={16}
                color={`${confirmPassword ? "#000000" : "#757575"}`}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ marginRight: 10 }}
              />
            </InputSlot>
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
      </ScrollView>

      {/* Submit Button */}
      <VStack className="px-4 flex-1 justify-end mt-4 mb-4">
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
