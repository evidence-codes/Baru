import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView, View, Image, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useState, useRef } from "react";
import { FontAwesome } from "@expo/vector-icons";

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello!",
      sender: "John Doe",
      avatar: "https://i.pravatar.cc/300",
    },
    { id: 2, text: "Hey there!", sender: "Me", avatar: "" },
  ]);
  const [message, setMessage] = useState("");
  const flatListRef = useRef<FlatList>(null);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: "Me",
        avatar: "",
      };
      setMessages((prevMessages) => [newMessage, ...prevMessages]); // Prepend new messages
      setMessage("");

      // Scroll to the bottom when a new message is sent
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
      }, 100);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" backgroundColor="#FFFFFF" />

      {/* Chat Messages with FlatList (Inverted for Bottom-to-Top) */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: msg }) => (
          <View
            className={`flex-row items-end ${
              msg.sender === "Me" ? "justify-end" : "justify-start"
            } px-4 my-2`}
          >
            {msg.sender !== "Me" && (
              <Image
                source={{ uri: msg.avatar }}
                className="w-8 h-8 rounded-full mr-2"
              />
            )}
            <View
              className={`rounded-lg px-4 py-2 max-w-[75%] ${
                msg.sender === "Me"
                  ? "bg-[#007AFF] text-white self-end"
                  : "bg-gray-200 self-start"
              }`}
            >
              <Text
                className={`text-[14px] font-roboto_regular ${
                  msg.sender === "Me" ? "text-white" : "text-black"
                }`}
              >
                {msg.text}
              </Text>
            </View>
          </View>
        )}
        inverted // Invert list to start from the bottom
        contentContainerStyle={{ paddingTop: 10 }}
      />

      {/* Message Input */}
      <VStack className="p-4 border-t border-gray-300 flex-row items-center bg-white">
        <Input className="flex-1 h-12 rounded-full bg-gray-100 px-4 font-roboto_regular">
          <InputField
            placeholder="Message..."
            className="text-[14px] text-black font-roboto_regular"
            value={message}
            onChangeText={setMessage}
          />
        </Input>
        <Button onPress={handleSend} className="ml-2 bg-transparent">
          <FontAwesome name="paper-plane" size={24} color="#007AFF" />
        </Button>
      </VStack>
    </SafeAreaView>
  );
}
