import { SafeAreaView, ScrollView, Image } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { FontAwesome6, Ionicons, FontAwesome } from "@expo/vector-icons";
import MoneyBag from "@/assets/images/svg/money-bag.svg";
import BriefCase from "@/assets/images/svg/briefcase.svg";
import { useAuth } from "@/context/AuthContext";
import { Pressable } from "@/components/ui/pressable";
import { useRouter } from "expo-router";

export default function Account() {
  const { user } = useAuth();
  const router = useRouter();

  const handleManageAccount = () => {
    router.push("/(screens)/edit-account");
  };

  const handleMessaging = () => {
    router.push("/(screens)/message-screen");
  };

  const handleDeliveryService = () => {
    console.log("Navigating to delivery service login");
    router.push("/(auth)/(courier)/login");
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-4 mt-10">
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack className="items-center mt-18">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
            }}
            className="w-48 h-48 mt-6 rounded-full border-2 border-[#D3D3D3]"
          />
          <VStack className="items-center mt-2">
            <Text className="text-[22px] font-roboto_bold text-black text-center mb-2">
              {user?.fullName}
            </Text>
            <Text className="text-[12px] font-roboto_regular text-black text-center mb-2">
              Member since Oct 2024
            </Text>
          </VStack>
        </VStack>

        <VStack className="mt-6">
          <Pressable onPress={handleManageAccount}>
            <VStack className="flex-row items-center mb-8">
              <FontAwesome6
                name="user"
                size={24}
                color="black"
                className="w-8"
              />
              <Text className="text-[18px] font-roboto_regular text-black ml-4">
                Manage Barῦ account
              </Text>
            </VStack>
          </Pressable>

          {/* <VStack className="flex-row items-center mb-8">
            <Ionicons
              name="card-outline"
              size={24}
              color="black"
              className="w-8"
            />
            <Text className="text-[18px] font-roboto_regular text-black ml-4">
              Manage Payment Methods
            </Text>
          </VStack> */}
          <Pressable onPress={handleMessaging}>
            <VStack className="flex-row items-center mb-8">
              <FontAwesome
                name="envelope-o"
                size={24}
                color="black"
                className="w-8"
              />
              <Text className="text-[18px] font-roboto_regular text-black ml-4">
                Messages
              </Text>
            </VStack>
          </Pressable>

          {/* <VStack className="flex-row items-center mb-8">
            <Ionicons
              name="settings-outline"
              size={24}
              color="black"
              className="w-8"
            />
            <Text className="text-[18px] font-roboto_regular text-black ml-4">
              App Settings
            </Text>
          </VStack> */}
          <Pressable onPress={handleDeliveryService}>
            <VStack className="flex-row items-center mb-8">
              <MoneyBag width={24} height={24} />
              <Text className="text-[18px] font-roboto_regular text-black ml-4">
                Earn by delivering
              </Text>
            </VStack>
          </Pressable>
          {/* <VStack className="flex-row items-center mb-8">
            <BriefCase width={24} height={24} />
            <Text className="text-[18px] font-roboto_regular text-black ml-4">
              Set up your business profile
            </Text>
          </VStack> */}
          <VStack className="flex-row items-center mb-8">
            <Ionicons name="help-circle-outline" size={24} color="black" />
            <Text className="text-[18px] font-roboto_regular text-black ml-4">
              Help & Support
            </Text>
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
