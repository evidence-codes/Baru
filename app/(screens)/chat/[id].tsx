import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useState } from "react";

export default function ChatScreen() {
  const { id } = useLocalSearchParams(); // Use useLocalSearchParams instead of route.params
  const router = useRouter();
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello!", sender: "John Doe" },
    { id: 2, text: "Hey there!", sender: "Me" },
  ]);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: message, sender: "Me" },
      ]);
      setMessage("");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FFFFFF] px-4 pt-6">
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <VStack className="mt-6">
          {messages.map((msg) => (
            <VStack key={msg.id} className="mb-2">
              <Text
                className={
                  msg.sender === "Me"
                    ? "text-right text-blue-500"
                    : "text-left text-black"
                }
              >
                {msg.text}
              </Text>
            </VStack>
          ))}
        </VStack>
      </ScrollView>
      <VStack className="p-4 border-t border-gray-300">
        <Input className="h-14 rounded-lg bg-[#E5E5E5] border-outline-0">
          <InputField
            placeholder="Type a message"
            className="font-roboto_regular text-[12px] text-black"
            value={message}
            onChangeText={setMessage}
          />
        </Input>
        <Button
          onPress={handleSend}
          className="bg-[#007BFF] h-14 rounded-lg mt-2"
        >
          <ButtonText className="text-white font-roboto_medium text-[16px]">
            Send
          </ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
}
