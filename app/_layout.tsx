import React from "react";
import { StatusBar } from "expo-status-bar"; // Import StatusBar from expo-status-bar
import FontAwesome from "@expo/vector-icons/FontAwesome";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/components/useColorScheme";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { FormProvider } from "@/context/FormContext";
import { LocationProvider } from "@/context/LocationContext";

const client = new QueryClient();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(auth)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "Roboto-Black": require("../assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Thin": require("../assets/fonts/Roboto-Thin.ttf"),
    "Inter-Black": require("../assets/fonts/Inter_24pt-Black.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter_24pt-Bold.ttf"),
    "Inter-ExtraBold": require("../assets/fonts/Inter_24pt-ExtraBold.ttf"),
    "Inter-ExtraLight": require("../assets/fonts/Inter_24pt-ExtraLight.ttf"),
    "Inter-Light": require("../assets/fonts/Inter_24pt-Light.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter_24pt-Medium.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter_24pt-Regular.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter_24pt-SemiBold.ttf"),
    "Inter-Thin": require("../assets/fonts/Inter_24pt-Thin.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync().catch(console.warn);
    }
  }, [loaded]);

  useReactQueryDevTools(client);

  return (
    <AuthProvider>
      <QueryClientProvider client={client}>
        <GluestackUIProvider mode="light">
          <RootLayoutNav />

          {/* Add StatusBar component here */}
          <StatusBar style="dark" backgroundColor="white" />
        </GluestackUIProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const { user, loading } = useAuth();
  const colorScheme = useColorScheme();

  if (loading) return null;

  return (
    <FormProvider>
      <LocationProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          {/* Slot will automatically render the correct navigator */}
          <Slot />
        </ThemeProvider>
      </LocationProvider>
    </FormProvider>
  );
}
