import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useForm, FormData } from "@/context/FormContext";
import { useLocation } from "@/context/LocationContext";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
} from "@/components/ui/actionsheet";
import Money from "@/assets/images/svg/money.svg";
import { VStack } from "@/components/ui/vstack";
import Car from "@/assets/images/svg/package-car.svg";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { createPackage } from "@/api/package";
import { Response } from "@/constants/ApiResponse";
import { router } from "expo-router";

export default function Map() {
  const { formData, resetFormData } = useForm();
  console.log(formData);
  const { locationData } = useLocation();

  const pickupLocation = locationData.pickupCoords;
  const dropOffLocation = locationData.dropOffCoords;

  const [pickupCoords, setPickupCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [dropOffCoords, setDropOffCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [routeCoords, setRouteCoords] = useState<
    Array<{ latitude: number; longitude: number }>
  >([]);
  const [showActionsheet, setShowActionsheet] = useState(true);
  const handleClose = () => setShowActionsheet(false);

  const { mutate: confirmDelivery } = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await createPackage(data);
      console.log(response.data);
      return response.data as Response;
    },
    onSuccess: async (data: Response) => {
      if (data.success) {
        resetFormData();
        router.push("/(tabs)/home");
      } else {
        console.error(data.message);
      }
    },
    onError: (error: any) => {
      if (error.response) {
        const backendErrorMessage =
          error.response.data?.message || "An error occurred";
        console.error(backendErrorMessage);
      } else {
        console.error("An error occurred while creating a package");
      }

      console.error("Error creating package:", error.response?.data?.message);
    },
  });

  const handleSubmit = () => {
    if (formData) {
      confirmDelivery(formData);
    }
  };

  useEffect(() => {
    if (pickupLocation && dropOffLocation) {
      setPickupCoords({
        latitude: pickupLocation?.lat,
        longitude: pickupLocation?.lon,
      });
      setDropOffCoords({
        latitude: dropOffLocation?.lat,
        longitude: dropOffLocation?.lon,
      });
      setRouteCoords([
        { latitude: pickupLocation?.lat, longitude: pickupLocation?.lon },
        { latitude: dropOffLocation?.lat, longitude: dropOffLocation?.lon },
      ]);
    }
  }, [pickupLocation, dropOffLocation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude:
            pickupLocation && dropOffLocation
              ? (pickupLocation.lat + dropOffLocation.lat) / 2
              : 0,
          longitude:
            pickupLocation && dropOffLocation
              ? (pickupLocation.lon + dropOffLocation.lon) / 2
              : 0,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {/* Pickup Marker */}
        {pickupCoords && (
          <Marker
            coordinate={pickupCoords}
            title="Pickup Location"
            pinColor="blue"
          />
        )}

        {/* Drop-Off Marker */}
        {dropOffCoords && (
          <Marker
            coordinate={dropOffCoords}
            title="Drop-Off Location"
            pinColor="red"
          />
        )}

        {/* Draw a route/line using Polyline */}
        {routeCoords.length > 1 && (
          <Polyline
            coordinates={routeCoords}
            strokeColor="green"
            strokeWidth={4}
          />
        )}
      </MapView>

      <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText>
              <VStack className="rounded-lg border border-outline-200">
                <VStack className="p-4 flex-row">
                  <Car />
                  <VStack className="ml-4">
                    <VStack className="flex-row justify-between">
                      <Text className="font-roboto_medium text-black text-[16px]">
                        Package
                      </Text>
                      <Text className="font-roboto_medium text-black ml-8 text-[16px]">
                        NGN {formData.deliveryCost}
                      </Text>
                    </VStack>
                    <VStack className="flex-row justify-between">
                      <Text className="font-roboto_regular text-black">
                        {formData.distance}km
                      </Text>
                      <Text className="font-roboto_regular text-black">
                        {formData.eta}min away
                      </Text>
                    </VStack>
                  </VStack>
                </VStack>
              </VStack>
            </ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleClose}>
            <Money />
            <ActionsheetItemText className="font-roboto_medium text-[16px]">
              Cash
            </ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem>
            <ActionsheetItemText className="flex-1 font-roboto_medium items-center justify-center">
              <Button
                size="lg"
                variant="solid"
                action="primary"
                className="w-full bg-[#2B63E1] h-12 rounded-[8px] mt-6 mb-4 shadow-lg shadow-black/50"
                onPress={handleSubmit}
              >
                <ButtonText className="font-roboto_medium text-[16px] text-white">
                  Confirm Delivery
                </ButtonText>
              </Button>
            </ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mapStyle: {
    flex: 1,
  },
});
