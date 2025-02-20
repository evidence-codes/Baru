// // DispatcherHomeScreen.tsx

// import React, { useEffect, useState } from "react";
// import { SafeAreaView, ScrollView, Image } from "react-native";
// import { VStack } from "@/components/ui/vstack";
// import { Text } from "@/components/ui/text";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import { Pressable } from "@/components/ui/pressable";
// import { useRouter } from "expo-router";
// import { useQuery } from "@tanstack/react-query";
// import { useAuth } from "@/context/AuthContext";

// // API functions for fetching available jobs and pending commission
// import { getAvailableJobs, getPendingCommission } from "@/api/job";

// export default function DispatcherHomeScreen() {
//   const router = useRouter();
//   const { user } = useAuth();
//   const [currentDate, setCurrentDate] = useState<string>("");

//   // Fetch available delivery jobs (job dashboard)
//   const {
//     data: jobsData,
//     isLoading: jobsLoading,
//     error: jobsError,
//   } = useQuery({
//     queryKey: ["availableJobs"],
//     queryFn: getAvailableJobs,
//     staleTime: 1000 * 60 * 5, // 5 minutes stale time
//   });

//   // Fetch pending commission details for the dispatcher
//   const {
//     data: commissionData,
//     isLoading: commissionLoading,
//     error: commissionError,
//   } = useQuery({
//     queryKey: ["pendingCommission"],
//     queryFn: getPendingCommission,
//     staleTime: 1000 * 60 * 5,
//   });

//   // Use optional chaining and default values for data
//   const availableJobs = jobsData?.data || [];
//   const pendingCommission = commissionData?.data;

//   useEffect(() => {
//     // Set current date in a formatted style, e.g., "12 February, 2025"
//     const date = new Date();
//     const formattedDate = `${date.getDate()} ${date.toLocaleString("default", {
//       month: "long",
//     })}, ${date.getFullYear()}`;
//     setCurrentDate(formattedDate);
//   }, []);

//   // Handle when a dispatcher selects (accepts) a job
//   const handleAcceptJob = (jobId: string) => {
//     // Navigate to a job details screen where more delivery details are available.
//     router.push(`/dispatcher/job-details?jobId=${jobId}`);
//   };

//   // Handle commission settlement button press
//   const handleCommissionPayment = () => {
//     // Navigate to the commission payment screen
//     router.push("/dispatcher/commission-payment");
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-white px-4 mt-10">
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* HEADER */}
//         <VStack className="flex-row items-center justify-between mt-4">
//           <VStack className="flex-row items-center">
//             <Image
//               source={{
//                 uri:
//                   user?.avatarUrl ||
//                   "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80",
//               }}
//               className="w-12 h-12 rounded-full"
//             />
//             <VStack className="ml-4">
//               <Text className="text-[14px] font-roboto_medium text-black">
//                 {user?.fullName || "Dispatcher"}
//               </Text>
//               <Text className="text-[8px] font-roboto_regular text-black">
//                 {currentDate}
//               </Text>
//             </VStack>
//           </VStack>
//           <MaterialIcons name="notifications-none" size={24} color="black" />
//         </VStack>

//         {/* JOB DASHBOARD */}
//         <VStack className="mt-10">
//           <Text className="text-[28px] font-roboto_bold text-[#000]">
//             Job Dashboard
//           </Text>
//           <Text className="text-[14px] font-roboto_regular text-gray-500 mt-2">
//             Available delivery jobs nearby
//           </Text>

