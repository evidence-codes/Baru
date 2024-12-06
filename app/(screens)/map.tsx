import React, { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { useRouter } from "expo-router";
import MapboxGL from "@rnmapbox/maps";
import axios from "axios";
import { useForm } from "@/context/FormContext";
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

export default function Map() {
  const router = useRouter();
  const { formData } = useForm();

  const pickupLocation = formData.pickupLocation;
  const dropOffLocation = formData.dropOffLocation;

  const [pickupCoords, setPickupCoords] = useState<[number, number] | null>(
    null
  );
  const [dropOffCoords, setDropOffCoords] = useState<[number, number] | null>(
    null
  );
  const [route, setRoute] = useState(null);
  const [showActionsheet, setShowActionsheet] = useState(false);
  const handleClose = () => setShowActionsheet(false);

  const MAPBOX_API_KEY = "YOUR_MAPBOX_ACCESS_TOKEN";

  const fetchCoordinates = async (
    address: string,
    setCoords: (coords: [number, number]) => void
  ) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          address
        )}.json`,
        {
          params: {
            access_token: MAPBOX_API_KEY,
            limit: 1,
          },
        }
      );
      const [longitude, latitude] = response.data.features[0].center;
      setCoords([longitude, latitude]);
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  const fetchRoute = async () => {
    if (!pickupCoords || !dropOffCoords) return;

    try {
      const response = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoords.join(
          ","
        )};${dropOffCoords.join(",")}`,
        {
          params: {
            access_token: MAPBOX_API_KEY,
            geometries: "geojson",
          },
        }
      );
      setRoute(response.data.routes[0].geometry.coordinates);
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  useEffect(() => {
    if (pickupLocation) fetchCoordinates(pickupLocation, setPickupCoords);
    if (dropOffLocation) fetchCoordinates(dropOffLocation, setDropOffCoords);
  }, [pickupLocation, dropOffLocation]);

  useEffect(() => {
    if (pickupCoords && dropOffCoords) {
      fetchRoute();
    }
  }, [pickupCoords, dropOffCoords]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapboxGL.MapView
        style={{ flex: 1 }}
        styleURL={MapboxGL.StyleURL.Street}
        logoEnabled={false}
        zoomEnabled
      >
        {/* Pickup Marker */}
        {pickupCoords && (
          <MapboxGL.MarkerView coordinate={pickupCoords}>
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: "blue",
                borderRadius: 10,
              }}
            />
          </MapboxGL.MarkerView>
        )}

        {/* Drop-Off Marker */}
        {dropOffCoords && (
          <MapboxGL.MarkerView coordinate={dropOffCoords}>
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: "red",
                borderRadius: 10,
              }}
            />
          </MapboxGL.MarkerView>
        )}

        {/* Route Line */}
        {route && (
          <MapboxGL.ShapeSource
            id="routeSource"
            shape={{
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: route,
              },
              properties: {},
            }}
          >
            <MapboxGL.LineLayer
              id="routeLine"
              style={{
                lineColor: "green",
                lineWidth: 4,
              }}
            />
          </MapboxGL.ShapeSource>
        )}
      </MapboxGL.MapView>

      <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText>Edit Message</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText>Mark Unread</ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>
    </SafeAreaView>
  );
}
