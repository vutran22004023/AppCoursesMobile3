import { useCallback } from "react";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { Platform } from "react-native";

export const useLinking = () => {
  const url = Linking.useURL();

  const openLink = useCallback(
    async (url: string, appStoreURL: string, playStoreURL: string) => {
      const canOpen = await Linking.canOpenURL(url);

      if (canOpen) {
        await Linking.openURL(url);
      } else {
        if (Platform.OS === "ios") {
          await Linking.openURL(appStoreURL);
        } else if (Platform.OS === "android") {
          await Linking.openURL(playStoreURL);
        } else {
          await WebBrowser.openBrowserAsync(url);
        }
      }
    },
    []
  );

  const createLink = useCallback(
    (path = "", queryParams: Record<string, any> = {}) => {
      const baseURL = Linking.createURL(path);

      const queryString = new URLSearchParams(queryParams).toString();

      const url = `${baseURL}${queryString ? `?${queryString}` : ""}`;

      return url;
    },
    []
  );

  const parseLink = useCallback((url: string) => {
    const parsedUrl = Linking.parse(url.replace("#", "?"));
    const { queryParams } = parsedUrl;

    return queryParams || {};
  }, []);

  return { url, openLink, createLink, parseLink };
};
