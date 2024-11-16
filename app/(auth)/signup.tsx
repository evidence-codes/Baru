import { SafeAreaView } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Link, LinkText } from "@/components/ui/link";
import { Input, InputField } from "@/components/ui/input";
import { useRouter } from "expo-router";

export default function SignUp() {
  const router = useRouter();

  const handleVerify = () => {
    router.push("/(auth)/verify");
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <VStack className="p-4 mb-4 w-full">
        <Text className="font-roboto_bold text-[32px] text-black">
          Enter your mobile number
        </Text>

        <Text className="font-inter_regular text-[14px] text-[#979797] mt-4">
          We will send an OTP to you on this number
        </Text>
      </VStack>

      <VStack className="p-4">
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          className="w-full h-14 bg-[#E5E5E5] rounded-lg px-6 outline-none"
        >
          <Text className="font-inter_regular text-[14px] text-[#121212]">
            +234
          </Text>
          <InputField
            placeholder="Mobile Number"
            className="text-[#757575] font-inter_regular text-[14px] outline-none"
          />
        </Input>
      </VStack>

      <VStack className="px-4">
        <Button
          size="lg"
          variant="solid"
          action="primary"
          className="w-full bg-[#2B63E1] h-12 rounded-[8px] mt-6 mb-4 shadow-lg shadow-black/50"
          onPress={handleVerify}
        >
          <ButtonText className="font-roboto_medium text-[16px] text-white">
            Send me the code
          </ButtonText>
        </Button>
      </VStack>

      <VStack className="flex-1 justify-end items-center p-4">
        <Text className="font-inter_regular text-[12px] text-[#979797] text-center">
          By continuing, you consent to receive messages via WhatsApp, SMS, or
          RCS, including those sent through automated methods, from Barῦ and its
          affiliates and also agree to our{" "}
          <Link className="" isExternal>
            <LinkText className="font-inter_regular text-[12px] no-underline">
              Terms of Service
            </LinkText>
          </Link>
          and{" "}
          <Link isExternal>
            <LinkText className="font-inter_regular text-[12px] no-underline">
              Privacy Policy
            </LinkText>
          </Link>
        </Text>
      </VStack>
    </SafeAreaView>
  );
}
