import { AppConstants } from "../config/config";
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: AppConstants.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const ApiEndpoints = {
  REGISTRATION: "auth/registration",
  LOGIN: "auth/login",
};
