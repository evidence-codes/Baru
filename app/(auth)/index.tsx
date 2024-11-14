import { SafeAreaView, ImageBackground, StatusBar, Image } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";

const delivery = require("@/assets/images/delivery.png");
const logo = require("@/assets/images/logo.png");

export default function GetStarted() {
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
          >
            <ButtonText className="font-roboto_medium text-[16px]">
              Let's go
            </ButtonText>
          </Button>
        </VStack>
      </SafeAreaView>
    </ImageBackground>
  );
}
