import axios from "axios";
import { BASE_URL } from "../config";
import { FormData } from "@/context/FormContext";

export const createPackage = (data: FormData) => {
  return axios.post(`${BASE_URL}/package/create`, data);
};
