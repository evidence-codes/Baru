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
import { useQuery } from "@tanstack/react-query";
import { getPackages } from "@/api/package";

export default function History() {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["packageHistory"],
    queryFn: getPackages,
    staleTime: 1000 * 60 * 5,
  });
  console.log(data?.data);
  const packages = data?.data || [];

  // const packages = {
  //   success: true,
  //   message: "Packages found",
  //   data: [
  //     {
  //       status: "pending",
  //       lastUpdatedAt: "2024-12-09T12:56:58.482Z",
  //       createdAt: "2024-12-09T12:56:58.482Z",
  //       id: "f407fe97-1bcc-4202-8ecc-85bfd8052e33",
  //       trackingID: "BARU-1775-12BT",
  //       receiverName: "David Glory ",
  //       receiverPhoneNumber: "08105994428",
  //       category: "normal",
  //       packageName: "Qasa",
  //       weight: 10,
  //       quantity: 1,
  //       value: 60000,
  //       preferredVehicle: "car",
  //       pickupLocation: "Titilayo Street, Akure South, Ondo",
  //       dropOffLocation: "Ijapo Estate Road, Akure South, Ondo",
  //       deliveryInstructions: null,
  //       distance: 6.423,
  //       eta: 10,
  //       deliveryCost: 9321.15,
  //       currentLatitude: null,
  //       currentLongitude: null,
  //       courierName: null,
  //       courierPhoneNumber: null,
  //       sender: {
  //         fullName: "Evidence Adejuwon",
  //         isEmailVerified: true,
  //         role: "user",
  //         hasRequestDelete: false,
  //         createdAt: "2024-11-27T17:35:52.921Z",
  //         updatedAt: "2024-11-27T17:35:52.921Z",
  //         id: "d6931707-1707-4693-8b91-95581c889390",
  //         email: "adejuwonevidence181@gmail.com",
  //         phoneNumber: "07065665414",
  //         password:
  //           "$2a$10$tOZW0r18S49M25jWnndJR.AYwYQHYSga.V39DFahch3p2m9CuV9gy",
  //         theme: null,
  //         refreshToken:
  //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ2OTMxNzA3LTE3MDctNDY5My04YjkxLTk1NTgxYzg4OTM5MCIsImlhdCI6MTczMzgzNjIwOCwiZXhwIjoxNzM0NDQxMDA4fQ.KHKMuPfEUlqZjYJTw9Y9jCjcIF48b_tR09iQ7HAV3zU",
  //         profilePictureUrl: null,
  //       },
  //     },
  //     {
  //       status: "pending",
  //       lastUpdatedAt: "2024-12-09T12:56:58.482Z",
  //       createdAt: "2024-12-09T12:56:58.482Z",
  //       id: "f407fe97-1bcc-4202-8ecc-85bfd8052e33",
  //       trackingID: "BARU-1775-12AJ",
  //       receiverName: "David Glory ",
  //       receiverPhoneNumber: "08105994428",
  //       category: "normal",
  //       packageName: "Qasa",
  //       weight: 10,
  //       quantity: 1,
  //       value: 60000,
  //       preferredVehicle: "car",
  //       pickupLocation: "Titilayo Street, Akure South, Ondo",
  //       dropOffLocation: "Ijapo Estate Road, Akure South, Ondo",
  //       deliveryInstructions: null,
  //       distance: 6.423,
  //       eta: 10,
  //       deliveryCost: 9321.15,
  //       currentLatitude: null,
  //       currentLongitude: null,
  //       courierName: null,
  //       courierPhoneNumber: null,
  //       sender: {
  //         fullName: "Evidence Adejuwon",
  //         isEmailVerified: true,
  //         role: "user",
  //         hasRequestDelete: false,
  //         createdAt: "2024-11-27T17:35:52.921Z",
  //         updatedAt: "2024-11-27T17:35:52.921Z",
  //         id: "d6931707-1707-4693-8b91-95581c889390",
  //         email: "adejuwonevidence181@gmail.com",
  //         phoneNumber: "07065665414",
  //         password:
  //           "$2a$10$tOZW0r18S49M25jWnndJR.AYwYQHYSga.V39DFahch3p2m9CuV9gy",
  //         theme: null,
  //         refreshToken:
  //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ2OTMxNzA3LTE3MDctNDY5My04YjkxLTk1NTgxYzg4OTM5MCIsImlhdCI6MTczMzgzNjIwOCwiZXhwIjoxNzM0NDQxMDA4fQ.KHKMuPfEUlqZjYJTw9Y9jCjcIF48b_tR09iQ7HAV3zU",
  //         profilePictureUrl: null,
  //       },
  //     },
  //   ],
  // };
  console.log("This is the packages:" + packages);

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

          {packages.data.map((pkg: any) => (
            <SendDetails
              key={pkg.id}
              title={pkg.status}
              id={pkg.trackingID || "N/A"}
              progress={pkg.eta ? Math.min(pkg.eta * 10, 100) : 0} // Example progress calculation
              locationFrom={
                pkg.pickupLocation.split(",")[
                  pkg.pickupLocation.split(",").length - 1
                ] || "Unknown Pickup Location"
              }
              locationTo={
                pkg.dropOffLocation.split(",")[
                  pkg.dropOffLocation.split(",").length - 1
                ] || "Unknown Drop-Off Location"
              }
              dateFrom={
                new Date(pkg.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                }) || "Unknown Date"
              }
              dateTo={
                pkg.lastUpdatedAt
                  ? new Date(pkg.lastUpdatedAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                    })
                  : "Unknown Date"
              }
              onPress={() =>
                router.push({
                  pathname: "/(screens)/sent-details",
                  params: {
                    id: pkg.trackingID || "N/A",
                    progress: pkg.eta ? Math.min(pkg.eta * 10, 100) : 0,
                    from:
                      pkg.pickupLocation.split(",")[
                        pkg.pickupLocation.split(",").length - 1
                      ] || "Unknown Pickup Location",
                    to:
                      pkg.dropOffLocation.split(",")[
                        pkg.dropOffLocation.split(",").length - 1
                      ] || "Unknown Drop-Off Location",
                    sender: pkg.sender?.name || "Unknown Sender",
                    receiver: pkg.receiverName || "Unknown Receiver",
                    createdDate:
                      new Date(pkg.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                      }) || "Unknown Date",
                    estimatedDate: pkg.lastUpdatedAt
                      ? new Date(pkg.lastUpdatedAt).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "short",
                          }
                        )
                      : "Unknown Date",
                    pickupDate: pkg.lastUpdatedAt
                      ? new Date(pkg.lastUpdatedAt).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "short",
                          }
                        )
                      : "Unknown Date",
                    pickupTime: "N/A", // Default value as it's missing in your data
                    weight: `${pkg.weight || "N/A"}kg`,
                    status: pkg.status || "Unknown Status",
                    courierName: pkg.courierName || "Unknown Courier",
                    courierPhone: pkg.courierPhoneNumber || "N/A",
                    courierLocation:
                      pkg.currentLatitude && pkg.currentLongitude
                        ? `Lat: ${pkg.currentLatitude}, Lon: ${pkg.currentLongitude}`
                        : "Unknown Location",
                  },
                })
              }
            />
          ))}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}

{
  /* <ReceiveDetails
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
/> */
}

{
  /* <Text className="text-[20px] font-roboto_regular text-black mt-4">
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
/> */
}
