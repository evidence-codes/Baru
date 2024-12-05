import axios from "axios";
import { BASE_URL } from "../config";

export interface RegisterProfile {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export const sendOTP = (email: string) => {
  return axios.post(`${BASE_URL}/auth/register`, { email });
};

export const verifyOTP = (data: { email: string; otp: string }) => {
  console.log(data);
  return axios.post(`${BASE_URL}/auth/verify-email`, data);
};

export const resendOTP = (email: string) => {
  return axios.post(`${BASE_URL}/auth/resend-verification-code`, { email });
};

export const registerProfile = (data: RegisterProfile) => {
  return axios.post(`${BASE_URL}/auth/register/profile`, data);
};

export const login = (data: { email: string; password: string }) => {
  console.log(data);
  return axios.post(`${BASE_URL}/auth/login`, data);
};
