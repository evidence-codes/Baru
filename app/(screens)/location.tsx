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
import { useLocation } from "@/context/LocationContext";
import { useState, useEffect } from "react";
import * as LocationAPI from "expo-location";
import axios from "axios";
import { TOMTOM_API_KEY } from "@/config";
import { useDebounce } from "@/hooks/useDebounce";

// Function to convert an address to coordinates using TomTom Geocoding API
const getCoordinatesFromAddress = async (address: string) => {
  try {
    const response = await axios.get(
      `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(
        address
      )}.json`,
      {
        params: {
          key: TOMTOM_API_KEY,
        },
      }
    );

    const { lat, lon } = response?.data?.results?.[0]?.position || {};
    return lat && lon ? { lat, lon } : null;
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
};

// Function to calculate distance between two coordinates using the TomTom Routing API
const calculateDistanceAndTime = async (
  pickupCoords: { lat: number; lon: number },
  dropOffCoords: { lat: number; lon: number }
) => {
  try {
    const response = await axios.get(
      `https://api.tomtom.com/maps/orbis/routing/calculateRoute/${pickupCoords.lat},${pickupCoords.lon}:${dropOffCoords.lat},${dropOffCoords.lon}/json`,
      {
        params: {
          apiVersion: "2",
          key: TOMTOM_API_KEY,
          sectionType: "carTrain",
          extendedRouteRepresentation: "distance",
        },
      }
    );

    const route = response?.data?.routes?.[0];
    const distanceInMeters = route?.summary?.lengthInMeters || 0;
    const travelTimeInSeconds = route?.summary?.travelTimeInSeconds || 0;

    console.log("Calculated distance (in meters):", distanceInMeters);
    console.log("Estimated travel time (in seconds):", travelTimeInSeconds);

    const distanceInKm = distanceInMeters / 1000; // Convert distance to kilometers
    const etaInMinutes = Math.ceil(travelTimeInSeconds / 60); // Convert seconds to minutes

    return { distanceInKm, etaInMinutes };
  } catch (error) {
    console.error("Error calculating distance or travel time:", error);
    return { distanceInKm: 0, etaInMinutes: 0 };
  }
};

export default function Location() {
  const router = useRouter();
  const { updateFormData } = useForm();
  const { updateLocationData } = useLocation();

  const [pickupLocation, setPickupLocation] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState<any[]>([]);
  const [dropOffSuggestions, setDropOffSuggestions] = useState<any[]>([]);

  const [distance, setDistance] = useState(0);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await LocationAPI.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Permission to access location was denied.");
        return;
      }

      try {
        const location = await LocationAPI.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setUserLocation({ lat: latitude, lon: longitude });

        const reverseGeocode = await axios.get(
          `https://api.tomtom.com/search/2/reverseGeocode/${latitude},${longitude}.json`,
          {
            params: {
              key: TOMTOM_API_KEY,
            },
          }
        );

        if (reverseGeocode.data.addresses.length > 0) {
          const address =
            reverseGeocode.data.addresses[0].address.freeformAddress;
          setPickupLocation(address);
        }
      } catch (error) {
        console.error("Error getting location or reverse geocoding:", error);
      }
    })();
  }, []);

  const fetchSuggestions = async (
    query: string,
    setSuggestions: React.Dispatch<React.SetStateAction<any[]>>,
    userLocation: { lat: number; lon: number } | null = null
  ) => {
    if (query.length < 3) return;

    try {
      const response = await axios.get(
        `https://api.tomtom.com/search/2/search/${encodeURIComponent(
          query
        )}.json`,
        {
          params: {
            key: TOMTOM_API_KEY,
            limit: 5, // Limit results
            typeahead: true, // Predictive search for better matches
            lat: userLocation?.lat, // Latitude for proximity search
            lon: userLocation?.lon, // Longitude for proximity search
            radius: 10000, // Search within 10 km if userLocation is available
          },
        }
      );
      setSuggestions(response.data.results || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const debouncedPickupLocation = useDebounce(pickupLocation, 300);
  const debouncedDropOffLocation = useDebounce(dropOffLocation, 300);

  useEffect(() => {
    if (debouncedPickupLocation) {
      fetchSuggestions(
        debouncedPickupLocation,
        setPickupSuggestions,
        userLocation
      );
    }
  }, [debouncedPickupLocation]);

  useEffect(() => {
    if (debouncedDropOffLocation) {
      fetchSuggestions(
        debouncedDropOffLocation,
        setDropOffSuggestions,
        userLocation
      );
    }
  }, [debouncedDropOffLocation]);

  const handleNext = async () => {
    const pickupCoords = await getCoordinatesFromAddress(pickupLocation);
    const dropOffCoords = await getCoordinatesFromAddress(dropOffLocation);

    if (pickupCoords && dropOffCoords) {
      const { distanceInKm, etaInMinutes } = await calculateDistanceAndTime(
        pickupCoords,
        dropOffCoords
      );

      console.log("Calculated distance (in km):", distanceInKm);
      console.log(
        "Calculated estimated time of arrival (in minutes):",
        etaInMinutes
      );

      setDistance(distanceInKm); // Set the distance in kilometers locally

      // Pass data to form context
      updateFormData({
        pickupLocation,
        dropOffLocation,
        distance: distanceInKm,
        eta: etaInMinutes,
      });

      updateLocationData({
        pickupCoords,
        dropOffCoords,
      });

      router.push("/(screens)/package-details");
    } else {
      console.error("Could not determine coordinates.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FFFFFF] px-4">
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack className="mt-6">
          {/* Pickup Location Input */}
          <TextInput
            placeholder="Pickup Location"
            value={pickupLocation}
            onChangeText={(text) => {
              setPickupLocation(text);
            }}
            style={{
              backgroundColor: "#E5E5E5",
              height: 50,
              borderRadius: 8,
              paddingHorizontal: 10,
              fontSize: 16,
              fontFamily: "Roboto-Regular",
            }}
          />

          {pickupSuggestions.length > 0 && (
            <FlatList
              data={pickupSuggestions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setPickupLocation(item.address.freeformAddress);
                    setPickupSuggestions([]);
                  }}
                >
                  <Text
                    style={{
                      padding: 10,
                      backgroundColor: "#F5F5F5",
                      fontFamily: "Roboto-Regular",
                    }}
                  >
                    {item.address.freeformAddress}
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}

          {/* Drop-Off Location Input */}
          <TextInput
            placeholder="Drop-Off Location"
            value={dropOffLocation}
            onChangeText={(text) => {
              setDropOffLocation(text);
            }}
            style={{
              backgroundColor: "#E5E5E5",
              height: 50,
              borderRadius: 8,
              paddingHorizontal: 10,
              fontSize: 16,
              marginTop: 20,
              fontFamily: "Roboto-Regular",
            }}
          />

          {dropOffSuggestions.length > 0 && (
            <FlatList
              data={dropOffSuggestions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setDropOffLocation(item.address.freeformAddress);
                    setDropOffSuggestions([]);
                  }}
                >
                  <Text
                    style={{
                      padding: 10,
                      backgroundColor: "#F5F5F5",
                      fontFamily: "Roboto-Regular",
                    }}
                  >
                    {item.address.freeformAddress}
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}
        </VStack>
      </ScrollView>
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
    </SafeAreaView>
  );
}
