import { SafeAreaView, ScrollView, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Icon, CopyIcon } from "@/components/ui/icon";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import { Center } from "@/components/ui/center";
import BlueBox from "@/assets/images/svg/big-blue-box.svg";
import Message from "@/assets/images/svg/message.svg";
import Call from "@/assets/images/svg/call.svg";
import { useLocalSearchParams } from "expo-router";

interface ReceiveDetailsProps {
  id: string;
  progress: number;
  from: string;
  to: string;
  sender: string;
  receiver: string;
  createdDate: string;
  estimatedDate: string;
  pickupDate: string;
  pickupTime: string;
  weight: string;
  status: string;
  courierName: string;
  courierPhone: string;
  courierLocation: string;
}

export default function ReceiveDetailsScreen() {
  const params = useLocalSearchParams() as Partial<ReceiveDetailsProps>;
  const {
    id,
    progress,
    from,
    to,
    sender,
    receiver,
    createdDate,
    estimatedDate,
    pickupDate,
    pickupTime,
    weight,
    status,
    courierName,
    courierPhone,
    courierLocation,
  } = params;
  return (
    <SafeAreaView className="flex-1 bg-[#D6E6FF] px-4">
      <StatusBar style="dark" backgroundColor="#D6E6FF" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack className="p-4 bg-white rounded-[24px] flex-row">
          <VStack className="mt-6 w-4/6">
            <VStack className="flex-row items-center justify-between mb-10">
              <HStack className="flex-row items-center">
                <Text className="font-roboto_bold text-[22px] text-black">
                  {id}
                </Text>
                <Icon as={CopyIcon} className="ml-2" />
              </HStack>
            </VStack>
            <VStack className="mb-8">
              <Center>
                <Progress value={progress} size="md" orientation="horizontal">
                  <ProgressFilledTrack />
                </Progress>
              </Center>
            </VStack>

            <VStack>
              <VStack className="flex-row items-center justify-between mb-4">
                <VStack>
                  <Text className="font-roboto_bold text-[14px] text-black">
                    From
                  </Text>
                  <Text className="font-roboto_regular text-[12px] text-[#757575]">
                    {from}
                  </Text>
                </VStack>
                <VStack>
                  <Text className="font-roboto_bold text-[14px] text-black text-right">
                    To
                  </Text>
                  <Text className="font-roboto_regular text-[12px] text-[#757575] text-right">
                    {to}
                  </Text>
                </VStack>
              </VStack>
              <VStack className="flex-row items-center justify-between mb-4">
                <VStack>
                  <Text className="font-roboto_bold text-[14px] text-black">
                    Sender
                  </Text>
                  <Text className="font-roboto_regular text-[12px] text-[#757575]">
                    {sender}
                  </Text>
                </VStack>
                <VStack>
                  <Text className="font-roboto_bold text-[14px] text-black text-right">
                    Receiver
                  </Text>
                  <Text className="font-roboto_regular text-[12px] text-[#757575] text-right">
                    {receiver}
                  </Text>
                </VStack>
              </VStack>
              <VStack className="flex-row items-center justify-between mb-4">
                <VStack>
                  <Text className="font-roboto_bold text-[14px] text-black">
                    Created
                  </Text>
                  <Text className="font-roboto_regular text-[12px] text-[#757575]">
                    {createdDate}
                  </Text>
                </VStack>
                <VStack>
                  <Text className="font-roboto_bold text-[14px] text-black text-right">
                    Estimated
                  </Text>
                  <Text className="font-roboto_regular text-[12px] text-[#757575] text-right">
                    {estimatedDate}
                  </Text>
                </VStack>
              </VStack>
              <VStack className="flex-row items-center justify-between mb-4">
                <VStack>
                  <Text className="font-roboto_bold text-[14px] text-black">
                    Weight
                  </Text>
                  <Text className="font-roboto_regular text-[12px] text-[#757575]">
                    {weight}
                  </Text>
                </VStack>
              </VStack>
            </VStack>
          </VStack>

          <VStack className="mt-6 w-2/6 ml-6">
            <VStack className="pl-4 pb-4 mb-4">
              <Text className="font-roboto_regular text-[14px] text-black">
                Status
              </Text>

              <VStack className="bg-black rounded-full py-2 items-center justify-center w-3/4 mb-4">
                <Text className="font-roboto_regular text-[10px] text-white">
                  {status}
                </Text>
              </VStack>
            </VStack>

            <VStack className="absolute -mb-4 -mr-18 bottom-0 right-0 rounded-br-[24px] overflow-hidden">
              <BlueBox className="w-24 h-24" />{" "}
              {/* You can adjust the size as needed */}
            </VStack>
          </VStack>
        </VStack>

        <VStack className="p-6 bg-white rounded-[24px] mt-6">
          <VStack className="">
            <VStack className="flex-row items-center justify-between">
              <VStack className="w-4/6">
                <Text className="font-roboto_bold text-[14px] text-black">
                  Your package was picked up by the courier
                </Text>
                <Text className="font-roboto_regular text-[12px] text-[#757575]">
                  {courierName}, {courierLocation}
                </Text>
              </VStack>
              <VStack>
                <Text className="font-roboto_regular text-[10px] text-[#757575]">
                  {pickupDate}
                </Text>
                <Text className="font-roboto_regular text-[10px] text-[#757575]">
                  {pickupTime}
                </Text>
              </VStack>
            </VStack>

            <VStack className="flex-row items-center justify-between mt-4 rounded-full border border-[#D3D3D3]">
              <VStack className="flex-row items-center">
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
                  }}
                  className="w-20 h-20 rounded-full"
                />
                <VStack className="ml-4">
                  <Text className="text-[14px] font-roboto_medium text-black">
                    {courierName}
                  </Text>
                  <Text className="text-[14px] font-roboto_regular text-black">
                    {courierPhone}
                  </Text>
                </VStack>
              </VStack>
              <VStack className="flex-row items-center">
                <VStack>
                  <Message />
                </VStack>
                <VStack className="ml-4 pl-2 pr-4">
                  <Call />
                </VStack>
              </VStack>
            </VStack>
          </VStack>

          <VStack className="mt-6">
            <Text className="font-roboto_bold text-[14px] text-black">
              In Transit
            </Text>
            <Text className="font-roboto_regular text-[12px] text-[#757575]">
              Orile Iganmu
            </Text>
          </VStack>

          <VStack className="mt-6">
            <Text className="font-roboto_bold text-[14px] text-black">
              Delivered
            </Text>
            <Text className="font-roboto_regular text-[12px] text-[#757575]">
              Oshodi Pick up point
            </Text>
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
