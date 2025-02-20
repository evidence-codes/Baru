import { Stack } from "expo-router";
import { Pressable } from "@/components/ui/pressable";
import Icon from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function ChatLayout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
