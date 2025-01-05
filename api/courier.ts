import axios from "axios";
import { BASE_URL } from "../config";
import * as SecureStore from "expo-secure-store";

export interface RegisterCourier {
  address: string;
  licenseNumber: string;
  licenseExpiry: string;
  vehicleType: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleColor: string;
}

async function getAccessToken() {
  const userInfo = await SecureStore.getItemAsync("userInfo");
  if (userInfo) {
    const parsedUserInfo = JSON.parse(userInfo);
    return parsedUserInfo?.accessToken;
  }
}

export const login = (data: { email: string; password: string }) => {
  console.log(data);
  return axios.post(`${BASE_URL}/courier/login`, data);
};

export const register = async (data: RegisterCourier) => {
  const accessToken = await getAccessToken();
  console.log(accessToken);
  return axios.post(`${BASE_URL}/courier/register`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
