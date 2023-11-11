export const AppConstants = {
  SOCIAL_LOGIN: {
    FACEBOOK: {
      SCOPES: ["public_profile", "email"],
    },
    GOOGLE: {
      WEB_CLIENT_ID: process.env.GOOGLE_WEBCLIENTID,
    },
  },
  BASE_URL: "http://192.168.1.109:3000/api/v1/", // TODO change
};
