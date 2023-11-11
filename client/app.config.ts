import { ExpoConfig, ConfigContext } from "@expo/config";
import * as dotenv from "dotenv";
dotenv.config();

export default ({ config }: ConfigContext) => ({
  ...config,
  expo: {
    name: "client",
    slug: "client",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      googleServicesFile: "./google-services.json",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.tudor14abw.client",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      "@react-native-firebase/auth",
      "@react-native-google-signin/google-signin",
      [
        "react-native-fbsdk-next",
        {
          appID: process.env.FACEBOOK_APP_ID!,
          clientToken: process.env.FACEBOOK_CLIENT_TOKEN!,
          displayName: process.env.FACEBOOK_DISPLAY_NAME!,
          scheme: process.env.FACEBOOK_SCHEME!,
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "ae0d5ec1-b441-4a15-95f5-468e5750f2b3",
      },
    },
  },
});
