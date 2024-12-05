import {
  SafeAreaView,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { useForm } from "@/context/FormContext";
import { useState, Dispatch, SetStateAction } from "react";
import axios from "axios";

export default function Location() {
  const router = useRouter();
  const { updateFormData } = useForm();

  const [pickupLocation, setPickupLocation] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState<any[]>([]);
  const [dropOffSuggestions, setDropOffSuggestions] = useState<any[]>([]);

  const MAPBOX_API_KEY = "YOUR_MAPBOX_ACCESS_TOKEN";

  const fetchSuggestions = async (
    query: string,
    setSuggestions: Dispatch<SetStateAction<any[]>>
  ) => {
    if (query.length < 3) return; // Fetch only after 3 characters
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query
        )}.json`,
        {
          params: {
            access_token: MAPBOX_API_KEY,
            autocomplete: true,
            types: "place,locality,neighborhood,address",
            limit: 5,
          },
        }
      );
      setSuggestions(response.data.features || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleNext = () => {
    updateFormData({ pickupLocation, dropOffLocation });
    router.push("/(screens)/package-details");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FFFFFF] px-4">
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack className="mt-6">
          <TextInput
            placeholder="Pickup Location"
            value={pickupLocation}
            onChangeText={(text) => {
              setPickupLocation(text);
              fetchSuggestions(text, setPickupSuggestions);
            }}
            style={{
              backgroundColor: "#E5E5E5",
              height: 50,
              borderRadius: 8,
              paddingHorizontal: 10,
              fontSize: 16,
            }}
          />
          {pickupSuggestions.length > 0 && (
            <FlatList
              data={pickupSuggestions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setPickupLocation(item.place_name);
                    setPickupSuggestions([]);
                  }}
                >
                  <Text
                    style={{
                      padding: 10,
                      backgroundColor: "#F5F5F5",
                      borderBottomWidth: 1,
                    }}
                  >
                    {item.place_name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}

          <TextInput
            placeholder="Drop-Off Location"
            value={dropOffLocation}
            onChangeText={(text) => {
              setDropOffLocation(text);
              fetchSuggestions(text, setDropOffSuggestions);
            }}
            style={{
              backgroundColor: "#E5E5E5",
              height: 50,
              borderRadius: 8,
              paddingHorizontal: 10,
              fontSize: 16,
              marginTop: 20,
            }}
          />
          {dropOffSuggestions.length > 0 && (
            <FlatList
              data={dropOffSuggestions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setDropOffLocation(item.place_name);
                    setDropOffSuggestions([]);
                  }}
                >
                  <Text
                    style={{
                      padding: 10,
                      backgroundColor: "#F5F5F5",
                      borderBottomWidth: 1,
                    }}
                  >
                    {item.place_name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}
        </VStack>
      </ScrollView>
      <VStack className="flex-1 justify-end items-start pb-4">
        <Button
          size="lg"
          variant="solid"
          action="primary"
          className="w-full bg-[#2B63E1] h-12 rounded-[8px] mt-6 mb-4"
          onPress={handleNext}
        >
          <ButtonText className="font-roboto_medium text-[16px] text-white">
            Next
          </ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
}
