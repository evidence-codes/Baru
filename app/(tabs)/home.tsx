import { SafeAreaView, ScrollView, Image } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SendBox from "@/assets/images/svg/send-box.svg";
import ReceiveBox from "@/assets/images/svg/receive-box.svg";
import QuestionMark from "@/assets/images/svg/question-mark.svg";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { SearchIcon } from "@/components/ui/icon";
import SentBox from "@/components/SentBox";
import ReceivedBox from "@/components/ReceivedBox";
import { useRouter } from "expo-router";
import { Pressable } from "@/components/ui/pressable";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const [fullName, setFullName] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    // const fetchUserInfo = async () => {
    //   try {
    //     const userInfoString = await SecureStore.getItemAsync("userInfo");
    //     if (userInfoString) {
    //       const userInfo = JSON.parse(userInfoString);
    //       setFullName(userInfo.fullName); // Assuming fullName is a property in userInfo
    //     }
    //   } catch (error) {
    //     console.error("Error retrieving user info from SecureStore:", error);
    //   }
    // };

    // Set current date
    const date = new Date();
    const formattedDate = `${date.getDate()} ${date.toLocaleString("default", {
      month: "long",
    })}, ${date.getFullYear()}`;
    setCurrentDate(formattedDate);

    // fetchUserInfo();
  }, []);

  const handleSend = () => {
    router.push("/(screens)/location");
  };
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
                {user?.fullName}
              </Text>
              <Text className="text-[8px] font-roboto_regular text-black">
                {currentDate}
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
                <Pressable onPress={handleSend}>
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
                </Pressable>
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
            <SentBox
              title="Transit"
              id="#BARU-3445-11L0"
              progress={50}
              locationFrom="Lekki"
              locationTo="Oshodi"
              dateFrom="10 Oct"
              dateTo="11 Oct"
              onPress={() =>
                router.push({
                  pathname: "/(screens)/sent-details",
                  params: {
                    id: "#BARU-3445-11L0",
                    progress: 50,
                    from: "Lekki",
                    to: "Oshodi",
                    sender: "You",
                    receiver: "1134322",
                    createdDate: "10 Oct",
                    estimatedDate: "11 Oct",
                    pickupDate: "11 Oct",
                    pickupTime: "1:30PM",
                    weight: "5kg",
                    status: "Transit",
                    courierName: "Naruto HustleMaki",
                    courierPhone: "0810-000-0000",
                    courierLocation: "Lekki",
                  },
                })
              }
            />
            ;
            <ReceivedBox
              title="Transit"
              id="#BARU-1445-12AL"
              progress={50}
              locationFrom="Abeokuta"
              locationTo="Lekki"
              dateFrom="10 Oct"
              dateTo="11 Oct"
              onPress={() =>
                router.push({
                  pathname: "/(screens)/receive-details",
                  params: {
                    id: "#BARU-1445-12AL",
                    progress: 50,
                    from: "Abeokuta",
                    to: "Lekki",
                    sender: "1233434",
                    receiver: "You",
                    createdDate: "10 Oct",
                    estimatedDate: "11 Oct",
                    pickupDate: "11 Oct",
                    pickupTime: "1:30PM",
                    weight: "7kg",
                    status: "Transit",
                    courierName: "Naruto HustleMaki",
                    courierPhone: "0810-000-0000",
                    courierLocation: "Lekki",
                  },
                })
              }
            />
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
