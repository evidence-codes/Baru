import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { SearchIcon } from "@/components/ui/icon";
import SendDetails from "@/components/SentBox";
import ReceiveDetails from "@/components/ReceivedBox";
import CancelledBox from "@/components/CancelledBox";
import { useRouter } from "expo-router";

export default function History() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-white px-4 mt-10">
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack className="flex-row items-center justify-center mt-4">
          <Text className="font-roboto_bold text-[20px] text-black">
            Order History
          </Text>
        </VStack>

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

        <VStack className="mt-4 mb-2">
          <Text className="text-[20px] font-roboto_regular text-black my-2">
            Active Orders
          </Text>

          <SendDetails
            title="Transit"
            id="#BARU-3445-11LO"
            progress={75}
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

          <ReceiveDetails
            title="Transit"
            id="#BARU-1445-12AL"
            progress={25}
            locationFrom="Abeokuta"
            locationTo="Lekki"
            dateFrom="10 Oct"
            dateTo="11 Oct"
            onPress={() =>
              router.push({
                pathname: "/(screens)/receive-details",
                params: {
                  id: "#BARU-1445-12AL",
                  progress: 25,
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

          <ReceiveDetails
            title="Pending"
            id="#BARU-1945-12AL"
            progress={10}
            locationFrom="Abeokuta"
            locationTo="Lekki"
            dateFrom="10 Oct"
            dateTo="11 Oct"
            onPress={() =>
              router.push({
                pathname: "/(screens)/receive-details",
                params: {
                  id: "#BARU-1945-12AL",
                  progress: 10,
                  from: "Abeokuta",
                  to: "Lekki",
                  sender: "1233434",
                  receiver: "You",
                  createdDate: "10 Oct",
                  estimatedDate: "11 Oct",
                  pickupDate: "11 Oct",
                  pickupTime: "1:30PM",
                  weight: "7kg",
                  status: "Pending",
                  courierName: "Naruto HustleMaki",
                  courierPhone: "0810-000-0000",
                  courierLocation: "Lekki",
                },
              })
            }
          />

          <Text className="text-[20px] font-roboto_regular text-black mt-4">
            Past Orders
          </Text>

          <SendDetails
            title="Completed"
            id="#BARU-3935-11AO"
            progress={100}
            locationFrom="Ajah"
            locationTo="Oshodi"
            dateFrom="10 Oct"
            dateTo="11 Oct"
            onPress={() =>
              router.push({
                pathname: "/(screens)/sent-details",
                params: {
                  id: "#BARU-3935-11AO",
                  progress: 100,
                  from: "Ajah",
                  to: "Oshodi",
                  sender: "You",
                  receiver: "1134322",
                  createdDate: "10 Oct",
                  estimatedDate: "11 Oct",
                  pickupDate: "11 Oct",
                  pickupTime: "1:30PM",
                  weight: "5kg",
                  status: "Completed",
                  courierName: "Naruto HustleMaki",
                  courierPhone: "0810-000-0000",
                  courierLocation: "Lekki",
                },
              })
            }
          />

          <SendDetails
            title="Completed"
            id="#BARU-3945-11LO"
            progress={100}
            locationFrom="Ajah"
            locationTo="Oshodi"
            dateFrom="10 Oct"
            dateTo="11 Oct"
            onPress={() =>
              router.push({
                pathname: "/(screens)/sent-details",
                params: {
                  id: "#BARU-3935-11AO",
                  progress: 100,
                  from: "Ajah",
                  to: "Oshodi",
                  sender: "You",
                  receiver: "1134322",
                  createdDate: "10 Oct",
                  estimatedDate: "11 Oct",
                  pickupDate: "11 Oct",
                  pickupTime: "1:30PM",
                  weight: "5kg",
                  status: "Completed",
                  courierName: "Naruto HustleMaki",
                  courierPhone: "0810-000-0000",
                  courierLocation: "Lekki",
                },
              })
            }
          />

          <CancelledBox
            title="Cancelled"
            id="#BARU-1495-12II"
            progress={10}
            locationFrom="Ijanikin"
            locationTo="Iyana Era"
            dateFrom="10 Oct"
            dateTo="11 Oct"
            onPress={() =>
              router.push({
                pathname: "/(screens)/cancelled-details",
                params: {
                  id: "#BARU-1495-12II",
                  progress: 10,
                  from: "Ijanikin",
                  to: "Iyana Era",
                  sender: "You",
                  receiver: "1134322",
                  createdDate: "10 Oct",
                  estimatedDate: "Nil",
                  pickupDate: "Nil",
                  pickupTime: "Nil",
                  weight: "22kg",
                  status: "Cancelled",
                  courierName: "Naruto HustleMaki",
                  courierPhone: "0810-000-0000",
                  courierLocation: "Lekki",
                },
              })
            }
          />

          <CancelledBox
            title="Cancelled"
            id="#BARU-1495-12II"
            progress={10}
            locationFrom="Ijanikin"
            locationTo="Iyana Era"
            dateFrom="10 Oct"
            dateTo="11 Oct"
            onPress={() =>
              router.push({
                pathname: "/(screens)/cancelled-details",
                params: {
                  id: "#BARU-1495-12II",
                  progress: 10,
                  from: "Ijanikin",
                  to: "Iyana Era",
                  sender: "You",
                  receiver: "1134322",
                  createdDate: "10 Oct",
                  estimatedDate: "Nil",
                  pickupDate: "Nil",
                  pickupTime: "Nil",
                  weight: "22kg",
                  status: "Cancelled",
                  courierName: "Naruto HustleMaki",
                  courierPhone: "0810-000-0000",
                  courierLocation: "Lekki",
                },
              })
            }
          />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
