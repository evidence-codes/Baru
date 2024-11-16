import { SafeAreaView, ImageBackground, StatusBar, Image } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { useState } from "react";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetIcon,
} from "@/components/ui/actionsheet";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const delivery = require("@/assets/images/delivery.png");
const logo = require("@/assets/images/logo.png");
const googleLogo = require("@/assets/images/devicon_google.png");

export default function GetStarted() {
  const [showActionsheet, setShowActionsheet] = useState(false);
  const handleClose = () => setShowActionsheet(false);

  const router = useRouter();

  const handleSignUp = () => {
    setShowActionsheet(false);
    router.push("/(auth)/signup");
  };

  const handleLogin = () => {
    setShowActionsheet(false);
    router.push("/(tabs)/home");
  };
  return (
    <ImageBackground
      source={delivery}
      style={{ flex: 1 }}
      resizeMode="cover" // Adjusts how the image scales
    >
      {/* Set the status bar items to black */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <SafeAreaView style={{ flex: 1 }}>
        {/* <VStack className="items-center mt-10 mb-6 w-full">
          <Image source={logo} className="" />
        </VStack> */}

        <VStack className="flex-1 justify-end items-start pb-10 px-4">
          <VStack className="mb-4">
            <Text className="font-roboto_medium text-[36px] text-white">
              Seamless, real-time delivery at your fingertips
            </Text>
          </VStack>

          <Button
            size="lg"
            variant="solid"
            action="primary"
            className="w-full bg-[#2B63E1] h-12 rounded-[8px] mt-6 mb-4"
            onPress={() => setShowActionsheet(true)}
          >
            <ButtonText className="font-roboto_medium text-[16px] text-white">
              Let's go
            </ButtonText>
          </Button>
          <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
            <ActionsheetBackdrop />
            <ActionsheetContent>
              <ActionsheetDragIndicatorWrapper>
                <ActionsheetDragIndicator />
              </ActionsheetDragIndicatorWrapper>
              <ActionsheetItem>
                <ActionsheetItemText className="flex-1 font-roboto_medium items-center justify-center">
                  <Button
                    size="lg"
                    variant="solid"
                    action="primary"
                    className="w-full bg-[#2B63E1] h-12 rounded-[8px] mt-6 mb-4 shadow-lg shadow-black/50"
                    onPress={handleSignUp}
                  >
                    <ButtonText className="font-roboto_medium text-[16px] text-white">
                      Sign Up
                    </ButtonText>
                  </Button>
                </ActionsheetItemText>
              </ActionsheetItem>
              <ActionsheetItem>
                <ActionsheetItemText>
                  <Button
                    size="lg"
                    variant="outline"
                    action="primary"
                    className="w-full h-12 rounded-[8px] mt-6 mb-4"
                    onPress={handleLogin}
                  >
                    <ButtonText className="font-roboto_medium text-[16px] text-black">
                      Login to Barũ
                    </ButtonText>
                  </Button>
                </ActionsheetItemText>
              </ActionsheetItem>
              <ActionsheetItem>
                <ActionsheetItemText>
                  <VStack className="flex-row items-center my-4">
                    <VStack
                      style={{ flex: 1, height: 1, backgroundColor: "#ccc" }}
                    />
                    <Text className="mx-2 font-roboto_regular text-[#AEAEAE] text-[12px]">
                      or
                    </Text>
                    <VStack
                      style={{ flex: 1, height: 1, backgroundColor: "#ccc" }}
                    />
                  </VStack>
                </ActionsheetItemText>
              </ActionsheetItem>
              <ActionsheetItem onPress={handleClose}>
                <ActionsheetItemText>
                  <Button
                    size="lg"
                    variant="outline"
                    action="primary"
                    className="w-full h-12 rounded-[8px] mt-6 mb-4 flex-row items-center"
                  >
                    <Image
                      source={googleLogo}
                      style={{ width: 20, height: 20, marginRight: 10 }}
                      resizeMode="contain"
                    />
                    <ButtonText className="font-roboto_medium text-[16px] text-black">
                      Continue with Google
                    </ButtonText>
                  </Button>
                </ActionsheetItemText>
              </ActionsheetItem>

              <ActionsheetItem onPress={handleClose}>
                <ActionsheetItemText>
                  <Button
                    size="lg"
                    variant="outline"
                    action="primary"
                    className="w-full h-12 rounded-[8px] mt-6 mb-4 flex-row items-center"
                  >
                    <FontAwesome
                      name="apple"
                      size={20}
                      color="black"
                      style={{ marginRight: 10 }}
                    />
                    <ButtonText className="font-roboto_medium text-[16px] text-black">
                      Continue with Apple
                    </ButtonText>
                  </Button>
                </ActionsheetItemText>
              </ActionsheetItem>
            </ActionsheetContent>
          </Actionsheet>
        </VStack>
      </SafeAreaView>
    </ImageBackground>
  );
}
