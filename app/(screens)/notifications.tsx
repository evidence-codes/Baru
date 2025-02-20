import { SafeAreaView } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function NotificationsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Order Delivered",
      message: "Your recent order has been delivered successfully.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "2",
      title: "New Promotion!",
      message: "Get 20% off your next order. Limited time offer!",
      time: "1 day ago",
      read: true,
    },
  ]);

  const handlePress = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
    router.push("/(tabs)/home");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FFFFFF] px-4 pt-6">
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack className="mt-6">
          <Text className="text-black text-xl font-roboto_medium mb-4">
            Notifications
          </Text>
          {notifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              className={`p-4 border-b border-gray-300 ${
                notification.read ? "opacity-50" : "opacity-100"
              }`}
              onPress={() => handlePress(notification.id)}
            >
              <Text className="text-black text-lg font-roboto_medium">
                {notification.title}
              </Text>
              <Text className="text-gray-500 text-sm font-roboto_regular">
                {notification.message}
              </Text>
              <Text className="text-gray-400 text-xs">{notification.time}</Text>
            </TouchableOpacity>
          ))}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
