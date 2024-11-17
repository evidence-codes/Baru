import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import { Center } from "@/components/ui/center";
import YellowBox from "@/assets/images/svg/box.svg";
import { router, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

interface Details {
  title: string;
  id: string;
  progress: number;
  locationFrom: string;
  locationTo: string;
  dateFrom: string;
  dateTo: string;
  onPress: () => void;
}

export default function SendBox({
  title,
  id,
  progress,
  locationFrom,
  locationTo,
  dateFrom,
  dateTo,
  onPress,
}: Details) {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <VStack className="flex-row items-center justify-between rounded-[24px] bg-[#FFF4E4] py-4 my-2 relative overflow-hidden">
        <VStack className="w-1/2 px-4">
          <VStack className="w-1/2 mb-2">
            <VStack className="bg-black rounded-full px-2 py-2 items-center justify-center">
              <Text className="font-roboto_regular text-[10px] text-white">
                {title}
              </Text>
            </VStack>
          </VStack>
          <VStack className="mb-2">
            <Text className="font-roboto_bold text-[15px] text-black">
              {id}
            </Text>
          </VStack>
          <VStack className="mb-2">
            <Center>
              <Progress value={progress} size="md" orientation="horizontal">
                <ProgressFilledTrack />
              </Progress>
            </Center>
          </VStack>
          <VStack className="flex-row items-center justify-between">
            <Text className="font-roboto_regular text-black text-[14px]">
              {locationFrom}
            </Text>
            <Text className="font-roboto_regular text-black text-[14px]">
              {locationTo}
            </Text>
          </VStack>
          <VStack className="flex-row items-center justify-between">
            <Text className="font-roboto_regular text-black text-[10px]">
              {dateFrom}
            </Text>
            <Text className="font-roboto_regular text-black text-[10px]">
              {dateTo}
            </Text>
          </VStack>
        </VStack>
        <VStack className="absolute bottom-0 right-0 rounded-br-[24px] overflow-hidden">
          <YellowBox className="w-full h-full" />
        </VStack>
      </VStack>
    </TouchableOpacity>
  );
}
