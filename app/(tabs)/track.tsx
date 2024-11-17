import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { SearchIcon } from "@/components/ui/icon";
import ScanLine from "@/assets/images/svg/qr-scan-line.svg";

export default function Track() {
  return (
    <SafeAreaView className="flex-1 bg-white px-4 mt-10">
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack className="flex-row items-center justify-center mt-4">
          <Text className="font-roboto_bold text-[20px] text-black">
            Order Tracking
          </Text>
        </VStack>

        <VStack className="mt-6">
          <Input className="bg-[#E5E5E5] h-12 rounded-full border-outline-0">
            <InputSlot className="pl-3">
              <InputIcon as={SearchIcon} />
            </InputSlot>
            <InputField
              placeholder="Enter Tracking ID"
              className="text-[#979797] font-roboto_regular"
            />
            <InputSlot className="pr-3">
              <ScanLine />
            </InputSlot>
          </Input>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