//           {jobsLoading ? (
//             <Text className="mt-4">Loading jobs...</Text>
//           ) : jobsError ? (
//             <Text className="mt-4 text-red-500">Error loading jobs.</Text>
//           ) : availableJobs.length === 0 ? (
//             <Text className="mt-4">No jobs available at the moment.</Text>
//           ) : (
//             availableJobs.map((job: any) => (
//               <VStack
//                 key={job.id}
//                 className="rounded-xl border border-[#D3D3D3] px-4 py-2 mt-4"
//               >
//                 <VStack className="flex-row items-center justify-between">
//                   <VStack>
//                     <Text className="text-[16px] font-roboto_medium text-black">
//                       {job.title || "Delivery Job"}
//                     </Text>
//                     <Text className="text-[12px] font-roboto_regular text-black mt-1">
//                       Pickup: {job.pickupLocation}
//                     </Text>
//                     <Text className="text-[12px] font-roboto_regular text-black mt-1">
//                       Drop-off: {job.dropOffLocation}
//                     </Text>
//                     {job.specialInstructions && (
//                       <Text className="text-[12px] font-roboto_regular text-black mt-1">
//                         Instructions: {job.specialInstructions}
//                       </Text>
//                     )}
//                   </VStack>
//                   <Pressable onPress={() => handleAcceptJob(job.id)}>
//                     <MaterialIcons
//                       name="keyboard-arrow-right"
//                       size={30}
//                       color="black"
//                     />
//                   </Pressable>
//                 </VStack>
//               </VStack>
//             ))
//           )}
//         </VStack>

//         {/* PAYMENT & COMMISSION / END-OF-DAY SETTLEMENT */}
//         <VStack className="mt-10">
//           <Text className="text-[28px] font-roboto_bold text-[#000]">
//             Commission & Settlement
//           </Text>
//           {commissionLoading ? (
//             <Text className="mt-2">Loading commission info...</Text>
//           ) : commissionError ? (
//             <Text className="mt-2 text-red-500">
//               Error loading commission info.
//             </Text>
//           ) : pendingCommission && pendingCommission.amount > 0 ? (
//             <>
//               <Text className="text-[14px] font-roboto_regular text-gray-500 mt-2">
//                 Pending Commission: ${pendingCommission.amount.toFixed(2)}
//               </Text>
//               <Pressable onPress={handleCommissionPayment}>
//                 <VStack className="rounded-xl border border-[#D3D3D3] px-4 py-2 mt-4">
//                   <Text className="text-[16px] font-roboto_medium text-black">
//                     Settle Commission
//                   </Text>
//                 </VStack>
//               </Pressable>
//             </>
//           ) : (
//             <Text className="text-[14px] font-roboto_regular text-gray-500 mt-2">
//               No pending commission today.
//             </Text>
//           )}
//         </VStack>

