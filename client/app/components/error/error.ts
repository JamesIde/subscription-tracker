import { AxiosError } from "axios";
import { Alert } from "react-native";

export const ErrorAlert = (errorToBeLogged?: any) => {
  return Alert.alert(
    "An error occured processing your request",
    "Please try again later or contact support.",
    [{ text: "Ok" }]
  );
};
