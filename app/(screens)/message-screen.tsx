import { SafeAreaView } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { RelativePathString, useRouter } from "expo-router";
import { useState } from "react";

const conversations = [
  { id: 1, name: "John Doe", lastMessage: "Hey, how are you?" },
  { id: 2, name: "Jane Smith", lastMessage: "Let's meet tomorrow." },
  { id: 3, name: "Mark Brown", lastMessage: "Got the files!" },
];

export default function MessagesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#FFFFFF] px-4 pt-6">
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack className="mt-6">
          <Text className="text-black text-xl font-roboto_medium mb-4">
            Messages
          </Text>
          {conversations.map((chat) => (
            <TouchableOpacity
              key={chat.id}
              className="p-4 border-b border-gray-300"
              onPress={() =>
                router.push(
                  `/(screens)/chat/${chat.id.toString()}` as RelativePathString
                )
              }
            >
              <Text className="text-black text-lg font-roboto_medium">
                {chat.name}
              </Text>
              <Text className="text-gray-500 text-sm">{chat.lastMessage}</Text>
            </TouchableOpacity>
          ))}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}

// export function ChatScreen({ route }: any) {
//   const { id } = route.params;
//   const router = useRouter();
//   const [messages, setMessages] = useState([
//     { id: 1, text: "Hello!", sender: "John Doe" },
//     { id: 2, text: "Hey there!", sender: "Me" },
//   ]);
//   const [message, setMessage] = useState("");

//   const handleSend = () => {
//     if (message.trim()) {
//       setMessages([
//         ...messages,
//         { id: messages.length + 1, text: message, sender: "Me" },
//       ]);
//       setMessage("");
//     }
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-[#FFFFFF] px-4 pt-6">
//       <StatusBar style="dark" backgroundColor="#FFFFFF" />
//       <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
//         <VStack className="mt-6">
//           {messages.map((msg) => (
//             <VStack key={msg.id} className="mb-2">
//               <Text
//                 className={
//                   msg.sender === "Me"
//                     ? "text-right text-blue-500"
//                     : "text-left text-black"
//                 }
//               >
//                 {msg.text}
//               </Text>
//             </VStack>
//           ))}
//         </VStack>
//       </ScrollView>
//       <VStack className="p-4 border-t border-gray-300">
//         <Input className="h-14 rounded-lg bg-[#E5E5E5] border-outline-0">
//           <InputField
//             placeholder="Type a message"
//             className="font-roboto_regular text-[12px] text-black"
//             value={message}
//             onChangeText={setMessage}
//           />
//         </Input>
//         <Button
//           onPress={handleSend}
//           className="bg-[#007BFF] h-14 rounded-lg mt-2"
//         >
//           <ButtonText className="text-white font-roboto_medium text-[16px]">
//             Send
//           </ButtonText>
//         </Button>
//       </VStack>
//     </SafeAreaView>
//   );
// }