//         {/* OPTIONAL: ACTIVE DELIVERY DETAILS (if a job has been accepted) */}
//         {/*
//           <VStack className="mt-10">
//             <Text className="text-[28px] font-roboto_bold text-[#000]">
//               Active Delivery
//             </Text>
//             <VStack className="rounded-xl border border-[#D3D3D3] px-4 py-2 mt-4">
//               <Text className="text-[16px] font-roboto_medium text-black">
//                 Active Job Title
//               </Text>
//               <Text className="text-[12px] font-roboto_regular text-black mt-1">
//                 Pickup: Some Pickup Location
//               </Text>
//               <Text className="text-[12px] font-roboto_regular text-black mt-1">
//                 Drop-off: Some Drop-off Location
//               </Text>
//               <Text className="text-[12px] font-roboto_regular text-black mt-1">
//                 Customer: John Doe
//               </Text>
//               <Pressable
//                 onPress={() => router.push("/dispatcher/active-job-details")}
//               >
//                 <VStack className="flex-row items-center justify-between mt-2">
//                   <Text className="text-[14px] font-roboto_medium text-blue-500">
//                     View Details
//                   </Text>
//                   <MaterialIcons
//                     name="keyboard-arrow-right"
//                     size={24}
//                     color="blue"
//                   />
//                 </VStack>
//               </Pressable>
//             </VStack>
//           </VStack>
//         */}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Image, Alert } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable } from "@/components/ui/pressable";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { Paystack } from "react-native-paystack-webview";

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState<string>("");

  // Dummy data for available jobs
  const availableJobs = [
    {
      id: "1",
      title: "Food Delivery",
      pickupLocation: "123 Main St",
      dropOffLocation: "456 Elm St",
      specialInstructions: "Handle with care",
    },
    {
      id: "2",
      title: "Package Delivery",
      pickupLocation: "789 Oak St",
      dropOffLocation: "101 Pine St",
    },
  ];

  // Dummy data for pending commission
  const pendingCommission = { amount: 5075.65 };

  useEffect(() => {
    const date = new Date();
    const formattedDate = `${date.getDate()} ${date.toLocaleString("default", {
      month: "long",
    })}, ${date.getFullYear()}`;
    setCurrentDate(formattedDate);
  }, []);

  const handleAcceptJob = (jobId: string) => {
    // router.push(`/dispatcher/job-details?jobId=${jobId}`);
  };

  const handleCommissionPayment = () => {
    Alert.alert("Payment", "Proceed to pay pending commission?", [
      { text: "Cancel", style: "cancel" },
      { text: "OK", onPress: () => router.push("/(screens)/payment-screen") },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-4 mt-10">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <VStack className="flex-row items-center justify-between mt-4">
          <VStack className="flex-row items-center">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80",
              }}
              className="w-12 h-12 rounded-full"
            />
            <VStack className="ml-4">
              <Text className="text-[14px] font-roboto_medium text-black">
                {user?.fullName || "Dispatcher"}
              </Text>
              <Text className="text-[8px] font-roboto_regular text-black">
                {currentDate}
              </Text>
            </VStack>
          </VStack>
          <MaterialIcons name="notifications-none" size={24} color="black" />
        </VStack>

        {/* JOB DASHBOARD */}
        <VStack className="mt-10">
          <Text className="text-[28px] font-roboto_bold text-[#000]">
            Job Dashboard
          </Text>
          <Text className="text-[14px] font-roboto_regular text-gray-500 mt-2">
            Available delivery jobs nearby
          </Text>

          {availableJobs.length === 0 ? (
            <Text className="mt-4">No jobs available at the moment.</Text>
          ) : (
            availableJobs.map((job) => (
              <VStack
                key={job.id}
                className="rounded-xl border border-[#D3D3D3] px-4 py-2 mt-4"
              >
                <VStack className="flex-row items-center justify-between">
                  <VStack>
                    <Text className="text-[16px] font-roboto_medium text-black">
                      {job.title}
                    </Text>
                    <Text className="text-[12px] font-roboto_regular text-black mt-1">
                      Pickup: {job.pickupLocation}
                    </Text>
                    <Text className="text-[12px] font-roboto_regular text-black mt-1">
                      Drop-off: {job.dropOffLocation}
                    </Text>
                    {job.specialInstructions && (
                      <Text className="text-[12px] font-roboto_regular text-black mt-1">
                        Instructions: {job.specialInstructions}
                      </Text>
                    )}
                  </VStack>
                  <Pressable onPress={() => handleAcceptJob(job.id)}>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={30}
                      color="black"
                    />
                  </Pressable>
                </VStack>
              </VStack>
            ))
          )}
        </VStack>

        {/* PAYMENT & COMMISSION */}
        <VStack className="mt-10">
          <Text className="text-[28px] font-roboto_bold text-[#000]">
            Commission & Settlement
          </Text>
          {pendingCommission.amount > 0 ? (
            <>
              <Text className="text-[14px] font-roboto_regular text-gray-500 mt-2">
                Pending Commission: ₦{pendingCommission.amount.toFixed(2)}
              </Text>
              <Pressable onPress={handleCommissionPayment}>
                <VStack className="rounded-xl border border-[#D3D3D3] px-4 py-2 mt-4">
                  <Text className="text-[16px] font-roboto_medium text-black">
                    Settle Commission
                  </Text>
                </VStack>
              </Pressable>
              <Paystack
                paystackKey="pk_test_e0a87b6068d91efdb6c22515393c62cad641b299"
                amount={pendingCommission.amount}
                billingEmail={user?.email || "example@example.com"}
                activityIndicatorColor="green"
                onCancel={() => Alert.alert("Payment Cancelled")}
                onSuccess={(response: any) =>
                  Alert.alert("Payment Successful", response.transactionRef)
                }
                autoStart={false}
              />
            </>
          ) : (
            <Text className="text-[14px] font-roboto_regular text-gray-500 mt-2">
              No pending commission today.
            </Text>
          )}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
