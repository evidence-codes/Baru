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

export default function PackageDetails() {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [packageInput, setPackageInput] = useState<string>("");
  const [packageWeight, setPackageWeight] = useState<string>("");
  const [quantityValue, setQuantityValue] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  const options = [
    { label: "Motorcycle", icon: Fontisto, iconName: "motorcycle" },
    { label: "Car", icon: Fontisto, iconName: "car" },
    { label: "Truck", icon: FontAwesome5, iconName: "truck" },
  ];

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
                      isDisabled={true}
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
                  defaultValue={packageWeight}
                  onChangeText={(text: string) => {
                    // Allow only numeric characters and a single decimal point
                    const numericValue = text.replace(/[^0-9.]/g, ""); // Remove invalid characters
                    if (/^\d*\.?\d*$/.test(numericValue)) {
                      // Validate numeric format
                      setPackageWeight(numericValue);
                    }
                  }}
                  keyboardType="numeric" // Ensures numeric keypad on mobile devices
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
      </ScrollView>
      <VStack className="flex-1 justify-end items-start pb-4">
        <Button
          size="lg"
          variant="solid"
          action="primary"
          className="w-full bg-[#2B63E1] h-12 rounded-[8px] mt-6 mb-4"
          onPress={() => {}}
        >
          <ButtonText className="font-roboto_medium text-[16px] text-white">
            Next
          </ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
}
