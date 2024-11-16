import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

export default function Track() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-[60px] font-inter_black">Track</Text>
      <View
        className="my-[30px] h-[1px] w-[80%]"
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}
