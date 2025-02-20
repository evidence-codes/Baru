import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { useContext, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";

export default function EditProfileScreen() {
  const router = useRouter();

  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName);
  const [email, setEmail] = useState(user?.email);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FFFFFF] px-4 pt-6">
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack className="mt-6">
          <VStack className="mb-4">
            <Text className="font-roboto_regular text-[16px] text-black">
              Full Name
            </Text>
            <VStack className="mt-2">
              <Input
                className={`h-14 rounded-lg ${
                  fullName ? "bg-[#ffffff]" : "bg-[#E5E5E5] border-outline-0"
                }`}
              >
                <InputField
                  placeholder="Full Name"
                  className={`font-roboto_regular text-[12px] ${
                    fullName ? "text-black" : "text-[#979797]"
                  }`}
                  defaultValue={fullName}
                  onChangeText={setFullName}
                  editable={false}
                />
              </Input>
            </VStack>
          </VStack>

          <VStack className="mb-4">
            <Text className="font-roboto_regular text-[16px] text-black">
              Email
            </Text>
            <VStack className="mt-2">
              <Input
                className={`h-14 rounded-lg ${
                  email ? "bg-[#ffffff]" : "bg-[#E5E5E5] border-outline-0"
                }`}
              >
                <InputField
                  placeholder="Email"
                  className={`font-roboto_regular text-[12px] ${
                    email ? "text-black" : "text-[#979797]"
                  }`}
                  defaultValue={email}
                  onChangeText={setEmail}
                  editable={false}
                />
              </Input>
            </VStack>
          </VStack>

          <VStack className="mb-4">
            <Text className="font-roboto_regular text-[16px] text-black">
              Old Password
            </Text>
            <VStack className="mt-2">
              <Input
                className={`h-14 rounded-lg ${
                  oldPassword ? "bg-[#ffffff]" : "bg-[#E5E5E5] border-outline-0"
                }`}
              >
                <InputField
                  placeholder="Old Password"
                  className={`font-roboto_regular text-[12px] ${
                    oldPassword ? "text-black" : "text-[#979797]"
                  }`}
                  defaultValue={oldPassword}
                  onChangeText={setOldPassword}
                  secureTextEntry
                />
              </Input>
            </VStack>
          </VStack>

          <VStack className="mb-4">
            <Text className="font-roboto_regular text-[16px] text-black">
              New Password
            </Text>
            <VStack className="mt-2">
              <Input
                className={`h-14 rounded-lg ${
                  newPassword ? "bg-[#ffffff]" : "bg-[#E5E5E5] border-outline-0"
                }`}
              >
                <InputField
                  placeholder="New Password"
                  className={`font-roboto_regular text-[12px] ${
                    newPassword ? "text-black" : "text-[#979797]"
                  }`}
                  defaultValue={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
                />
              </Input>
            </VStack>
          </VStack>

          <VStack className="mb-4">
            <Text className="font-roboto_regular text-[16px] text-black">
              Confirm Password
            </Text>
            <VStack className="mt-2">
              <Input
                className={`h-14 rounded-lg ${
                  confirmPassword
                    ? "bg-[#ffffff]"
                    : "bg-[#E5E5E5] border-outline-0"
                }`}
              >
                <InputField
                  placeholder="Confirm Password"
                  className={`font-roboto_regular text-[12px] ${
                    confirmPassword ? "text-black" : "text-[#979797]"
                  }`}
                  defaultValue={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </Input>
            </VStack>
          </VStack>

          {error && (
            <Text className="text-red-500 text-center mb-4">{error}</Text>
          )}

          <Button onPress={handleSave} className="bg-[#007BFF] h-14 rounded-lg">
            <ButtonText className="text-white font-roboto_medium text-[16px]">
              Save Changes
            </ButtonText>
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
