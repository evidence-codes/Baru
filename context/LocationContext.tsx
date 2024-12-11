import React, { createContext, useContext, useState } from "react";

export interface LocationData {
  pickupCoords?: { lat: number; lon: number };
  dropOffCoords?: { lat: number; lon: number };
}

interface LocationContextType {
  locationData: LocationData;
  updateLocationData: (newData: Partial<LocationData>) => void;
  resetLocationData: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locationData, setLocationData] = useState<LocationData>({});

  const updateLocationData = (newData: Partial<LocationData>) => {
    setLocationData((prev) => ({ ...prev, ...newData }));
  };

  const resetLocationData = () => {
    setLocationData({});
  };

  return (
    <LocationContext.Provider
      value={{ locationData, updateLocationData, resetLocationData }}
    >
      {children}
    </LocationContext.Provider>
  );
};
