import { useState, useEffect } from "react";
import { Dimensions, Platform, StatusBar } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

export const useScreenDimensions = () => {
  const getWindowHeight = () => {
    return Platform.OS === "android" && Platform.Version >= 29
      ? Dimensions.get("window").height + (StatusBar.currentHeight || 0)
      : Dimensions.get("window").height;
  };

  const getStatusBarHeightAdjusted = () => {
    return Platform.OS === "ios" ? getStatusBarHeight(true) : StatusBar.currentHeight || 0;
  };

  const [screenDimensions, setScreenDimensions] = useState({
    width: Dimensions.get("screen").width,
    height: getWindowHeight(), 
    statusBarHeight: getStatusBarHeightAdjusted(),
  });

  useEffect(() => {
    const onChange = ({ screen }: { screen: { width: number; height: number } }) => {
      setScreenDimensions({
        width: screen.width,
        height: getWindowHeight(),
        statusBarHeight: getStatusBarHeightAdjusted(), 
      });
    };

    const subscription = Dimensions.addEventListener("change", onChange);

    return () => {
      subscription?.remove();
    };
  }, []);

  return screenDimensions;
};

