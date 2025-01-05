import { SafeAreaView } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
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
import { useState } from "react";
import { FontAwesome5, Fontisto } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useForm, FormData } from "@/context/FormContext";
import { useMutation } from "@tanstack/react-query";
import { Response } from "@/constants/ApiResponse";
import { PriceData, calculatePrice } from "@/api/package";

export default function PackageDetails() {
  const router = useRouter();
  const { updateFormData, formData } = useForm();

  const [selectedValue, setSelectedValue] = useState<string>("");
  const [packageInput, setPackageInput] = useState<string>("");
  const [packageWeight, setPackageWeight] = useState<number>(0);
  const [quantityValue, setQuantityValue] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [receiverName, setReceiverName] = useState<string>("");
  const [receiverPhone, setReceiverPhone] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const options = [
    {
      label: "Motorcycle",
      value: "bike",
      icon: Fontisto,
      iconName: "motorcycle",
    },
    { label: "Car", value: "car", icon: Fontisto, iconName: "car" },
    { label: "Truck", value: "truck", icon: FontAwesome5, iconName: "truck" },
  ];

  // const {mutate: submitMutation} = useMutation({
  //   mutationFn: async (data: FormData) => {
  //     updateFormData({ category: selectedValue, packageName: packageInput, weight: Number(packageWeight), quantity: Number(quantityValue), value: Number(value), preferredVehicle: [selectedVehicle] });
  //     const response = await createPackage(data)
  //     return response.data as Response;
  //   },
  //   onSuccess: async (data: Response) => {
  //     if (data.success) {
  //       router.push("")
  //     } else {
  //       console.error(data.message);
  //       setErrorMessage(data.message);
  //     }
  //   },
  //   onError: (error: any) => {
  //     if (error.response) {
  //       const backendErrorMessage =
  //         error.response.data?.message || "An error occurred";
  //       setErrorMessage(backendErrorMessage);
  //     } else {
  //       setErrorMessage("An error occurred while creating a package.");
  //     }
  //     console.error("Error creating a package:", error.response?.data?.message);
  //   },
  // })

  // const handleSubmit = () => {
  //   submitMutation(formData)
  // };

  const handleNext = async () => {
    const vehicle = options.find(
      (option) => option.label === selectedVehicle
    )?.value;
    const fetchPrice = async () => {
      if (
        !formData ||
        !formData.distance ||
        typeof packageWeight !== "number"
      ) {
        console.warn("Missing required form data for price calculation.");
        return;
      }

      try {
        const priceData: PriceData = {
          weight: packageWeight,
          distance: formData.distance,
          category: selectedValue || "normal",
          preferredVehicle: vehicle || "bike",
        };

        const response = await calculatePrice(priceData);
        const costData = (await response.data) as Response;

        if (costData?.data) {
          const cost = costData.data as unknown as number;

          return cost;
        } else {
          console.warn("Price data not found in response.");
        }
      } catch (error) {
        console.error("Error calculating price:", error);
      }
    };

    try {
      const cost = await fetchPrice(); // Wait for the promise to resolve
      updateFormData({
        category: selectedValue,
        packageName: packageInput,
        weight: Number(packageWeight),
        quantity: Number(quantityValue),
        value: Number(value),
        receiverName: receiverName,
        receiverPhoneNumber: receiverPhone,
        preferredVehicle: vehicle,
        deliveryCost: cost,
      });
      router.push("/(screens)/map");
    } catch (error) {
      console.error("Error calculating price:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FFFFFF] px-4">
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack className="mt-6">
          <VStack className="mb-4">
            <Text className="font-roboto_regular text-[16px] text-black">
              Category Details
            </Text>
            <VStack className="mt-2">
              <Select
                onValueChange={(value) => setSelectedValue(value)}
                className=""
              >
                <SelectTrigger
                  variant="outline"
                  size="md"
                  className={`flex-row justify-between items-center h-14 rounded-lg  ${
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
                      label="Fragile"
                      value="fragile"
                      className="font-roboto_regular text-[12px]"
                    />
                    <SelectItem
                      label="Normal"
                      value="normal"
                      className="font-roboto_regular text-[12px]"
                    />
                    <SelectItem
                      label="Oversized"
                      value="oversized"
                      className="font-roboto_regular text-[12px]"
                    />
                  </SelectContent>
                </SelectPortal>
              </Select>
            </VStack>
          </VStack>

          <VStack className="mb-4">
            <Text className="font-roboto_regular text-[16px] text-black">
              Package Name
            </Text>
            <VStack className="mt-2">
              <Input
                className={`h-14 rounded-lg ${
                  packageInput
                    ? "bg-[#ffffff] "
                    : "bg-[#E5E5E5] border-outline-0"
                }`}
              >
                <InputField
                  placeholder="Package Name"
                  className={`font-roboto_regular text-[12px] ${
                    packageInput ? "text-black" : "text-[#979797]"
                  }`}
                  defaultValue={packageInput}
                  onChangeText={(text: string) => setPackageInput(text)}
                />
              </Input>
            </VStack>
          </VStack>

          <VStack className="mb-4">
            <Text className="font-roboto_regular text-[16px] text-black">
              Package Weight
            </Text>
            <VStack className="mt-2">
              <Input
                className={`h-14 rounded-lg ${
                  packageWeight
                    ? "bg-[#ffffff]"
                    : "bg-[#E5E5E5] border-outline-0"
                }`}
              >
                <InputField
                  placeholder="Package Weight in KG"
                  className={`font-roboto_regular text-[12px] ${
                    packageWeight ? "text-black" : "text-[#979797]"
                  }`}
                  defaultValue={packageWeight.toString()}
                  onChangeText={(text: string) => {
                    const numericValue = text.replace(/[^0-9.]/g, "");
                    if (/^\d*\.?\d*$/.test(numericValue)) {
                      setPackageWeight(parseFloat(numericValue));
                    }
                  }}
                  keyboardType="numeric"
                />
                <InputSlot>
                  <Text
                    className={`font-roboto_regular text-[12px] mr-4 ${
                      packageWeight ? "text-black" : "text-[#979797]"
                    }`}
                  >
                    KG
                  </Text>
                </InputSlot>
              </Input>
            </VStack>
          </VStack>

          <VStack className="mb-4 flex-row">
            <VStack className="w-[48%] mr-4">
              <Text className="font-roboto_regular text-[16px] text-black">
                Quantity
              </Text>
              <VStack className="mt-2">
                <Input
                  className={`h-14 rounded-lg ${
                    quantityValue
                      ? "bg-[#ffffff]"
                      : "bg-[#E5E5E5] border-outline-0"
                  }`}
                >
                  <InputField
                    placeholder="Quantity"
                    className={`font-roboto_regular text-[12px] ${
                      quantityValue ? "text-black" : "text-[#979797]"
                    }`}
                    defaultValue={quantityValue}
                    onChangeText={(text: string) => {
                      // Allow only numeric characters and a single decimal point
                      const numericValue = text.replace(/[^0-9.]/g, ""); // Remove invalid characters
                      if (/^\d*\.?\d*$/.test(numericValue)) {
                        // Validate numeric format
                        setQuantityValue(numericValue);
                      }
                    }}
                    keyboardType="numeric" // Ensures numeric keypad on mobile devices
                  />
                </Input>
              </VStack>
            </VStack>

            <VStack className="w-[48%]">
              <Text className="font-roboto_regular text-[16px] text-black">
                Value
              </Text>
              <VStack className="mt-2">
                <Input
                  className={`h-14 rounded-lg ${
                    value ? "bg-[#ffffff]" : "bg-[#E5E5E5] border-outline-0"
                  }`}
                >
                  <InputField
                    placeholder="0"
                    className={`font-roboto_regular text-[12px] ${
                      value ? "text-black" : "text-[#979797]"
                    }`}
                    defaultValue={value}
                    onChangeText={(text: string) => {
                      // Allow only numeric characters and a single decimal point
                      const numericValue = text.replace(/[^0-9.]/g, ""); // Remove invalid characters
                      if (/^\d*\.?\d*$/.test(numericValue)) {
                        // Validate numeric format
                        setValue(numericValue);
                      }
                    }}
                    keyboardType="numeric" // Ensures numeric keypad on mobile devices
                  />
                  <InputSlot>
                    <Text
                      className={`font-roboto_regular text-[12px] mr-4 ${
                        value ? "text-black" : "text-[#979797]"
                      }`}
                    >
                      ₦
                    </Text>
                  </InputSlot>
                </Input>
              </VStack>
            </VStack>
          </VStack>

          <VStack className="mb-4">
            <Text className="font-roboto_regular text-[16px] text-black">
              Receivers Name
            </Text>
            <VStack className="mt-2">
              <Input
                className={`h-14 rounded-lg ${
                  receiverName
                    ? "bg-[#ffffff] "
                    : "bg-[#E5E5E5] border-outline-0"
                }`}
              >
                <InputField
                  placeholder="Receiver's Name"
                  className={`font-roboto_regular text-[12px] ${
                    receiverName ? "text-black" : "text-[#979797]"
                  }`}
                  defaultValue={receiverName}
                  onChangeText={(text: string) => setReceiverName(text)}
                />
              </Input>
            </VStack>
          </VStack>

          <VStack className="mb-4">
            <Text className="font-roboto_regular text-[16px] text-black">
              Receivers Phone
            </Text>
            <VStack className="mt-2">
              <Input
                className={`h-14 rounded-lg ${
                  receiverPhone
                    ? "bg-[#ffffff] "
                    : "bg-[#E5E5E5] border-outline-0"
                }`}
              >
                <InputField
                  placeholder="Receiver's Phone"
                  className={`font-roboto_regular text-[12px] ${
                    receiverPhone ? "text-black" : "text-[#979797]"
                  }`}
                  defaultValue={receiverPhone}
                  onChangeText={(text: string) => setReceiverPhone(text)}
                  keyboardType="phone-pad"
                />
              </Input>
            </VStack>
          </VStack>
        </VStack>

        <VStack className="my-4">
          <Text className="font-roboto_medium text-[16px] text-black my-4">
            Select Preferred Vehicle
          </Text>
          <Text className="font-roboto_regular text-[12px] text-[#979797]">
            The weight of your package would determine the vehicle to be used to
            transport it and the cost.
          </Text>
          <VStack className="flex-row justify-between mt-6">
            {options.map((option) => {
              const isSelected = selectedVehicle === option.label;
              const IconComponent = option.icon;

              return (
                <TouchableOpacity
                  key={option.label}
                  onPress={() => setSelectedVehicle(option.label)}
                  className="items-center mx-4"
                >
                  <IconComponent
                    name={option.iconName}
                    size={24}
                    color={isSelected ? "#2B63E1" : "#979797"}
                  />
                  <Text
                    className={`font-roboto_regular text-[12px] ${
                      isSelected ? "text-[#2B63E1]" : "text-[#979797]"
                    }`}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </VStack>
        </VStack>

        <VStack className="flex-1 justify-end items-start pb-4">
          <Button
            size="lg"
            variant="solid"
            action="primary"
            className="w-full bg-[#2B63E1] h-12 rounded-[8px] mt-6 mb-4"
            onPress={handleNext}
          >
            <ButtonText className="font-roboto_medium text-[16px] text-white">
              Next
            </ButtonText>
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
