import * as SecureStore from "expo-secure-store";
import { SecureStoreKey } from "../../core/enum/secure.store";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import auth from "@react-native-firebase/auth";

const useToken = () => {
  const router = useRouter();

  const checkToken = async () => {
    const tokenExists = await SecureStore.getItemAsync(SecureStoreKey.TOKEN);
    const currentUser = auth().currentUser;
    if (tokenExists && currentUser) {
      console.log(`token found and current user will be deleted`);
      try {
        await currentUser.delete();

        await SecureStore.deleteItemAsync(SecureStoreKey.TOKEN);

        router.replace("/");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }
  };

  useEffect(() => {
    checkToken();
  }, []);
  return { checkToken };
};

export default useToken;
