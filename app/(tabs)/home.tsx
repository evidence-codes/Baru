import { SafeAreaView, ScrollView, Image } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SendBox from "@/assets/images/svg/send-box.svg";
import ReceiveBox from "@/assets/images/svg/receive-box.svg";
import QuestionMark from "@/assets/images/svg/question-mark.svg";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { SearchIcon } from "@/components/ui/icon";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import { Center } from "@/components/ui/center";
import BlueBox from "@/assets/images/svg/blue-box.svg";
import SendDetails from "@/components/SendDetails";
import ReceiveDetails from "@/components/ReceiveDetails";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white px-4 mt-10">
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack className="flex-row items-center justify-between mt-4">
          <VStack className="flex-row items-center">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
              }}
              className="w-12 h-12 rounded-full"
            />
            <VStack className="ml-4">
              <Text className="text-[14px] font-roboto_medium text-black">
                Juwon Osadebe
              </Text>
              <Text className="text-[8px] font-roboto_regular text-black">
                11th October, 2024
              </Text>
            </VStack>
          </VStack>
          <MaterialIcons name="notifications-none" size={24} color="black" />
        </VStack>

        <VStack className="mt-10">
          <Text className="text-[28px] font-roboto_bold text-[#000]">
            What would you like to do today?
          </Text>

          <VStack className="">
            <VStack className="mt-6">
              <Text className="text-[16px] font-roboto_medium text-[#000]">
                Send Something
              </Text>
              <VStack className="rounded-xl border border-[#D3D3D3] px-4 py-2 mt-2">
                <VStack className="flex-row items-center justify-between">
                  <VStack className="flex-row items-center">
                    <SendBox />
                    <VStack className="ml-4">
                      <Text className="text-[14px] text-black font-roboto_medium">
                        Send a Package
                      </Text>
                      <Text className="text-[12px] text-black font-roboto_regular w-5/6">
                        Deliver a package across town.
                      </Text>
                    </VStack>
                  </VStack>
                  <MaterialIcons name="keyboard-arrow-right" size={30} />
                </VStack>
              </VStack>
            </VStack>

            <VStack className="mt-6">
              <Text className="text-[16px] font-roboto_medium text-[#000]">
                Get Something
              </Text>
              <VStack className="rounded-xl border border-[#D3D3D3] px-4 py-2 mt-2">
                <VStack className="flex-row items-center justify-between">
                  <VStack className="flex-row items-center">
                    <ReceiveBox />
                    <VStack className="ml-4">
                      <Text className="text-[14px] text-black font-roboto_medium">
                        Receive a Package
                      </Text>
                      <Text className="text-[12px] text-black font-roboto_regular w-5/6">
                        Collect a package from across town.
                      </Text>
                    </VStack>
                  </VStack>
                  <MaterialIcons name="keyboard-arrow-right" size={30} />
                </VStack>
              </VStack>
            </VStack>

            <VStack className="mt-6">
              <Text className="text-[16px] font-roboto_medium text-[#000]">
                Get Quote
              </Text>
              <VStack className="rounded-xl border border-[#D3D3D3] px-4 py-2 mt-2">
                <VStack className="flex-row items-center justify-between">
                  <VStack className="flex-row items-center">
                    <QuestionMark />
                    <VStack className="ml-4">
                      <Text className="text-[14px] text-black font-roboto_medium">
                        Compare Prices
                      </Text>
                      <Text className="text-[12px] text-black font-roboto_regular w-4/6">
                        Get an estimate of the cost to send a package.
                      </Text>
                    </VStack>
                  </VStack>
                  {/* <MaterialIcons name="keyboard-arrow-right" size={30} /> */}
                </VStack>
              </VStack>
            </VStack>
          </VStack>

          <VStack className="mt-8">
            <Text className="text-[18px] font-roboto_bold text-[#000]">
              Recent Orders
            </Text>

            <VStack className="mt-6">
              <Input className="bg-[#E5E5E5] h-12 rounded-full border-outline-0">
                <InputSlot className="pl-3">
                  <InputIcon as={SearchIcon} />
                </InputSlot>
                <InputField
                  placeholder="Search"
                  className="text-[#979797] font-roboto_regular"
                />
              </Input>
            </VStack>

            <Text className="text-[16px] font-roboto_medium text-[#000] mt-6 mb-2">
              Current Tracking
            </Text>

            <SendDetails
              title="Transit"
              id="#BARU-3445-11LO"
              progress={50}
              locationFrom="Lekki"
              locationTo="Oshodi"
              dateFrom="10 Oct"
              dateTo="11 Oct"
            />

            <ReceiveDetails
              title="Transit"
              id="#BARU-1445-12AL"
              progress={50}
              locationFrom="Abeokuta"
              locationTo="Lekki"
              dateFrom="10 Oct"
              dateTo="11 Oct"
            />
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
