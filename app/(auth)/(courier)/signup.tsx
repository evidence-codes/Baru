import { SafeAreaView, ScrollView, View } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { Input, InputField } from "@/components/ui/input";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from "@/components/ui/select";
import { ChevronDownIcon } from "@/components/ui/icon";
import { useMutation } from "@tanstack/react-query";
import { Response } from "@/constants/ApiResponse";
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { AlertCircleIcon } from "@/components/ui/icon";
import { RegisterCourier, register as registerCourier } from "@/api/courier";
import * as SecureStore from "expo-secure-store";

export default function Signup() {
  //   const [fullName, setFullName] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [phoneNumber, setPhoneNumber] = useState("");
  //   const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseExpiry, setLicenseExpiry] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  let parsedEmail: string;

  SecureStore.getItemAsync("userInfo").then((userInfo) => {
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      parsedEmail = parsedUserInfo?.email;
    }
  });

  const router = useRouter();

  const { mutate: register } = useMutation({
    mutationFn: async () => {
      const courierData: RegisterCourier = {
        address,
        licenseNumber,
        licenseExpiry,
        vehicleType: selectedValue,
        vehicleMake,
        vehicleModel,
        vehicleYear,
        vehicleColor,
      };

      const response = await registerCourier(courierData);
      return response.data as Response;
    },
    onSuccess: (data) => {
      if (data.success) {
        router.push({
          pathname: "/(auth)/(courier)/login",
          params: { email: parsedEmail },
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
        setErrorMessage("An error occurred while creating courier.");
      }
      console.error("Error creating courier:", error.response?.data?.message);
    },
  });

  const handleSubmit = () => {
    register();

    useEffect(() => {
      if (errorMessage) {
        const timer = setTimeout(() => {
          setErrorMessage(null); // Clear the error message after 3 seconds
        }, 3000);

        // Cleanup the timer when the component is unmounted or errorMessage changes
        return () => clearTimeout(timer);
      }
    }, [errorMessage]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack className="p-4 mb-4 w-full">
          <Text className="font-roboto_bold text-[32px] text-black">
            Driver Information
          </Text>
          <Text className="font-inter_regular text-[12px] text-[#979797] mt-4">
            Please provide your personal and vehicle details to proceed.
          </Text>
        </VStack>

        <VStack className="p-4">
          {/* Personal Details */}
          <Text className="font-roboto_medium text-[16px] mb-2">
            Personal Details:
          </Text>
          {/* <Input variant="outline" size="md" className="mb-4 h-12 rounded-lg">
            <InputField
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
            />
          </Input>
          <Input variant="outline" size="md" className="mb-4 h-12 rounded-lg">
            <InputField
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
            />
          </Input>
          <Input variant="outline" size="md" className="mb-4 h-12 rounded-lg">
            <InputField
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="numeric"
            />
          </Input>
          <Input variant="outline" size="md" className="mb-4 h-12 rounded-lg">
            <InputField
              placeholder="Date of Birth"
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
            />
          </Input> */}
          <Input variant="outline" size="md" className="mb-4 h-12 rounded-lg">
            <InputField
              placeholder="Residential Address"
              value={address}
              onChangeText={setAddress}
              className="font-roboto_regular text-[12px]"
            />
          </Input>

          {/* Government-Issued Identification */}
          <Text className="font-roboto_medium text-[16px] mb-2">
            Government-Issued Identification:
          </Text>
          <Input variant="outline" size="md" className="mb-4 h-12 rounded-lg">
            <InputField
              placeholder="Driver's License Number"
              value={licenseNumber}
              onChangeText={setLicenseNumber}
              className="font-roboto_regular text-[12px]"
            />
          </Input>
          <Input variant="outline" size="md" className="mb-4 h-12 rounded-lg">
            <InputField
              placeholder="Driver's License Expiration Date"
              value={licenseExpiry}
              onChangeText={setLicenseExpiry}
              className="font-roboto_regular text-[12px]"
            />
          </Input>
          {/* Upload Placeholder for Driver’s License */}
          {/* <Text className="text-[12px] text-[#757575] mb-4">
            Upload your Driver’s License (scanned copy or photo).
          </Text> */}

          {/* Vehicle Details */}
          <Text className="font-roboto_medium text-[16px] mb-2">
            Vehicle Details:
          </Text>
          <VStack className="my-2">
            <Select
              onValueChange={(value) => setSelectedValue(value)}
              className=""
            >
              <SelectTrigger
                variant="outline"
                size="md"
                className={`flex-row justify-between items-center h-12 rounded-lg  ${
                  selectedValue
                    ? "bg-[#ffffff] "
                    : "bg-[#E5E5E5] border-outline-0"
                }`}
              >
                <SelectInput
                  placeholder="Select Category"
                  className="font-roboto_regular text-[12px]"
                />
                <SelectIcon className="mr-3" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem
                    label="Motorcycle"
                    value="bike"
                    className="font-roboto_regular text-[12px]"
                  />
                  <SelectItem
                    label="Car"
                    value="car"
                    className="font-roboto_regular text-[12px]"
                  />
                  <SelectItem
                    label="Truck"
                    value="truck"
                    className="font-roboto_regular text-[12px]"
                  />
                </SelectContent>
              </SelectPortal>
            </Select>
          </VStack>
          <Input variant="outline" size="md" className="mb-4 h-12 rounded-lg">
            <InputField
              placeholder="Vehicle Make (e.g., Toyota, Honda)"
              value={vehicleMake}
              onChangeText={setVehicleMake}
              className="font-roboto_regular text-[12px]"
            />
          </Input>
          <Input variant="outline" size="md" className="mb-4 h-12 rounded-lg">
            <InputField
              placeholder="Vehicle Model (e.g., Corolla, Civic)"
              value={vehicleModel}
              onChangeText={setVehicleModel}
              className="font-roboto_regular text-[12px]"
            />
          </Input>
          <Input variant="outline" size="md" className="mb-4 h-12 rounded-lg">
            <InputField
              placeholder="Vehicle Year (e.g., 2021)"
              value={vehicleYear}
              onChangeText={setVehicleYear}
              className="font-roboto_regular text-[12px]"
            />
          </Input>
          <Input variant="outline" size="md" className="mb-10 h-12 rounded-lg">
            <InputField
              placeholder="Vehicle Color"
              value={vehicleColor}
              onChangeText={setVehicleColor}
              className="font-roboto_regular text-[12px]"
            />
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
      </ScrollView>

      {/* Submit Button */}
      <VStack className="px-4 flex-1 justify-end mt-4 mb-4">
        <Button
          size="lg"
          variant="solid"
          action="primary"
          className="w-full bg-[#2B63E1] h-12 rounded-[8px] mt-6 mb-4 shadow-lg shadow-black/50"
          onPress={handleSubmit}
        >
          <ButtonText className="font-roboto_medium text-[16px] text-white">
            Submit
          </ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
}
