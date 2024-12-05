import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
// import { Icon, ChevronLeftIcon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import Icon from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";

export default function AuthLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="signup"
        options={{
          headerShown: true,
          title: "",
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.back();
              }}
            >
              <Icon name="chevron-left" size={14} color="black" />
            </Pressable>
          ),
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="verify"
        options={{
          headerShown: true,
          title: "",
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.back();
              }}
            >
              <Icon name="chevron-left" size={14} color="black" />
            </Pressable>
          ),
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          headerShown: true,
          title: "",
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.back();
              }}
            >
              <Icon name="chevron-left" size={14} color="black" />
            </Pressable>
          ),
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: true,
          title: "",
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.back();
              }}
            >
              <Icon name="chevron-left" size={14} color="black" />
            </Pressable>
          ),
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
