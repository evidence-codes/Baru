import axios from "axios";
import { BASE_URL } from "../config";
import { FormData } from "@/context/FormContext";
import * as SecureStore from "expo-secure-store";

export interface PriceData {
  weight: number;
  distance: number;
  category: string;
  preferredVehicle: string;
}

async function getAccessToken() {
  const userInfo = await SecureStore.getItemAsync("userInfo");
  if (userInfo) {
    const parsedUserInfo = JSON.parse(userInfo);
    return parsedUserInfo?.accessToken;
  }
}

export const createPackage = async (data: FormData) => {
  const accessToken = await getAccessToken();
  console.log(accessToken);
  return axios.post(`${BASE_URL}/packages/create`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const calculatePrice = async (data: PriceData) => {
  const accessToken = await getAccessToken();
  console.log(accessToken);
  return axios.post(`${BASE_URL}/packages/calculate-price`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getPackages = async () => {
  const accessToken = await getAccessToken();
  return axios.get(`${BASE_URL}/packages`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
