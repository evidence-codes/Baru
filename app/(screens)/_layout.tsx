import { Stack } from "expo-router";
import { Pressable } from "@/components/ui/pressable";
import Icon from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function ScreensLayout() {
  const router = useRouter();

  return (
    <>
      <Stack>
        <Stack.Screen
          name="sent-details"
          options={{
            headerShown: true,
            title: "Details",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontFamily: "Roboto-Bold",
              fontSize: 20,
              color: "black",
            },
            headerStyle: {
              backgroundColor: "#FFF4E4",
            },
            headerShadowVisible: false,
            headerLeft: () => (
              <Pressable
                onPress={() => {
                  router.back();
                }}
              >
                <Icon name="keyboard-arrow-left" size={30} color="black" />
              </Pressable>
            ),
          }}
        />

        <Stack.Screen
          name="receive-details"
          options={{
            headerShown: true,
            title: "Details",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontFamily: "Roboto-Bold",
              fontSize: 20,
              color: "black",
            },
            headerStyle: {
              backgroundColor: "#D6E6FF",
            },
            headerShadowVisible: false,
            headerLeft: () => (
              <Pressable
                onPress={() => {
                  router.back();
                }}
              >
                <Icon name="keyboard-arrow-left" size={30} color="black" />
              </Pressable>
            ),
          }}
        />

        <Stack.Screen
          name="cancelled-details"
          options={{
            headerShown: true,
            title: "Details",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontFamily: "Roboto-Bold",
              fontSize: 20,
              color: "black",
            },
            headerStyle: {
              backgroundColor: "#AEAEAE",
            },
            headerShadowVisible: false,
            headerLeft: () => (
              <Pressable
                onPress={() => {
                  router.back();
                }}
              >
                <Icon name="keyboard-arrow-left" size={30} color="black" />
              </Pressable>
            ),
          }}
        />
      </Stack>
    </>
  );
}
